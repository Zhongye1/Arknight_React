import { useStore } from '@nanostores/react'
import { useEffect, useRef, useState } from 'react'
import { viewIndex } from './store/rootLayoutStore'
import { IconArrow, LogoRhodesIsland } from './SvgIcons'
import arknightsConfig from '../../arknights.config'

const ANIMATION_DEBOUNCE_MS = 160000

export default function ScrollTip() {
  const $ViewIndex = useStore(viewIndex)
  const viewIndexInLast = $ViewIndex === arknightsConfig.navbar.items.length - 1

  // 防抖动画 class：只在 viewIndexInLast 稳定后再切换动画，避免快速切换导致动画反复重启
  const [animationClass, setAnimationClass] = useState(viewIndexInLast ? ' animate-showHide' : ' animate-downHide')
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const prevInLastRef = useRef(viewIndexInLast)

  useEffect(() => {
    const targetClass = viewIndexInLast ? ' animate-showHide' : ' animate-downHide'
    if (targetClass === (prevInLastRef.current ? ' animate-showHide' : ' animate-downHide')) return

    // viewIndexInLast 发生了变化，启动防抖
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setAnimationClass(targetClass)
      prevInLastRef.current = viewIndexInLast
    }, ANIMATION_DEBOUNCE_MS)

    return () => clearTimeout(timerRef.current)
  }, [viewIndexInLast])

  return (
    <div className={'w-[3rem] absolute left-1/2 bottom-[3.75rem] -translate-x-1/2 z-[4] pointer-events-none'}>
      <div
        className={'flex flex-col items-center transition-opacity duration-300' + ($ViewIndex === 0 || ' opacity-0')}
      >
        <LogoRhodesIsland className={'pointer-events-none'} />
      </div>
      <div
        className={
          'flex flex-col items-center transition-colors duration-300' +
          ($ViewIndex === 0 ? ' text-ark-blue' : ' text-[#585858]') +
          animationClass
        }
      >
        {/* <div className={'text-[.75rem] font-n15eMedium mt-[.25rem]' + (!viewIndexInLast || ' opacity-0')}>SCROLL</div> */}
        <IconArrow
          className={
            'w-[1.25rem] mt-[-.5rem] mb-[-.5rem] pointer-events-none' + (viewIndexInLast ? ' -rotate-90' : ' rotate-90')
          }
        />
      </div>
    </div>
  )
}
