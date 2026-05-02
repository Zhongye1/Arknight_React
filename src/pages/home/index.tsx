import { Init } from '../../components/Init'
import ArknightsHeader from '../../components/header/ArknightsHeader'
import LineDecorator from '../../components/LineDecorator'
import ScrollTip from '../../components/ScrollTip'
import PageTracker from '../../components/PageTracker'
import RootPageViews from '../_views/RootPageViews'
import OwnerInfo from '../../components/OwnerInfo'
import ToolBox from '../../components/ToolBox'
import { getNoneLayout } from '../../components/layout'

function Home() {
  return (
    <>
      <Init />

      <article className="w-full h-full text-white font-n15eMedium bg-black landscape:overflow-hidden">
        <div className="w-full h-full max-w-[180rem] mx-auto relative">
          <ArknightsHeader />

          <LineDecorator />

          <ScrollTip />

          <PageTracker />

          <RootPageViews />

          <OwnerInfo />

          <ToolBox />
        </div>
      </article>
    </>
  )
}

Home.getLayout = getNoneLayout

export default Home
