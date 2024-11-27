import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient()

// Fetch all products
const fetchAllProducts = async () => {
  return await prisma.product.findMany()
}

// create product
const createProduct = async (data: Omit<Product, "id">) => {
  return await prisma.product.create({ data })
}

// fetch product by id
const fetchProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } })
}

const updateProduct = async (id: number, data: Partial<Omit<Product, "id">>) => {
  return await prisma.product.update({ where: { id }, data })
}

const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } })
}

export default {
  fetchAllProducts,
  createProduct,
  fetchProductById,
  updateProduct,
  deleteProduct,
}
