import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@nanostores/react'
import { viewIndex } from 'src/components/store/rootLayoutStore'

export default function RootPageViewTemplate({
  selfIndex,
  children,
}: {
  selfIndex: number
  children: React.ReactNode
}) {
  const $viewIndex = useStore(viewIndex)
  const prevViewIndex = useRef($viewIndex)

  const isActive = selfIndex === $viewIndex
  const wasActive = selfIndex === prevViewIndex.current
  const isExiting = !isActive && wasActive

  // 控制 visibility：擦除完成后隐藏，释放渲染资源
  const [hidden, setHidden] = useState(!isActive)

  useEffect(() => {
    prevViewIndex.current = $viewIndex
  })

  useEffect(() => {
    if (isActive) {
      setHidden(false)
    } else if (isExiting) {
      const timer = setTimeout(() => setHidden(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive, isExiting])

  let clipPath: string
  if (isActive) {
    clipPath = 'inset(0 0 0 0)'
  } else if (selfIndex < $viewIndex) {
    clipPath = 'inset(0 100% 0 0)'
  } else {
    clipPath = 'inset(0 0 0 100%)'
  }

  return (
    <div
      className="w-full h-full absolute top-0 left-0 overflow-hidden"
      style={{
        clipPath,
        transition: isActive || isExiting ? 'clip-path 1000ms linear' : 'none',
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      {children}
    </div>
  )
}
