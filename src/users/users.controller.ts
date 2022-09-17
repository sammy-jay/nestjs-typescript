import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { UsersService } from './users.service';
import { FindOneParams } from 'src/utils/find-one.params';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({ fileType: 'jpeg|jpg|png|jpng' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  // fileType: 'jpeg|jpg|png|jpng|txt|pdf|doc|docx',
  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Req() request: RequestUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10485760 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('files/:id')
  async getPrivateFile(
    @Req() request: RequestUser,
    @Param() { id }: FindOneParams,
    @Res() response: Response,
  ) {
    console.log(request.user);
    const file = await this.usersService.getPrivateFile(
      request.user.id,
      Number(id),
    );
    file.stream.pipe(response);
  }

  @Get('files')
  async getAllPrivateFiles(@Req() request: RequestUser) {
    console.log(request.user);
    return this.usersService.getAllPrivateFiles(request.user.id);
  }
}
