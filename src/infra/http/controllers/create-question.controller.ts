import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../../auth/current-user-decorator'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { NestCreateQuestionUseCase } from '../../factories'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: NestCreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    })
  }
}
