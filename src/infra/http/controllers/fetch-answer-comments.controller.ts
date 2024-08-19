import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { NestFetchAnswerCommentsUseCase } from '@/infra/factories'
import { CommentPresenter } from '@/infra/presenters/comment-presenter'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { CommentWithAuthorPresenter } from '@/infra/presenters/comment-with-author-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerComments: NestFetchAnswerCommentsUseCase) { }

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answerComments = result.value.comments
    return { comments: answerComments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
