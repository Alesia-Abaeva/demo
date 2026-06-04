
'use client'

import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { usePhotos } from "@/shared/hooks/usePhotos";
import dynamic from "next/dynamic";
import React from "react";

const MasonryGallery = dynamic(
  () => import('@/components/MasonryGallery/MasonryGallery'),
  { ssr: false }
)


export default function Home() {
  const { photos, loading, hasMore, loadMore } = usePhotos()
    const sentinelRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !loading,
  })

  React.useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100 px-6 py-4 ">
        <div className="max-w-screen-2xl  mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold ">Unsplash Demo Gallery</h1>
          <span className="text-sm text-gray-400">{photos.length} photos loaded</span>
        </div>
      </header>
     
      <main className=" max-w-screen-2xl
      flex flex-1 w-full flex-col items-center justify-between p p-16 bg-white dark:bg-black 
      sm:items-start">
        <MasonryGallery photos={photos} loading={loading && photos.length === 0} />

        <div ref={sentinelRef} className="h-10" />

        {loading && photos.length > 0 && (
          <div className="flex justify-center py-8 m-auto">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )} 
         {!hasMore && (<p className="text-center text-sm text-gray-400 py-8">All photos loaded</p> )}
      </main>
    </div>
  );
}
