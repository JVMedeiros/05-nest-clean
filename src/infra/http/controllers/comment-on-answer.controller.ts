import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { NestCommentOnAnswerUseCase } from '../../factories'
import { z } from 'zod'

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnAnswerBodySchema)
type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswer: NestCommentOnAnswerUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnAnswer.execute({
      content,
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
