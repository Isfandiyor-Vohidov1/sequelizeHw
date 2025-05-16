import db from "../models/index.js";

export class CategoryController {
  async createCategory(req, res) {
    try {
      const category = await db.Category.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getAllCategories(_, res) {
    try {
      const categories = await db.Category.findAll({ include: { all: true } })
      return res.status(200).json({
        statusCode: 200,
        message: 'succecss',
        data: categories

      })


    } catch (error) {
      return res.status(500).json({
        error: error.message
      })

    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await db.Category.findOne({ where: { id } });

      if (!category) {
        return res.status(404).json({ statusCode: 404, message: "Category not found" });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateCategoryById(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const [updated] = await db.Category.update(updatedData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ statusCode: 404, message: "Category not found" });
      }

      const updatedCategory = await db.Category.findOne({ where: { id } });

      return res.status(200).json({
        statusCode: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteCategoryById(req, res) {
    try {
      const { id } = req.params;

      const deleted = await db.Category.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ statusCode: 404, message: "Category not found" });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}
