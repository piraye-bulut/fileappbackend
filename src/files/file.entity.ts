import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipientEmail: string;

  @Column()
  senderEmail: string;

  @Column()
  fileName: string;

  @Column('text')
  fileBase64: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: false })
  viewed: boolean;
}