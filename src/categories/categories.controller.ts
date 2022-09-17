import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseFilters,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ExceptionLoggerFilter } from 'src/utils/exceptions-logger.filter';
import { FindOneParams } from 'src/utils/find-one.params';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseFilters(ExceptionLoggerFilter)
@UseGuards(JwtGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(200)
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @HttpCode(200)
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Post()
  @HttpCode(201)
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Put(':id')
  @HttpCode(200)
  updateCategory(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteCategory(@Param('id') { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(Number(id));
  }
}
