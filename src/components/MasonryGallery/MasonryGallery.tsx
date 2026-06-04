'use client'

import React from 'react'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  WindowScroller,
  type MasonryCellProps,
} from 'react-virtualized'

// import { useColumnLayout } from '@/hooks/useColumnLayout'
// import { debounce } from '@/utils/debounce'
// import type { UnsplashPhoto } from '@/types/unsplash'
import { UnsplashPhoto } from '@/shared/types/unsplash'
import { debounce } from '@/shared/utils/debounce'
import { PhotoCard } from '../PhotoCard'
import { useColumnLayout } from '@/shared/hooks/useColumnLayout'

type MasonryGalleryProps = {
  photos: UnsplashPhoto[]
  loading?: boolean
}

const GAP = 12

function MasonryGallery({ photos, loading }: MasonryGalleryProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const masonryRef = React.useRef<Masonry>(null)
  const widthRef = React.useRef<number>(0)
  const [containerWidth, setContainerWidth] = React.useState(0)

  const { layout, calculateLayout } = useColumnLayout()
  const { columns, columnWidth } = layout

  // Cache stores measured heights per cell — memoized so it's stable across renders
  const cache = React.useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 300,
        defaultWidth: columnWidth,
        fixedWidth: true,
        fixedHeight: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const cellPositioner = React.useRef(
    createMasonryCellPositioner({
      cellMeasurerCache: cache,
      columnCount: columns,
      columnWidth,
      spacer: GAP,
    })
  )

  // Reset positions when photos change (new page loaded)
  React.useEffect(() => {
    cache.clearAll()
    cellPositioner.current.reset({
      columnCount: columns,
      columnWidth,
      spacer: GAP,
    })
    masonryRef.current?.clearCellPositions()
  }, [photos, cache, columns, columnWidth])

  const resetPositioner = React.useCallback(
    (width: number) => {
      const { columns: cols, columnWidth: colWidth } = calculateLayout(width)
      cache.clearAll()
      cellPositioner.current = createMasonryCellPositioner({
        cellMeasurerCache: cache,
        columnCount: cols,
        columnWidth: colWidth,
        spacer: GAP,
      })
      masonryRef.current?.clearCellPositions()
    },
    [calculateLayout, cache]
  )

  // Initial layout measurement
  React.useLayoutEffect(() => {
    const width = containerRef.current?.offsetWidth
    if (width) {
      calculateLayout(width)
      widthRef.current = width
      setContainerWidth(width) 
    }
  }, [calculateLayout])

  const onResize = React.useCallback(
    () =>
       
      debounce(({ width }: { width: number }) => {
        if (widthRef.current !== width) {
          widthRef.current = width
          resetPositioner(width)
        }
      }, 150),
    [resetPositioner]
  )

  const [skeletonHeights] = React.useState(() =>
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 200 + 200))
  )

  const cellRenderer = React.useCallback(
    ({ index, key, parent, style }: MasonryCellProps) => {
      const photo = photos[index]

      if (loading && !photo) {
        return (
          <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
            <div
              style={{
                ...style,
                width: columnWidth,
                height: skeletonHeights[index % skeletonHeights.length],
              }}
              className="rounded-lg bg-gray-200 animate-pulse"
            />
          </CellMeasurer>
        )
      }

      if (!photo) return null

      return (
        <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
          <div style={{ ...style, width: columnWidth }}>
            <PhotoCard photo={photo} width={columnWidth} />
          </div>
        </CellMeasurer>
      )
    },
    [photos, loading, columnWidth, cache, skeletonHeights]
  )

  const cellCount = loading && photos.length === 0 ? 20 : photos.length

  return (
    <div ref={containerRef} className="w-full">
      <WindowScroller overscanByPixels={cache.defaultHeight}>
        {({ height, scrollTop }) => (
          <AutoSizer disableHeight onResize={onResize}>
            {() => (
              <Masonry
                ref={masonryRef}
                autoHeight
                cellCount={cellCount}
                cellMeasurerCache={cache}
                cellPositioner={cellPositioner.current}
                cellRenderer={cellRenderer}
                height={height}
                scrollTop={scrollTop}
                width={containerWidth || 800}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

export default React.memo(MasonryGallery)
