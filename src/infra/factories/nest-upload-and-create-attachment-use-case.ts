import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestUploadAndCreateAttachmentUseCase extends UploadAndCreateAttachmentUseCase {
  constructor(
    attachmentsRepository: AttachmentsRepository,
    uploader: Uploader
  ) {
    super(attachmentsRepository, uploader)
  }
}
