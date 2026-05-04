import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStore } from '@nanostores/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import 'swiper/swiper.css'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'
import PortraitBottomGradientMask from '../../components/PortraitBottomGradientMask'
import { IconArrow } from '../../components/SvgIcons'
import type { BreakingNewsItemProps } from '../../_types/RootPageViews'
import arknightsConfig from '../../../arknights.config'
import { directions } from '../../components/store/lineDecoratorStore'
import { viewIndex, readyToTouch } from '../../components/store/rootLayoutStore'

const base = import.meta.env.BASE_URL

// --- 动画配置常量 ---
const TRANSITION_SNAP = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
} satisfies Transition

/* ============================================================
 * SwiperInfo —— 左下信息卡片
 * 响应式要点：
 * 1. 宽度用 clamp 流式收缩（20rem ~ 26.5rem）
 * 2. 小屏时字号缩小，按钮变窄，不再绝对定位
 * ============================================================ */
function SwiperInfo({ swiperIndex }: { swiperIndex: number }) {
  const swiperData = useMemo(() => arknightsConfig.rootPage.INFORMATION.swiper.data, [])
  const current = swiperData[swiperIndex]

  return (
    <div
      className="
        overflow-hidden
        w-full max-w-[26.5rem]
        lg:absolute lg:left-[clamp(1.5rem,4vw,3.875rem)] lg:bottom-[-1.875rem]
        lg:w-[clamp(20rem,26vw,26.5rem)]
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={swiperIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-col"
        >
          {/* 标题和日期区：小屏日期在下，大屏日期在上 */}
          <div className="flex flex-col-reverse lg:flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-3 lg:mt-0 font-benderRegular tracking-[1px] text-sm sm:text-base"
            >
              {current.date ?? ''}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="
                overflow-ellipsis font-bold font-benderBold tracking-[2px]
                text-[clamp(1.5rem,4vw,2.5rem)]
                line-clamp-2 sm:line-clamp-1 lg:line-clamp-2
                max-h-[2.8em]
              "
            >
              {current.title ?? ''}
            </motion.div>
          </div>

          {/* 副标题：小屏隐藏，平板以上显示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block mt-4 text-[clamp(.875rem,1.2vw,1.125rem)] font-benderRegular text-[#d2d2d2]"
          >
            {current.subtitle ?? ''}
          </motion.div>

          {/* URL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-[clamp(.75rem,1vw,.875rem)] font-n15eMedium leading-5 tracking-[2px] opacity-70 mt-1"
          >
            {current.url ?? ''}
          </motion.div>

          {/* 更多情报按钮：手机隐藏，平板起显示 */}
          {current.href && (
            <motion.a
              href={current.href}
              target="_blank"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
              whileTap={{ scale: 0.98 }}
              className="
                hidden md:flex
                items-center cursor-pointer no-underline
                w-[clamp(11rem,15vw,14.375rem)] h-[clamp(3rem,4vw,3.75rem)]
                pr-7 pl-4 mt-8
                text-black whitespace-nowrap bg-ark-blue
                transition-colors duration-300 group
              "
            >
              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <div className="text-[clamp(1rem,1.4vw,1.25rem)] font-black leading-none">更多情报</div>
                <div className="text-[clamp(.75rem,1vw,.875rem)] font-benderBold">READ MORE</div>
              </div>
              <IconArrow className="w-2 ml-auto flex-none pointer-events-none transition-transform duration-300 group-hover:translate-x-2" />
            </motion.a>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ============================================================
 * BreakingNewsTag —— 分类标签
 * 响应式要点：宽度随容器流式
 * ============================================================ */
function BreakingNewsTag({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center cursor-pointer group
        w-[clamp(4.5rem,7vw,5.625rem)] h-5
        pr-2 pl-0.5 mr-2 sm:mr-4
        text-[clamp(.875rem,1.2vw,1.25rem)] font-bold
        transition-all duration-300
        ${active ? 'text-black' : 'text-white hover:text-ark-blue'}
      `}
    >
      {active && (
        <motion.div layoutId="activeTag" className="absolute inset-0 bg-ark-blue -z-10" transition={TRANSITION_SNAP} />
      )}
      <span className="relative z-10">{label}</span>
      <IconArrow
        className={`
          w-[.4375rem] ml-auto flex-none pointer-events-none
          transition-all duration-300
          ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
        `}
      />
    </div>
  )
}

/* ============================================================
 * BreakingNewsItem —— 单条新闻
 * 响应式要点：
 * 1. 手机：分类 + 标题/日期竖排
 * 2. 桌面：分类 | 标题 | 日期 横排
 * ============================================================ */
function BreakingNewsItem({ category, title, date, href, index }: BreakingNewsItemProps & { index: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="
        flex items-center cursor-pointer group no-underline
        w-full max-w-[22.5rem] lg:max-w-[22.5rem]
        h-[clamp(5.5rem,8vw,7.125rem)]
        text-inherit
        border-b border-solid border-[#ffffff4d]
        hover:bg-white/5 transition-colors
      "
    >
      <div className="text-[clamp(.875rem,1.1vw,1.125rem)] text-ark-blue font-bold whitespace-nowrap">{category}</div>

      <div
        className="
          ml-auto lg:ml-auto
          flex-auto lg:flex-none
          w-auto lg:w-[17.5rem]
          flex flex-row-reverse justify-between items-center
          lg:flex-col lg:items-start lg:justify-center
          ml-6 sm:ml-11 lg:ml-auto
        "
      >
        <div className="text-[clamp(.875rem,1vw,1rem)] font-benderRegular whitespace-nowrap tracking-[1px] lg:ml-0 ml-4">
          {date}
        </div>
        <div
          className="
            max-h-[3.4em] lg:max-h-[3.2rem]
            mt-0.5 tracking-[2px]
            text-[clamp(1rem,1.4vw,1.6rem)] lg:text-[1.125rem]
            leading-[1.6] lg:leading-normal
            font-bold line-clamp-2 text-ellipsis
            group-hover:text-ark-blue transition-colors
          "
        >
          {title}
        </div>
      </div>
    </motion.a>
  )
}

/* ============================================================
 * BreakingNewsList —— 新闻列表
 * ============================================================ */
function BreakingNewsList() {
  const [category, setCategory] = useState([] as string[])
  const [data, setData] = useState([] as { name: string; list: BreakingNewsItemProps[] }[])
  const [categoryIndex, setCategoryIndex] = useState(0)

  useEffect(() => {
    fetch(base + 'blog/breaking-news.json')
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.map((item: any) => item.name))
        setData(data)
      })
  }, [])

  return (
    <>
      <div
        className="
          flex flex-wrap gap-y-2
          mt-6 lg:mt-0 pt-6 lg:pt-0 pb-6 lg:pb-0
          border-y lg:border-y-0
          border-t-[#565656] border-b-[#403c3b] border-solid
        "
      >
        {category.map((label, index) => (
          <BreakingNewsTag
            key={label}
            active={index === categoryIndex}
            label={label}
            onClick={() => setCategoryIndex(index)}
          />
        ))}
      </div>

      <div className="mt-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {data.length > 0 && data[categoryIndex]?.list.length > 0 ? (
              data[categoryIndex].list.map((item, index) => (
                <BreakingNewsItem key={item.title + index} index={index} {...item} />
              ))
            ) : (
              <div className="text-[clamp(1.5rem,3vw,2.25rem)] font-benderBold p-8">NO DATA</div>
            )}
          </motion.div>
        </AnimatePresence>

        <a
          target="_blank"
          href={base + 'blog/'}
          rel="noreferrer"
          className="
            flex items-center cursor-pointer whitespace-nowrap
            w-[clamp(7.625rem,11vw,11.125rem)]
            h-[clamp(1.5rem,2vw,1.75rem)]
            mt-8 px-2.5
            text-[clamp(.875rem,1.2vw,1.3125rem)] text-[#d2d2d2] hover:text-black
            font-benderBold bg-[#585858] hover:bg-white
            transition-all duration-300 hover:translate-x-1
          "
        >
          <span>READ MORE</span>
          <IconArrow className="w-[.4375rem] ml-auto flex-none" />
        </a>
      </div>
    </>
  )
}

/* ============================================================
 * ImageSlide / TextSlide —— Swiper 单页
 * ============================================================ */
function ImageSlide({ title, image }: { title: string; image: string }) {
  return (
    <div className="w-full h-full relative">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full h-[clamp(2.5rem,5vh,3.75rem)] bg-black bg-opacity-30 mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 w-full h-[clamp(2.5rem,5vh,3.75rem)] flex items-center justify-center">
        <div className="text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-white">{title}</div>
      </div>
    </div>
  )
}

function TextSlide({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-black bg-opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-white text-center px-4">
          {title}
          <div className="mt-2 text-[clamp(.875rem,1.2vw,1rem)] font-benderRegular text-white">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
 * SwiperBody —— 右侧轮播
 * 响应式要点：
 * 1. 小屏：relative 块级，占满宽度，高度按 aspect-ratio
 * 2. 桌面：恢复原绝对定位
 * ============================================================ */
function SwiperBody({
  setSwiperIndex,
  active,
}: {
  setSwiperIndex: React.Dispatch<React.SetStateAction<number>>
  active: boolean
}) {
  const data = useMemo(() => arknightsConfig.rootPage.INFORMATION.swiper.data, [])

  return (
    <div
      className={`
        flex items-center justify-center overflow-hidden
        transition-all duration-1000 delay-300
        relative w-full aspect-[16/9] mt-6
        lg:absolute lg:mt-0 lg:top-[9.5rem] lg:right-[clamp(2rem,10vw,14.75rem)]
        lg:w-[clamp(40rem,60vw,83.125rem)] lg:h-[clamp(24rem,45vw,46.875rem)]
        lg:aspect-auto
        lg:mask-gradient-90-transparent-to-white
        ${active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
      `}
    >
      <Swiper
        className="w-full h-full"
        modules={[Autoplay, Scrollbar]}
        autoplay={arknightsConfig.rootPage.INFORMATION.swiper.autoplay ?? true}
        scrollbar={{ hide: false, draggable: true }}
        onSlideChange={(e) => setSwiperIndex(e.activeIndex)}
      >
        {data.map(({ title, subtitle, href, image }, index) => (
          <SwiperSlide key={index}>
            <a target="_blank" href={href} className="block w-full h-full overflow-hidden" rel="noreferrer">
              {image ? (
                <ImageSlide title={title} image={image} />
              ) : (
                <TextSlide title={title} subtitle={subtitle ?? ''} />
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

/* ============================================================
 * Information —— 主容器
 * 响应式要点：
 * 1. 小屏：普通文档流，Swiper 在上，信息在下
 * 2. 桌面：恢复原绝对定位设计稿
 * ============================================================ */
export default function Information() {
  const [swiperIndex, setSwiperIndex] = useState(0)
  const $viewIndex = useStore(viewIndex)
  const $readyToTouch = useStore(readyToTouch)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const isActive = $viewIndex === 1 && $readyToTouch
    if (isActive) directions.set({ top: true, right: true, bottom: false, left: false })
    setActive(isActive)
  }, [$viewIndex, $readyToTouch])

  return (
    <div
      className={`
        w-screen max-w-[180rem] h-full
        relative lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-auto
        opacity-100
      `}
    >
      <PortraitBottomGradientMask />

      <SwiperBody setSwiperIndex={setSwiperIndex} active={active} />

      {/* 背景装饰渐变（仅桌面） */}
      <div
        className="hidden lg:block absolute inset-0 bg-[length:100%_100%] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(0deg, #000 5rem, transparent 20rem)',
        }}
      />
      <div className="hidden lg:block absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-500" />

      {/* 左侧内容区 */}
      <div
        className={`
          relative lg:absolute lg:top-[9.5rem] lg:left-0
          w-full lg:w-[clamp(26rem,30vw,34.375rem)]
          h-auto lg:h-[46.75rem]
          px-6 sm:px-8 lg:px-0
          transition-all duration-700 delay-100
          ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
        `}
      >
        {/* 叠加层（仅桌面） */}
        <div className="hidden lg:block absolute inset-0 bg-black bg-opacity-30 mix-blend-overlay" />
        <div className="hidden lg:block absolute inset-0 mix-blend-difference bg-list-texture bg-cover bg-left-top" />

        <div
          className="
          relative h-full lg:h-full
          pt-5 lg:pt-10
          lg:pl-[clamp(2rem,4vw,3.875rem)]
        "
        >
          {/* 装饰大字：仅大屏显示 */}
          <div
            className={`
              hidden xl:flex items-end overflow-hidden whitespace-nowrap
              absolute top-full left-[clamp(4rem,8vw,9rem)]
              h-[.95em]
              text-[clamp(4rem,7vw,7rem)] text-[#242424]
              font-oswaldMedium -tracking-wider
              transition-all duration-1000 delay-500
              ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <span>BREAKING NEWS</span>
          </div>

          <SwiperInfo swiperIndex={swiperIndex} />
          <BreakingNewsList />
        </div>
      </div>
    </div>
  )
}
