import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  const listings = await prisma.motorListing.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(listings)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { name, imageUrl, link } = await request.json()

  if (!name?.trim() || !imageUrl?.trim() || !link?.trim()) {
    return NextResponse.json({ error: 'Tüm alanlar zorunludur' }, { status: 400 })
  }

  const listing = await prisma.motorListing.create({
    data: {
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      link: link.trim(),
    },
  })

  return NextResponse.json(listing)
}
