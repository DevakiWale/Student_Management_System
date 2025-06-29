import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'admin' | 'student';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'student' })
  role: UserRole;
}
