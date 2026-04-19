import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { id } = await params
  const { name } = await request.json()

  if (!name?.trim()) {
    return NextResponse.json({ error: 'İsim boş olamaz' }, { status: 400 })
  }

  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: { name: name.trim() },
  })

  return NextResponse.json(category)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { id } = await params

  await prisma.category.delete({
    where: { id: parseInt(id) },
  })

  return NextResponse.json({ success: true })
}
