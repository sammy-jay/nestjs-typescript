import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from './entity/category.entity';
import { CategoryNotFoundException } from './exception/category-not-found.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    return await this.categoriesRepository.find({});
  }

  async getCategoryById(id: number) {
    const post = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (post) {
      return post;
    }
    throw new CategoryNotFoundException(id);
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create({
      ...category,
    });
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }

  async deleteCategory(id: number) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (deleteResponse.affected) return;
    throw new CategoryNotFoundException(id);
  }
}
