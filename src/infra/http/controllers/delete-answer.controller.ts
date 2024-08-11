import { BadRequestException, Body, Controller, Delete, HttpCode, Param, Put } from '@nestjs/common'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { NestDeleteAnswerUseCase } from '../../factories'
import { z } from 'zod'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: NestDeleteAnswerUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
