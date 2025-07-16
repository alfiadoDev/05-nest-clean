import type { Student } from '../../enterprise/entities/student'

export abstract class StudentRepository {
  abstract create(student: Student): Promise<void>
  abstract findByEmail(id: string): Promise<Student | null>
}
