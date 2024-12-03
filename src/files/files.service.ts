import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFile(fileData: Partial<File>): Promise<File> {
    const file = this.fileRepository.create(fileData);
    return this.fileRepository.save(file);
  }

  async getReceivedFiles(email: string): Promise<File[]> {
    return this.fileRepository.find({ where: { recipientEmail: email } });
  }

  async getSentFiles(senderEmail: string): Promise<File[]> {
    return this.fileRepository.find({ where: { senderEmail } });
  }

  async markFileAsViewed(id: string): Promise<void> {
    await this.fileRepository.update(id, { viewed: true });
  }

  async deleteFile(id: string): Promise<void> {
    await this.fileRepository.delete(id);
  }
}