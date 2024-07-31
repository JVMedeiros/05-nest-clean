import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-respository";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { Injectable } from "@nestjs/common";


@Injectable()
export class NestFetchQuestionsUseCase extends FetchRecentQuestionsUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}