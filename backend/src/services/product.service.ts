// import ExampleModel from '../models/example.model';
import productModels from "../models/product-models";
import { Product } from "../interfaces/product.interface";

class ProductServices {
  public async getAllProducts(): Promise<Product[]> {
    return await productModels.findAll();
  }

  public async getProductById(id: number): Promise<Product | null> {
    return await productModels.findById(id);
  }

  public async createProduct(productData: Product): Promise<number> {
    return await productModels.create(productData);
  }

  public async updateProduct(
    id: number,
    productData: Partial<Product>
  ): Promise<boolean> {
    return await productModels.update(id, productData);
  }

  public async deleteProduct(id: number): Promise<boolean> {
    return await productModels.delete(id);
  }
}

export default new ProductServices();
