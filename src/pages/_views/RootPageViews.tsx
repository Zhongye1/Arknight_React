import React, { useCallback, useLayoutEffect, useRef, useState, Suspense } from 'react'
import { useStore } from '@nanostores/react'
import {
  viewIndex,
  viewIndexSetNext,
  viewIndexSetPrev,
  isFooterVisible,
  isScrollLocked,
} from 'src/components/store/rootLayoutStore'
import arknightsConfig from '../../../arknights.config'
import RootPageViewTemplate from './RootPageViewTemplate'

const MAX_INDEX = arknightsConfig.navbar.items.length - 1

const Index = React.lazy(() => import('./00-Index'))
const Information = React.lazy(() => import('./01-Information'))
const Operator = React.lazy(() => import('./02-Operator'))
const World = React.lazy(() => import('./03-World'))
const Media = React.lazy(() => import('./04-Media'))
const More = React.lazy(() => import('./05-More'))

const PAGES = [Index, Information, Operator, World, Media, More]

function LoadingFallback() {
  return <div className="w-full h-full flex items-center justify-center text-white/50" />
}

export default function RootPageViews() {
  const $viewIndex = useStore(viewIndex)
  const containerRef = useRef<HTMLDivElement>(null)
  const startTouchY = useRef(0)
  const lastScrollTime = useRef(0)

  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    isFooterVisible.set(false)
    setIsLoading(false)
  }, [])

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    startTouchY.current = event.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (isScrollLocked.get()) return

      const diffY = startTouchY.current - event.changedTouches[0].clientY
      if (Math.abs(diffY) <= 100) return

      if (diffY > 0) {
        if ($viewIndex === MAX_INDEX) {
          if (!isFooterVisible.get()) isFooterVisible.set(true)
        } else {
          viewIndexSetNext()
        }
      } else {
        if ($viewIndex === MAX_INDEX && isFooterVisible.get()) {
          isFooterVisible.set(false)
        } else {
          viewIndexSetPrev()
        }
      }
    },
    [$viewIndex],
  )

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (isScrollLocked.get()) return

      if (performance.now() - lastScrollTime.current <= 800) return

      if (event.deltaY > 0) {
        if ($viewIndex === MAX_INDEX) {
          if (!isFooterVisible.get()) {
            isFooterVisible.set(true)
            lastScrollTime.current = performance.now()
          }
        } else {
          const newIndex = $viewIndex + 1
          location.hash = arknightsConfig.navbar.items[newIndex].href.split('#')[1]
          lastScrollTime.current = performance.now()
        }
      } else {
        if ($viewIndex === MAX_INDEX && isFooterVisible.get()) {
          isFooterVisible.set(false)
          lastScrollTime.current = performance.now()
        } else if ($viewIndex > 0) {
          const newIndex = $viewIndex - 1
          location.hash = arknightsConfig.navbar.items[newIndex].href.split('#')[1]
          lastScrollTime.current = performance.now()
        }
      }
    },
    [$viewIndex],
  )

  useLayoutEffect(() => {
    const handleHashChange = () => {
      const HASH = location.hash.split('#')[1]
      const INDEX = arknightsConfig.navbar.items.findIndex((item) => HASH === item.href.split('#')[1])
      if (INDEX !== -1) viewIndex.set(INDEX)
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div
      ref={containerRef}
      id="root-page-views"
      className="w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {PAGES.map((Component, index) => (
        <RootPageViewTemplate key={index} selfIndex={index}>
          <Suspense fallback={<LoadingFallback />}>
            <Component />
          </Suspense>
        </RootPageViewTemplate>
      ))}
    </div>
  )
}
