'use client'

import { useState, useCallback, useRef } from 'react'
import type { UnsplashPhoto } from '../types/unsplash'

const PER_PAGE = 20

type UsePhotosReturn = {
  photos: UnsplashPhoto[]
  loading: boolean
  hasMore: boolean
  loadMore: () => void
}

export function usePhotos(): UsePhotosReturn {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)
  const loadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return

    loadingRef.current = true
    setLoading(true)

    try {
      const res = await fetch(
        `/api/photos?page=${pageRef.current}&per_page=${PER_PAGE}`
      )

      if (!res.ok) throw new Error('Failed to fetch photos')

      const data: UnsplashPhoto[] = await res.json()

      if (data.length < PER_PAGE) {
        setHasMore(false)
      }

      setPhotos((prev) => [...prev, ...data])
      pageRef.current += 1
    } catch (error) {
      console.error('Error loading photos:', error)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [hasMore])

  return { photos, loading, hasMore, loadMore }
}
