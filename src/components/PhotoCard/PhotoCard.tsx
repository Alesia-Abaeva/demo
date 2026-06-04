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
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
          <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
            <p className="text-white text-sm font-medium line-clamp-1">
              {photo.user.name}
            </p>
            {photo.description && (
              <p className="text-white/80 text-xs mt-0.5 line-clamp-2">
                {photo.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
