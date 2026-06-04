'use client'

import { useState, useCallback } from 'react'

const BREAKPOINTS = [640, 768, 1024, 1280, 1536]
const GAP = 12

type ColumnLayout = {
  columns: number
  columnWidth: number
}

export function useColumnLayout(): {
  layout: ColumnLayout
  calculateLayout: (width: number) => ColumnLayout
} {
  const [layout, setLayout] = useState<ColumnLayout>({
    columns: 4,
    columnWidth: 200,
  })

  const calculateLayout = useCallback((width: number): ColumnLayout => {
    const columns =
      BREAKPOINTS.reduceRight((result, breakpoint, index) => {
        return breakpoint < width ? result : index
      }, BREAKPOINTS.length) + 1

    const columnWidth = Math.floor((width - (columns - 1) * GAP) / columns)

    const newLayout = { columns, columnWidth }
    setLayout(newLayout)
    return newLayout
  }, [])

  return { layout, calculateLayout }
}
