import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { NestOnAnswerCreated, NestOnQuestionBestAnswerChosen, NestSendNotificationUseCase } from "../factories";

@Module({
  imports: [DatabaseModule],
  providers: [
    NestOnAnswerCreated,
    NestOnQuestionBestAnswerChosen,
    NestSendNotificationUseCase
  ]
})
export class EventsModule { }