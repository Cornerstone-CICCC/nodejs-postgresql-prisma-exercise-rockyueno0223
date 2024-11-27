import { Request, Response } from 'express'
import productModel from '../models/product.model'
import { Product } from '@prisma/client'

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.fetchAllProducts()
    res.status(200).json(products)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// add product
const addProduct = async (req: Request<{}, {}, Omit<Product, 'id'>>, res: Response) => {
  try {
    const { productName, price } = req.body
    const product = await productModel.createProduct({ productName, price })
    res.status(201).json(product)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// get product by id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const product = await productModel.fetchProductById(id)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// update product by id
const updateProductById = async (req: Request<{ id: string }, {}, Partial<Omit<Product, 'id'>>>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { productName, price } = req.body
    const product = await productModel.updateProduct(id, { productName, price })
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id)
    const deletedProduct = await productModel.deleteProduct(id)
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    res.status(200).json(deletedProduct)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
}
