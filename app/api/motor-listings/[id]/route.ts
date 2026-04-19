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
  const { name, imageUrl, link } = await request.json()

  const listing = await prisma.motorListing.update({
    where: { id: parseInt(id) },
    data: {
      ...(name !== undefined && { name: name.trim() }),
      ...(imageUrl !== undefined && { imageUrl: imageUrl.trim() }),
      ...(link !== undefined && { link: link.trim() }),
    },
  })

  return NextResponse.json(listing)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { id } = await params

  await prisma.motorListing.delete({
    where: { id: parseInt(id) },
  })

  return NextResponse.json({ success: true })
}
