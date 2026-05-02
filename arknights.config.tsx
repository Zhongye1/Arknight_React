import type { ArknightsConfig } from './src/_types/ArknightsConfig'
import { CopyrightMini, IconArchive, IconGitHub, TitleArknights } from './src/components/SvgIcons'

const base = import.meta.env.BASE_URL

export default {
  title: 'Arknights',
  description: '',
  language: 'zh',
  bgm: {
    autoplay: false,

    // https://web.hycdn.cn/arknights/official/_next/static/media/audio/bgm.ea4286.mp3
    src: base + 'audios/bgm.mp3',
  },
  navbar: {
    logo: {
      element: () => <TitleArknights className="w-full h-auto pointer-events-none" />,
      alt: 'Arknights Logo',
    },
    items: [
      { title: 'INDEX', subtitle: '首页', href: base + '#index' },
      { title: 'INFORMATION', subtitle: '情报', href: base + '#information' },
      { title: 'OPERATOR', subtitle: '干员', href: base + '#operator' },
      { title: 'WORLD', subtitle: '设定', href: base + '#world' },
      { title: 'MEDIA', subtitle: '泰拉万象', href: base + '#media' },
      { title: 'MORE', subtitle: '更多内容', href: base + '#more' },
    ],
    toolbox: {
      Skland: 'https://www.skland.com/',
      Bilibili: 'https://space.bilibili.com/28606851',
      WeChat: 'https://weixin.qq.com/',
      Weibo: 'https://weibo.com/',
      TapTap: 'https://www.taptap.cn/',
      GitHub: 'https://github.com/Yue-plus/astro-arknights',
    },
    ownerInfo: {
      name: 'Yue_plus',
      slogan: '一切不如意终将远去，未来风景独好。',
      footerLinks: [
        { label: 'GitHub', url: 'https://github.com/Yue-plus' },
        { label: 'Bilibili', url: 'https://space.bilibili.com/28606851' },
      ],
    },
  },
  pageTracker: {
    microInfo: 'ARKNIGHTS',
    labels: ['HOMEPAGE', 'INFORMATION', 'OPERATOR', 'WORLD', 'ABOUT TERRA', 'MORE'],
  },
  rootPage: {
    INDEX: {
      title: 'ARKNIGHTS',
      subtitle: 'RHODES ISLAND',
      url: 'HTTPS://ARKNIGHTS.ASTRO.YUE.ZONE/',
      copyright: <CopyrightMini className="pointer-events-none" />,
      heroActions: [
        {
          icon: <IconArchive className="w-full h-auto pointer-events-none" />,
          label: '文档',
          subLabel: 'Documentation',
          target: '_self',
          href: base + 'docs/',
          className: 'text-black bg-ark-blue border-[#2bf] hover:border-white font-bold font-benderBold',
        },
        {
          // TODO: 换个好看的图标
          icon: (
            <svg
              className="w-full h-auto pointer-events-none"
              fillRule="evenodd"
              fill="currentColor"
              viewBox="0 0 1024 1024"
            >
              <path d="M856.874667 448l51.285333 30.762667a21.333333 21.333333 0 0 1 0 36.608L512 753.066667l-396.16-237.696a21.333333 21.333333 0 0 1 0-36.608l51.285333-30.762667L512 654.933333l344.874667-206.933333z m0 200.533333l51.285333 30.762667a21.333333 21.333333 0 0 1 0 36.608l-374.186667 224.512a42.666667 42.666667 0 0 1-43.946666 0l-374.186667-224.512a21.333333 21.333333 0 0 1 0-36.608l51.285333-30.762667L512 855.466667l344.874667-206.933334zM533.930667 55.850667l374.229333 224.512a21.333333 21.333333 0 0 1 0 36.608L512 554.666667 115.84 316.970667a21.333333 21.333333 0 0 1 0-36.608l374.186667-224.512a42.666667 42.666667 0 0 1 43.946666 0z" />
            </svg>
          ),
          label: '博客 - Blog',
          // subLabel: "Blog",
          target: '_self',
          href: base + 'blog/',
          className: 'text-black bg-end-yellow border-[#fe2] hover:border-white font-bold font-benderBold',
        },
        {
          icon: <IconGitHub className="w-full h-auto pointer-events-none" />,
          label: 'GitHub',
          subLabel: 'Repository',
          href: 'https://github.com/Yue-plus/astro-arknights',
          className: 'text-white bg-black border-[#333] hover:border-white font-benderBold',
        },
      ],
    },
    INFORMATION: {
      swiper: {
        autoplay: { delay: 5000 },
        data: [
          {
            title: '用户文档',
            subtitle: 'User Documentation',
            date: '2024 // 08 / 21',
            url: 'HTTPS://ARKNIGHTS.ASTRO.YUE.ZONE/',
            href: base + 'docs/',
            image: base + 'info-swiper/UserDocumentation.jpg',
          },
          {
            title: '开发者文档',
            subtitle: 'Developer Documentation',
            date: '2024 // 08 / 21',
            url: 'HTTPS://ARKNIGHTS.ASTRO.YUE.ZONE/',
            href: base + 'docs/',
            image: base + 'info-swiper/DeveloperDocumentation.jpg',
          },
          {
            title: '博客 - Blog',
            // subtitle: "Blog",
            date: '2024 // 08 / 21',
            url: 'HTTPS://ARKNIGHTS.ASTRO.YUE.ZONE/',
            href: base + 'blog/',
            image: base + 'info-swiper/Blog.jpg',
          },
        ],
      },
    },
    OPERATOR: {
      data: [
        {
          id: 'kalts',
          name: "KAL'TSIT",
          cnName: '凯尔希',
          cv: '日笠阳子',
          voice: '/audios/operator/kaltsit_ja.mp3', // 角色语音文件路径
          desc: '罗德岛最高管理者之一，阿米娅的直接辅导者。罗德岛医疗部门的总负责人。',
          portrait: '/images/02-operator/kaltsit.png',
          fullbody: '/images/02-operator/kaltsit_full.png',
          logo: '/images/02-operator/罗德岛logo.png',
        },
        {
          id: 'amiya',
          name: 'AMIYA',
          cnName: '阿米娅',
          cv: '黑泽朋世',
          voice: '/audios/operator/amiya_ja.mp3', // 角色语音文件路径
          desc: '罗德岛的公开领袖，在内部拥有最高执行权。虽然从外表上看仅仅是个不成熟的少女，但她确实深受所有人的信任。',
          portrait: '/images/02-operator/amiya.png',
          fullbody: '/images/02-operator/amiya_full.png',
          logo: '/images/02-operator/罗德岛logo.png',
        },
        {
          id: 'chen',
          name: "CH'EN",
          cnName: '陈',
          cv: '石上静香',
          voice: '/audios/operator/chen_ja.mp3', // 角色语音文件路径
          desc: '龙门近卫局特别督察组组长。在龙门近卫局服役期间，对维护龙门治安做出了卓越贡献。现作为重装干员加入罗德岛。',
          portrait: '/images/02-operator/chen.png',
          fullbody: '/images/02-operator/chen_full.png',
          logo: '/images/02-operator/龙门logo.png',
        },
        {
          id: 'texas',
          name: 'TEXAS',
          cnName: '德克萨斯',
          cv: '田所梓',
          voice: '/audios/operator/texas_ja.mp3', // 角色语音文件路径
          desc: '企鹅物流员工。单兵作战能力出众。现于罗德岛担任驻勤干员，并协助进行各种保密任务。',
          portrait: '/images/02-operator/dekesasi.png',
          fullbody: '/images/02-operator/dekesasi_full.png',
          logo: '/images/02-operator/企鹅物流logo.png',
        },
        {
          id: 'jessica',
          name: 'JESSICA',
          cnName: '杰西卡',
          cv: '广桥凉',
          voice: '/audios/operator/jessica_ja.mp3', // 角色语音文件路径
          desc: '黑钢国际正式干员，总是在出发前显得很紧张，但她的同事们知道她会在任务里把每一件事做得足够好。',
          portrait: '/images/02-operator/jessica.png',
          fullbody: '/images/02-operator/jessica_full.png',
          logo: '/images/02-operator/黑钢国际logo.png',
        },
      ],
    },
    WORLD: {
      items: [
        {
          title: '源石',
          subTitle: 'ORIGINIUMS',
          imageUrl: '/images/03-world/originiums.png',
          description:
            '大地被起因不明的天灾四处肆虐，经由天灾卷过的土地上出现了大量的神秘矿物——「源石」。这种半透明的黑色晶体蕴含着极为庞大的能量，依赖技术的进步，源石被广泛应用于工业、能源与武器制造，推动泰拉文明迈入现代。然而，源石本身也具有极强的致病性，是导致「矿石病」与「感染者」出现的根源。',
        },
        {
          title: '源石技艺',
          subTitle: 'ORIGINIUM ARTS',
          imageUrl: '/images/03-world/originium_arts.png',
          description:
            '源石技艺是指通过刺激源石内部的能量，进而操控、转化物质或意识的特殊技术。它并非传统意义上的魔法，而是建立在源石能量基础上的高度发达科学应用。感染者因体内源石结晶的存在，通常能更直接、更强力地施展源石技艺，但这也会显著加速矿石病的恶化进程。',
        },
        {
          title: '整合运动',
          subTitle: 'REUNION',
          imageUrl: '/images/03-world/reunion.png',
          description:
            '整合运动是一个由感染者组成的准军事化社会运动组织，旨在终结泰拉社会对感染者长期存在的歧视、压迫与不公。他们以极端的方式追求感染者的尊严与力量，主张「感染者应当为自身身份感到骄傲，并积极夺回属于自己的权利」。该组织在切尔诺伯格事变中达到行动高峰，与罗德岛形成直接对抗。',
        },
        {
          title: '感染者',
          subTitle: 'INFECTED',
          imageUrl: '/images/03-world/infected.png',
          description:
            '因长期接触源石或其工业衍生产物而患上「矿石病」的患者统称为感染者。该病为不治之症，会在患者体内及体表逐渐生成源石结晶，最终导致器官衰竭与死亡。感染者往往拥有比常人更强的源石技艺潜力，却因疾病的传染性与外貌变化遭受严重的社会歧视、隔离甚至迫害。',
        },
        {
          title: '移动城邦',
          subTitle: 'NOMADIC CITY',
          imageUrl: '/images/03-world/nomadic_city.png',
          description:
            '由于天灾频繁且难以预测，泰拉大陆的文明发展出独特的「移动城邦」生存方式。这些巨型城市建造在可移动的大型平台之上，能够根据天灾预报整体迁移以规避毁灭性打击。一座完整的移动城邦通常由多个功能城区组成，并以核心城区作为指挥中枢，代表着人类在极端自然环境下的顽强适应能力。',
        },
        {
          title: '罗德岛',
          subTitle: 'RHODES ISLAND',
          imageUrl: '/images/03-world/rhodes_island.png',
          description:
            '罗德岛制药公司表面上是一家致力于研究感染者医疗方案的医药研发机构，实际上是处理感染者相关问题最专业的组织之一。以巨型移动陆行舰为基地，罗德岛招募来自世界各地的感染者与非感染者，提供医疗、生活保障与战斗训练，力求寻找矿石病的治疗方法，并为感染者争取更好的生存处境。',
        },
      ],
    },
  },
} as ArknightsConfig
