import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')

  if (!categoryId) {
    return NextResponse.json({ error: 'categoryId gerekli' }, { status: 400 })
  }

  const subCategories = await prisma.subCategory.findMany({
    where: { categoryId: parseInt(categoryId) },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(subCategories)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { name, categoryId } = await request.json()

  if (!name?.trim() || !categoryId) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  const subCategory = await prisma.subCategory.create({
    data: { name: name.trim(), categoryId: parseInt(categoryId) },
  })

  return NextResponse.json(subCategory)
}
