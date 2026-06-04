'use client'

import { useEffect, useRef } from 'react'

type UseIntersectionObserverProps = {
  onIntersect: () => void
  enabled?: boolean
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin: '200px' }
    )

    const target = targetRef.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [onIntersect, enabled])

  return targetRef
}
