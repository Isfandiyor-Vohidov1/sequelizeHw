import db from "../models/index.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const product = await db.Product.create((req.body))
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getAllProducts(_, res) {
    try {
      const products = await db.Product.findAll({ include: { all: true } })
      return res.status(200).json({
        statusCode: 200,
        message: 'succecss',
        data: products

      })

    } catch (error) {
      return res.status(500).json({
        error: error.message
      })

    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await db.Product.findOne({ where: { id } });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: product
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  async updateProductById(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const [updated] = await db.Product.update(updatedData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ statusCode: 404, message: 'Product not found' });
      }

      const updatedProduct = await db.Product.findOne({ where: { id } });

      return res.status(200).json({
        statusCode: 200,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteProductById(req, res) {
    try {
      const { id } = req.params;

      const deleted = await db.Product.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ statusCode: 404, message: 'Product not found' });
      }

      return res.status(200).json({
        statusCode: 200,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
