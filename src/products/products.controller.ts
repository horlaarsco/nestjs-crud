import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './products.dto';
import * as mongoose from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async addProduct(@Res() res, @Body() productDTO: ProductDTO) {
    try {
      const product = await this.productService.addProduct(productDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been created successfully',
        product,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  @Get()
  async getAllProducts(@Res() res) {
    const products = await this.productService.getAllProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id: string) {
    const check = mongoose.isValidObjectId(id);
    if (check) {
      const product = await this.productService.getProduct(id);
      if (!product) {
        return res.status(HttpStatus.OK).json({ message: 'Not found' });
      }
      return res.status(HttpStatus.OK).json(product);
    } else {
      res.status(HttpStatus.FOUND).json('Not valid object id');
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() res,
    @Body() productDTO: ProductDTO,
    @Param('id') id: string,
  ) {
    const check = mongoose.isValidObjectId(id);
    if (check) {
      try {
        const product = await this.productService.updateProduct(id, productDTO);
        return res.status(HttpStatus.OK).json({
          message: 'Customer has been updated successfully',
          product,
        });
      } catch (error) {
        return res.status(HttpStatus.FOUND).json(error);
      }
    } else {
      res.status(HttpStatus.FOUND).json('Not valid object id');
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() res, @Param('id') id: string) {
    const check = mongoose.isValidObjectId(id);
    if (check) {
      const product = await this.productService.deleteProduct(id);
      if (product) {
        return res.status(HttpStatus.OK).json({
          message: 'Customer has been deleted successfully',
          product,
        });
      } else {
        res.status(HttpStatus.FOUND).json('Not Found');
      }
    } else {
      res.status(HttpStatus.FOUND).json('Not valid object id');
    }
  }
}
