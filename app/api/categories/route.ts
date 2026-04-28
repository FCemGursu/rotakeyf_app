import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  const categories = await prisma.category.findMany({
    where: type ? { type } : undefined,
    include: {
      products: { orderBy: { createdAt: 'asc' } },
      subCategories: { orderBy: { createdAt: 'asc' } },
    },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { name, type } = await request.json()

  if (!name?.trim() || !type) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  if (!['cafe', 'motor'].includes(type)) {
    return NextResponse.json({ error: 'Geçersiz tip' }, { status: 400 })
  }

  const category = await prisma.category.create({
    data: { name: name.trim(), type },
  })

  return NextResponse.json(category)
}
