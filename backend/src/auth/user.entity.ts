import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ Add this
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'student';

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];
}
