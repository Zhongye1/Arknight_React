import React from 'react'
import arknightsConfig from '../../../arknights.config'
import NavItem from './NavItem'
import { Social, Sound, OwnerInfo } from './NavTools'
import NavMenu from './NavMenu'

export default function ArknightsHeader() {
  const Logo = arknightsConfig?.navbar?.logo?.element

  return (
    <header
      className="w-full h-[6.75rem] portrait:h-[9.375rem] absolute top-0 left-0 z-[23] flex items-center"
      style={{ backgroundImage: 'linear-gradient(0deg, transparent, rgba(0, 0, 0, .6), rgba(0, 0, 0, .8))' }}
    >
      <a
        target="_self"
        href="/"
        className="w-[7rem] portrait:w-[10.25rem] mr-auto ml-12 portrait:ml-7 cursor-pointer"
        aria-label="首页"
      >
        <Logo />
      </a>

      <nav className="portrait:hidden">
        <ul className="flex justify-evenly">
          {arknightsConfig.navbar.items.map((info, index) => (
            <NavItem key={index} index={index} info={info} />
          ))}
        </ul>
      </nav>

      <div className="w-[14.75rem] h-full flex pl-[.75rem]">
        <Social />
        <Sound />
        <OwnerInfo />
      </div>

      <NavMenu />
    </header>
  )
}
