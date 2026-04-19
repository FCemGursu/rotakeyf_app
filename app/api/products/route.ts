import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')
  const type = searchParams.get('type')

  const products = await prisma.product.findMany({
    where: {
      ...(categoryId ? { categoryId: parseInt(categoryId) } : {}),
      ...(type ? { category: { type } } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { name, description, price, imageUrl, inStock, categoryId } =
    await request.json()

  if (!name?.trim() || !categoryId) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price: price?.trim() || null,
      imageUrl: imageUrl || null,
      inStock: inStock ?? true,
      categoryId: parseInt(categoryId),
    },
    include: { category: true },
  })

  return NextResponse.json(product)
}
