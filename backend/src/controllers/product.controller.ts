import { Request, Response, NextFunction } from "express";
import ProductServices from "../services/product.service";
import { Product } from "../interfaces/product.interface";
import { ValidatedRequest } from "../interfaces/validated.request.interface";

class ProductController {
  public async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await ProductServices.getAllProducts();
      console.log("====================================");
      console.log(products);
      console.log("====================================");
      res.status(200).json({ data: products, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = Number(req.params.id);
      const product = await ProductServices.getProductById(productId);
      res.status(200).json({ data: product, message: "findOne" });
    } catch (error) {
      next(error);
    }
  }

  public async createProduct(
    req: ValidatedRequest<Product>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productData: Product = req.body;
      const createdProductId = await ProductServices.createProduct(productData);
      res.status(201).json({ data: createdProductId, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = Number(req.params.id);
      const productData: Product = req.body;
      const updatedProduct = await ProductServices.updateProduct(
        productId,
        productData
      );
      res.status(200).json({ data: updatedProduct, message: "updated" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = Number(req.params.id);
      const deletedProduct = await ProductServices.deleteProduct(productId);
      res.status(200).json({ data: deletedProduct, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
