import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(catId: number) {
    super(`Category with id ${catId} not found`);
  }
}
