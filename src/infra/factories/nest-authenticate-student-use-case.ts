import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAuthenticateStudentUseCase extends AuthenticateStudentUseCase {
  constructor(
    studentsRepository: StudentsRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
  ) {
    super(studentsRepository, hashComparer, encrypter)
  }
}
