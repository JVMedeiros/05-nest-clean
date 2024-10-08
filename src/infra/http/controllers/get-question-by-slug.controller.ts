import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { NestGetQuestionBySlugUseCase } from '@/infra/factories'
import { QuestionDetailsPresenter } from '@/infra/presenters/question-details-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: NestGetQuestionBySlugUseCase) { }

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionDetailsPresenter.toHTTP(result.value.question) }
  }
}
