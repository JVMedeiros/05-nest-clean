import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Attachment as PrismaAttachment, Prisma } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type.')
    }
    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistanceUpdateMany(attachments: QuestionAttachment[]): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map(attachment => {
      return attachment.id.toString()
    })

    return {
      where: {
        id: {
          in: attachmentIds
        }
      },
      data: {
        questionId: attachments[0].questionId.toString()
      }
    }
  }
}
