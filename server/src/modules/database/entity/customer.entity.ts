import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'c_id' })
  id: number;

  @Column({ name: 'c_email', unique: true })
  email: string;

  @Column({ name: 'c_username' })
  username: string;

  @Column({ name: 'c_password' })
  password: string;

  constructor(email?: string, username?: string, password?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
