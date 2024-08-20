import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { NestGetQuestionBySlugUseCase } from '@/infra/factories'
import { QuestionPresenter } from '@/infra/presenters/question-presenter'

@Controller('/questions')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: NestGetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) }
  }
}
