import { BadRequestException, Body, Controller, Delete, HttpCode, Param, Put } from '@nestjs/common'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { NestDeleteQuestionCommentUseCase } from '../../factories'
import { z } from 'zod'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: NestDeleteQuestionCommentUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteQuestionComment.execute({
      questionCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
