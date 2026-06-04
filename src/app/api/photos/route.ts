import type { UnsplashPhotosResponse } from '@/shared/types/unsplash'
import { NextRequest, NextResponse } from 'next/server'

const UNSPLASH_API = 'https://api.unsplash.com'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '20'

  const apiKey = process.env.UNSPLASH_ACCESS_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing Unsplash API key' },
      { status: 500 }
    )
  }

  const res = await fetch(
    `${UNSPLASH_API}/photos?page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Client-ID ${apiKey}`,
        'Accept-Version': 'v1',
      },
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch from Unsplash' },
      { status: res.status }
    )
  }

  const data: UnsplashPhotosResponse = await res.json()

  return NextResponse.json(data)
}
