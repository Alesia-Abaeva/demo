'use client'

import type { UnsplashPhoto } from '@/shared/types/unsplash'

type PhotoCardProps = {
  photo: UnsplashPhoto
  width: number
}

export function PhotoCard({ photo, width }: PhotoCardProps) {
  const aspectRatio = photo.height / photo.width
  const height = Math.round(width * aspectRatio)

  return (
    <a
      href={photo.links.html}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg"
      style={{ width, height }}
    >
      <div className="relative w-full h-full">
       {/*  eslint-disable-next-line @next/next/no-img-element */}
       <img
        src={photo.urls.small}
        alt={photo.alt_description ?? photo.description ?? 'Unsplash photo'}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      </div>
    </a>
  )
}
