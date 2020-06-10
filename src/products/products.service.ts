import { Injectable } from '@nestjs/common';
import { ProductDTO } from './products.dto';
import { Model } from 'mongoose';
import { Product } from './products.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
  async getProduct(ProductID): Promise<Product> {
    const product = await this.productModel.findById(ProductID);
    return product;
  }
  async addProduct(createProductDTO: ProductDTO): Promise<Product> {
    const newProduct = await new this.productModel(createProductDTO);
    return newProduct.save();
  }
  async updateProduct(
    ProductID,
    createProductDTO: ProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      ProductID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }
  async deleteProduct(ProductID): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(ProductID);
    return deletedProduct;
  }
}
