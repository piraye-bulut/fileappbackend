import { Controller, Post, Body, Get, Query, Param, Delete } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async uploadFile(@Body() fileData: any) {
    return this.filesService.uploadFile(fileData);
  }

  @Get('/received')
  async getReceivedFiles(@Query('email') email: string) {
    return this.filesService.getReceivedFiles(email);
  }

  @Get('/:senderEmail/sent')
  async getSentFiles(@Param('senderEmail') senderEmail: string) {
    return this.filesService.getSentFiles(senderEmail);
  }

  @Post('/:id/viewed')
  async markFileAsViewed(@Param('id') id: string) {
    return this.filesService.markFileAsViewed(id);
  }

  @Delete('/:id')
  async deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }
}