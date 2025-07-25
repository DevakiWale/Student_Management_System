import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  
} from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

 

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  // // ✅ Add this to link Student to a User (important for profile route)
  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;

  @ManyToOne(() => User, (user) => user.students, { eager: true })
  user: User;

}
