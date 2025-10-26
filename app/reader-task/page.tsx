"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Share2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type LabelType = "none" | "A" | "B" | "C" | "D"

interface Article {
  id: number
  title: string
  abstract: string
  author: string
  time: string
  labelType: LabelType
  category: string
}

const labelConfig = {
  none: { label: "", description: "", color: "" },
  A: {
    label: "标记A",
    description: "AI引用内容经过修正",
    color: "bg-amber-500",
  },
  B: {
    label: "标记B",
    description: "AI引用文献及政策内容经过修正",
    color: "bg-blue-500",
  },
  C: {
    label: "标记C",
    description: "AI引用数据及模型经过修正",
    color: "bg-purple-500",
  },
  D: {
    label: "标记D",
    description: "AI引用内容逻辑及精简性经过修正",
    color: "bg-green-500",
  },
}

const articles: Article[] = [
  {
    id: 1,
    title: "论思想政治教育与创新创业教育的协同作用",
    abstract:
      "思想政治教育与创新创业教育是高等教育中彼此独立又相互联系的两个子系统。思想政治教育能协调创新创业相关方的利益关系,规范创新创业主体的市场行为,克服创新创业教育中存在的功利主义,为创新创业教育提供正确的方法指导,进而从整体上把握创新创业教育的方向;创新创业教育是思想政治教育在新时代的载体,强化了其价值导向与教育理念,解决了其重大利益关切,对其进行了拓展与延伸,进而从整体上提升了思想政治教育的实效。思想政治教育与创新创业教育能够通过协同教学体系、社会实践及校园氛围,充分发挥课程育人、实践育人、文化育人的功能,为实现立德树人的教育目标协同增效。",
    author: "教育研究",
    time: "2天前",
    labelType: "B",
    category: "教育学",
  },
  {
    id: 2,
    title: "产权、代理成本和代理效率",
    abstract:
      "本文选择政府管制较少、竞争较为充分的电子电器行业作为研究对象,考察了产权制度与代理成本和代理效率的关系,得到以下结论:(1)在代理成本上,国有产权企业普遍高于混和产权企业,混和产权企业高于个人产权企业;在代理成本差异上,混和产权企业与个人产权企业的差异小于与国有产权企业的差异。(2)长期投资率和职工人数与代理成本呈显著正相关关系,而长期投资率、财务杠杆比率、职工人数等与代理效率呈显著负相关关系。(3)企业规模越大,不同产权的代理成本差异越小;反之代理成本差异越大。(4)随着市场竞争程度的提高,各类产权企业的代理成本都呈现下降趋势,其代理效率呈现提高趋势。我们研究的启示是国有企业改革的突破口应考虑如何降低其代理成本,解决的措施之一是产权改革,尤其是产权多元化的改革,其次是完善对投资和负债及冗员的监督和控制机制,以促进代理成本的降低和代理效率的提高。",
    author: "经济研究",
    time: "1天前",
    labelType: "C",
    category: "企业管理",
  },
  {
    id: 3,
    title: "信与疑之间——民众对医生反常信任的实证分析",
    abstract:
      "信任为良性医患关系之必需。本文呈现了民众对医生群体的反常信任:民众对医生总体信任度较高,但对其医术、医德缺乏信任。为何会存有这种信任度差别?本文发现:中国医生职业信任主要源于民众对国家医疗制度的认同;医术、医德对医生信任具有塑造作用,但制度信任对其塑造力具有强烈的替代作用;制度信任会促进民众对医生抽象层面和具体层面的信任反差。通过对职业与国家关系的讨论,本文有助于理解复杂医患关系的形成机制。",
    author: "社会学研究",
    time: "3天前",
    labelType: "B",
    category: "社会学",
  },
  {
    id: 4,
    title: "职业认同与初中教师工作投入的关系：自我效能感和教师元认知的作用",
    abstract:
      "采用问卷调查法探讨职业认同与初中教师工作投入的关系以及自我效能感、教师元认知在二者关系中的作用。结果显示：（1）职业认同、工作投入、自我效能感以及教师元认知两两之间均为显著正相关；（2）自我效能感在职业认同和工作投入之间起部分中介作用；（3）教师元认知调节了自我效能感在职业认同与工作投入关系的中介效应。与低元认知水平的教师相比，高元认知水平教师的自我效能感在职业认同和工作投入关系的中介效应显著增加。除教师元认知体验外，教师元认知其他维度的调节效应均达到显著水平或边缘显著水平。因此，为了促进初中教师的工作投入，不仅需要提升其职业认同水平，还需要增强自我效能感、培养教师元认知能力。",
    author: "心理学报",
    time: "4天前",
    labelType: "D",
    category: "心理学",
  },
  {
    id: 5,
    title: "机器人、劳动力高龄化与工资差距",
    abstract:
      "在劳动年龄人口负增长和结构老化背景下，企业需要在劳动力成本和自动化技术之间取得新平衡。有效结合自动化部署，并充分挖掘高龄劳动力资源，对经济高质量发展至关重要。本文基于特定年龄组执行不同工作任务的新视角，从理论和经验研究层面探询自动化技术（以工业机器人为载体）如何与工作场所高龄劳动力形成互动，进而改变企业内部劳动者的工资差距。本文首先通过构建一个体现劳动力年龄结构的工作任务自动化模型，基于不同年龄组劳动力在常规任务和非常规任务上具有不同优势的假设前提，从理论上阐述了机器人应用影响企业内部年龄工资差距的内在逻辑。理论预测，企业引入机器人一方面可能通过替代劳动要素完成常规任务而使得非常规任务更加重要，另一方面可能推动高龄劳动力向非常规任务再配置，从而促使高龄劳动力获得更高的工资回报。接下来，利用制造业雇主—雇员匹配调查数据和相关配套数据为上述理论预测提供了经验证据。经验研究发现，机器人应用为高龄劳动力带来显著的工资溢价，并且高龄劳动力在就业前景和工作满意度方面也显示出更积极的回报。机制检验表明，相比于年轻劳动力，高龄劳动力更多地从事非常规任务。本文的研究结论意味着，在老龄化不断深化的背景下，高龄劳动力与机器人技术形成互补协同效应，从而为积极应对人口老龄化的国家战略提供了有益的政策启示。",
    author: "劳动经济研究",
    time: "5天前",
    labelType: "none",
    category: "劳动经济学",
  },
  {
    id: 6,
    title: "官员激励与政府支出效率：来自地级市的证据",
    abstract:
      "本文试图以官员晋升激励为视角,研究经济新常态下我国地方政府的支出效率。当前关于机构精简、三公支出及重复建设等问题逐渐成为公众关注焦点之一,同时也被政府所重视。但与基于西方国家研究相比,针对我国政府效率的研究相对薄弱。本文首先测算1996—2015年我国地市级政府支出效率;其次,检验官员晋升激励对支出效率的影响。本文发现就总体效率来说,晋升激励能够显著提高辖区财政支出效率及基建效率,但对教育支出效率的影响不显著;同时,晋升激励作用也存在异质性。本文发现从政治经济学角度增加了对我国地方政府行为的理解。",
    author: "经济学季刊",
    time: "6天前",
    labelType: "C",
    category: "公共经济学",
  },
  {
    id: 7,
    title: "理解要素宏观和微观替代弹性的差异：基于行业和政策影响的视角",
    abstract:
      "本文基于2016—2020年的税收调查数据，估计了制造业和生产性服务业的微观资本—劳动替代弹性，并在引入政府政策后，测算了宏观资本—劳动替代弹性，在此基础上还测算了政府政策对宏观弹性的影响。研究发现，在微观企业层面，制造业和生产性服务业中资本与劳动呈现互补关系，但在宏观层面，制造业中资本与劳动则表现为替代关系，替代弹性约为1.5；而生产性服务业的替代性显著弱于制造业，在2016—2018年间表现为互补关系，但2018年起逐步呈现弱替代性特征，政策实施会削弱制造业和生产性服务业中资本对劳动的替代性。本文进一步讨论了政府政策如何影响要素成本，进而影响要素回报份额。以2019年社会保险费率调整为例，社会保险费率的下降对不同企业的劳动成本影响不同，整体上引起制造业和生产性服务业的劳动收入份额分别上升了6.47个和1.45个百分点。本文的研究揭示了微观弹性与宏观弹性的联系与区别，并定量识别了政策对要素份额的影响，为优化初次分配格局提供了理论依据。",
    author: "中国工业经济",
    time: "1周前",
    labelType: "C",
    category: "产业经济学",
  },
  {
    id: 8,
    title: "社交焦虑对智能手机过度使用的影响:孤独感和动机的中介作用",
    abstract:
      "采用大学生智能手机成瘾量表、智能手机使用动机量表、UCLA孤独感自评量表及Leary社交焦虑量表对549名大学生智能手机使用者进行测查,考察大学生社交焦虑、孤独感、手机使用动机与智能手机过度使用间的关系。结果表明:(1)除娱乐动机与孤独感、社交焦虑呈显著负相关外,孤独感、社交焦虑、娱乐动机、逃避动机及智能手机过度使用两两之间均存在显著正相关;(2)中介效应检验结果表明,孤独感、娱乐及逃避动机均在社交焦虑及智能手机过度使用间起中介作用,并且社交焦虑还可通过孤独感和娱乐、逃避动机的链式中介作用影响智能手机过度使用,孤独感和娱乐、逃避动机在社交焦虑预测大学生智能手机过度使用中起多重中介作用。本研究不仅验证了病理性互联网使用的认知—行为模型,而且强调了个体的社交状况及动机在导致智能手机过度使用中的重要作用,同时可为研究者设计对智能手机过度依赖者的干预措施提供借鉴。",
    author: "心理科学",
    time: "1周前",
    labelType: "C",
    category: "心理学",
  },
  {
    id: 9,
    title: "经济发展的新制度经济学：一个根本性的批判",
    abstract:
      "本文将对关于制度与经济发展的新制度经济学文献提供一个根本性的批判。作者认为,既有的文献有四宗罪(四大缺陷),而其中每个缺陷都包含更具体的不足。这四大缺陷是:概念化和度量问题、理论严谨性不足、现代辉格式神话,以及对制度变迁与发展的非进化的理解。正是这四宗罪使得新制度经济学无法给出一个关于经济发展的制度基础的系统性阐述。这一根本性批评将为作者在别的地方系统性地阐述经济发展的制度基础奠定部分基础。",
    author: "经济研究",
    time: "1周前",
    labelType: "B",
    category: "经济学理论",
  },
  {
    id: 10,
    title: "社会镜像：竞技体育明星饭圈化风险及对策——以巴黎奥运会为例",
    abstract:
      "研究目的:当前,随着互联网的发展,人们拥有更多的发声渠道表达自己的情绪,互联网等社交平台逐渐成为意识形态表达的场域。饭圈是通过网络社会聚集起来的追星群体,主要依赖对同一偶像产生的文化纽带、感情规训并且接受商业资本介入,具有纪律严明、分工明确、行动力极强等特点,其运作形态就是饭圈文化。饭圈文化作为一种流行于青年群体中的亚文化,伴随我国文化产业的发展,在娱乐资本无序扩张下,已经形成鲜明的特征,并衍生出不符合甚至抗拒主流意识形态要求、影响社会舆论、导致思想混乱等意识形态效应。当前,成熟于娱乐圈的饭圈化追星模式已经广泛蔓延至竞技体育等领域。在竞技体育领域内,青少年群体对竞技运动员明星(以下简称体育明星)的饭圈式追捧正蓬勃兴起,这一现象对于提升体育明星知名度、推动相关体育项目的普及以及刺激体育消费都产生了积极影响。然而,值得注意的是,体育明星与娱乐明星的立身之本截然不同,饭圈文化固有的诸多问题也逐渐浮现。鉴于青少年粉丝群体往往缺乏足够的辨别能力,他们在体育追星过程中盲目复制饭圈的运作模式,其风险也日益增加,这一问题亟需得到社会各界的关注并采取有效措施进行治理。",
    author: "体育科学",
    time: "2周前",
    labelType: "D",
    category: "体育社会学",
  },
  {
    id: 11,
    title: "从交易费用到博弈均衡",
    abstract:
      "这篇文章旨在说明三件事：第一，分工不可避免地造成技术知识的不对称分布和由此而来的交易费用，所以才产生了获取和积累制度知识的必要性。如果制度知识不足以降低交易费用，那些可能产生规模经济效益的技术知识就无法被应用于分工生产过程，经济也就停止发展了。第二，交易费用不可能从局部均衡得到确定，运行一个制度所花费的成本只能通过制度选择的多人博弈过程的均衡状态来确定。这两个结果都是新近得到的。在此之前，制度经济学文献中存在着许多关于交易费用概念的误解，澄清交易费用概念，这是我这篇文章的主旨之一。另一方面，以往的新制度经济学研究忽视了奥地利学派关于知识和市场过程的观点，所以很难为制度经济学建立一个类似一般均衡理论的坚实基础，制度经济学至今仍然是一种部分均衡分析。知识结构的引进有助于建立制度演进的时点间一般均衡过程，于是，第三件事是：人们从传统学习知识，并且在他们习得的知识结构基础上达成他们选择的均衡。前代人行为的均衡及所习得的知识通过教育与模仿变成对后代人而言的传统。所以交易费用仅仅当传统允许人们从许多可能的均衡中作出选择的时候才是一个成本概念。",
    author: "经济研究",
    time: "2周前",
    labelType: "D",
    category: "经济学理论",
  },
  {
    id: 12,
    title: "关于制度变迁的三个假说及其验证",
    abstract:
      "本文结合中国和其他一些转型国家市场化改革的经验事实,提出并验证了关于制度变迁的三个新的理论假说:(1)同一轨迹上制度变迁的边际收益先递增后递减,其变化轨迹呈倒U型曲线;(2)政府行政力量推动市场化改革在一定时期内是可行的,有效的;(3)制度变迁中不同主体的角色定位和转换主要取决于制度变迁对各自利益的影响,也受制于其他因素。",
    author: "经济研究",
    time: "2周前",
    labelType: "none",
    category: "制度经济学",
  },
  {
    id: 13,
    title: "市场激励型环境规制可以推动企业技术创新吗?——基于中国碳排放权交易机制的自然实验",
    abstract:
      "提高环境标准以推进企业低碳环保转型是供给侧结构性改革的重要内容。在众多环境规制的政策工具中,以市场激励为导向的排放权交易机制在西方国家得到了较为广泛的认可与应用,但是否同样适用于尚处在转轨期的新型中国市场还有待进一步检验。本文基于中国2013年开始试点实施的碳排放权交易机制,考察了市场激励型的环境规制对中国企业技术创新的影响。研究发现:碳排放权交易机制的实施显著推动了企业的技术创新,且当碳市场的流动性程度越高,该市场激励型环境规制对企业技术创新的推动作用更加明显。但企业成本转嫁能力会在一定程度上削弱该环境规制的积极影响,当企业所承受的产品市场竞争程度更低、企业对客户和供应商的议价能力更高时,碳排放权交易机制对企业技术创新的推动作用相对降低。综上,本文的研究不仅从市场激励的角度丰富了环境规制与企业技术创新的相关文献,同时也为中国碳排放权交易实施的政策效果提供了微观证据,研究结论可为后续在全国范围内统一推进碳排放权交易市场建设提供政策参考。",
    author: "中国工业经济",
    time: "3周前",
    labelType: "C",
    category: "环境经济学",
  },
  {
    id: 14,
    title: "打造渴望：经纪人的工作自主性与劳动控制——以上海JH家政公司为例",
    abstract:
      "通过对上海JH家政公司的考察，本文提出渴望的制度化改造,分析家政公司如何通过提成制、体验制和表彰制将家政经纪人以赚钱养家、小富即安和小城镇女性身份为基础的现实型渴望改造成以年薪百万、大城市中产生活和家政白领身份认同为核心的理想型渴望,从而实现劳动控制的过程。在此过程中，经纪人忍受当下劳动的辛苦，积极工作，并形成一套文化解释来合理化现实和理想的差距，实现自我剥削。",
    author: "社会学研究",
    time: "3周前",
    labelType: "A",
    category: "劳动社会学",
  },
  {
    id: 15,
    title: "责任制考试、通过仪式抑或学术仪式?——博士学位论文答辩制度的意义建构",
    abstract:
      "博士学位论文答辩是考试还是形式，这是实践中和学理上有待解释的问题。在栖居制度主义视角下，答辩制度是地方性的制度意义的合流，地方性的制度意义处于集体文化中。本文采取跨个案比较研究的方法，对外部组织环境相同的三个学系建构的答辩制度的意义进行了分析。研究发现，三个学系在外部制度环境的约束下，在行动和互动中建构出责任制考试通过仪式和学术仪式这三种地方性的制度意义，分别体现了关注点为论文质量、学缘关系和学术自由的集体文化。本文进一步对多样性答辩制度的意义所反映的三个学系对于合法性的共同追求和处于制度链中的答辩制度的学术性进行了分析。",
    author: "社会学研究",
    time: "3周前",
    labelType: "A",
    category: "教育社会学",
  },
  {
    id: 16,
    title: "牛市下半场核心投资机会",
    abstract:
      "周五，上证指数再创新高，其他各大主要股指也相继携手上涨。板块中，科技概念领涨，市场表现与彭祖10月22日公开直播中分享的观点高度吻合。彭祖认为，当前中国资产的估值依然非常便宜，春节行情甚至明年上半年的行情都非常值得期待，科技、储能、有色、创新药、新消费是本轮行情的投资主线。",
    author: "投资观察",
    time: "1天前",
    labelType: "none",
    category: "金融市场",
  },
  {
    id: 17,
    title: "2024年上半年中国宏观经济分析报告",
    abstract:
      "【季度经济分析报告】是SpeedaChina按季度制作的中国宏观概览报告,以国家统计局公布的季度和月度数据为基础,结合中国人民银行、海关总署、商务部、行业协会等渠道所提供的宏观及行业数据,绘制时间序列图表,从数据变化中解析回顾中国经济近况。此外,我们挑选与今后发展密切相关的重要事件或政策进行解读,帮助您快速把握中国经济后续走势。",
    author: "SpeedaChina",
    time: "2天前",
    labelType: "D",
    category: "宏观经济",
  },
  {
    id: 18,
    title: "有钱没钱，一看便知：长期缺钱的人，多半有这两个通病",
    abstract:
      "有没有思考过一个问题，长期缺钱的人，和有钱人最大的区别是什么？此刻的你，脑子里首先想到的，有钱人的特征是什么？穿名牌？开豪车？如果穷人也穿着奢侈品，开着豪车，又该如何区分呢？更有底气心理学家爱德华·德西和理查德·瑞安于20世纪80年代提出了《人类行为中的自我决定与内在动机》理论，强调人类内在动机的本质有三种基本心理需求；自主需求：渴望行为源于自我选择，而非外部压力；胜任需求：即我能做好这件事的信念；归属需求：寻求与他人的联结、接纳和情感支持。",
    author: "心理观察",
    time: "3天前",
    labelType: "none",
    category: "心理学",
  },
  {
    id: 19,
    title: "如何理解哈耶克的思想？他在西方国家影响有多大？",
    abstract:
      "弗里德里希·哈耶克的思想，是20世纪人类对社会如何运行自由如何存续的一次深刻追问。他既非单纯的经济学家，也非抽象的哲学家，而是以认识论为根基，将经济、政治与伦理熔于一炉，构建了一套对抗权力集中与理性自负的思想体系。要真正理解他，需穿透表层观点，触及其思想的底层逻辑；而他在西方国家的影响，更是一场从思想边缘到政策核心的逆袭，深刻重塑了战后西方的发展轨迹。",
    author: "思想史研究",
    time: "4天前",
    labelType: "B",
    category: "经济思想史",
  },
  {
    id: 20,
    title: "为什么特斯拉汽车的产品力，能吊打所有国产新能源品牌？",
    abstract:
      "国产新能源车的安全短板：配置堆砌难掩体系缺陷，特斯拉的系统思维与数据进化构建真正安全壁垒。同样电池装不同车，一个爆燃一个稳如磐石——差距不在零件，在品控标准与责任担当。当国产车忙着删帖控评时，特斯拉正用机械拉索和OTA升级证明：安全不是营销话术，是敢于把事故变成进化样本的勇气。",
    author: "汽车评论",
    time: "5天前",
    labelType: "none",
    category: "产业分析",
  },
  {
    id: 21,
    title: "试图调和制度经济学与新古典经济学的莫里斯·克拉克",
    abstract:
      "克拉克首创有效竞争理论，主张反垄断政策应确保竞争过程的动态性和有效性，而非追求静态完美市场。他强调创新是竞争核心驱动力，提出对抗性依存关系，为反垄断经济学提供了现实灵活的分析框架。",
    author: "经济学说史",
    time: "6天前",
    labelType: "B",
    category: "经济学理论",
  },
  {
    id: 22,
    title: "如果发生通货膨胀，什么东西最值钱？历史证明只有这2样值钱",
    abstract:
      "通货膨胀（如2024年我国CPI同比上涨2.5%，2025年预计2.5%-3%）导致货币购买力下降，财富面临贬值风险。历史证明：历史上表现突出的保值资产有两类：实物资产和稀缺性资产。通货膨胀是常见现象，实物资产和稀缺性资产长期来看展现出较强的保值增值能力。真正的智慧在于理性分析、多元配置、与时俱进，而非盲目追逐保值神器。",
    author: "财经观察",
    time: "1周前",
    labelType: "none",
    category: "金融市场",
  },
  {
    id: 23,
    title: "市域社会视角下城乡关系研究的创新路径",
    abstract:
      "城市化已成为全球发展的必然趋势，正如斯宾格勒所言，城市的历史即世界的历史。当前，中国社会正处于深刻转型之中，城市发展展现出独特且复杂的面貌，其中包含了诸多折叠与杂糅的元素。在这一关键时期，以市域社会为视角来审视城乡关系，将为我们提供全新的视野、视角及方法，从而推动城乡治理向更高水平发展。",
    author: "城市研究",
    time: "1周前",
    labelType: "B",
    category: "城市社会学",
  },
  {
    id: 24,
    title: "从币制到盐铗，古代中国的经济大戏",
    abstract:
      "古代中国的经济变革如一场精彩大戏：中央统一币制终结假币横行，盐铁专卖锁住国家财源，均输平准政策让物价稳如泰山。这些智慧举措既稳固了王朝根基，更让百姓生活安稳如泰山，堪称经济治理的黄金法则。",
    author: "历史研究",
    time: "1周前",
    labelType: "none",
    category: "经济史",
  },
  {
    id: 25,
    title: "什么是数字经济？一文读懂其框架、构成与核心特征",
    abstract:
      "数字经济正以数据为关键要素、信息技术为核心驱动力，重塑全球经济格局，催生新产业新模式。从新基建到数据要素，从算力革命到产业数字化，这场变革将释放前所未有的创新动能，推动全产业链升级。",
    author: "数字经济研究",
    time: "2周前",
    labelType: "D",
    category: "数字经济",
  },
  {
    id: 26,
    title: "数字经济行业2024年度盘点",
    abstract:
      "回望2024年，我国5G、人工智能等技术创新持续取得突破，数据要素市场加快建设，数字经济产业体系不断完善，数字经济全要素生产率巩固提升，有效支撑了我国新质生产力的积累壮大。本期将对今年我国数字经济发展的趋势和格局进行梳理盘点。",
    author: "产业观察",
    time: "2周前",
    labelType: "none",
    category: "产业分析",
  },
  {
    id: 27,
    title: "企业数字化转型的案例分析",
    abstract:
      "企业数字化转型已成为现代商业环境中的一项关键战略。在全球范围内，不同行业的公司通过数字化技术的应用不断重塑自身，提升运营效率和市场竞争力。本文将通过几个典型的案例深入分析企业在数字化转型过程中的路径、策略及技术应用。",
    author: "管理学报",
    time: "2周前",
    labelType: "D",
    category: "企业管理",
  },
  {
    id: 28,
    title: "一文速览新质生产力",
    abstract:
      "新质生产力是创新起主导作用，摆脱传统经济增长方式、生产力发展路径，具有高科技、高效能、高质量特征，符合新发展理念的先进生产力质态。它由技术革命性突破、生产要素创新性配置、产业深度转型升级而催生，以劳动者、劳动资料、劳动对象及其优化组合的跃升为基本内涵，以全要素生产率大幅提升为核心标志，特点是创新，关键在质优，本质是先进生产力。",
    author: "经济日报",
    time: "3周前",
    labelType: "D",
    category: "经济学理论",
  },
  {
    id: 29,
    title: "20多项制裁针对中方，特朗普威胁妥协，世界或将为中美贸易战买单",
    abstract:
      "2025年10月，美国财长贝森特的一则威胁让全球市场屏住呼吸：美国参议院可能授权特朗普对中国征收最高达500%的关税。这场贸易战早已超出两国博弈的范畴——美股半个月蒸发4万亿美元，相当于美国GDP的14%；美国农民的大豆堆积在仓库里，而对华稀土依赖让F-35战机年产量骤减三分之一。当特朗普宣称美国是甲方时，中国外交部用两个字回应：不跪！",
    author: "国际观察",
    time: "3周前",
    labelType: "none",
    category: "国际经济",
  },
  {
    id: 30,
    title: "边际效用递减定律在经济学中有广泛的应用",
    abstract:
      "边际效用递减定律（Law of Diminishing Marginal Utility）是经济学中的一个基本原理，它解释了人们从消费额外数量的某一商品或服务中所获得的额外满足感（即边际效用）是如何随着消费数量的增加而减少的。这一规律在多个领域具有广泛应用，本文详细科普了这一概念。",
    author: "经济学原理",
    time: "3周前",
    labelType: "D",
    category: "经济学理论",
  },
  {
    id: 31,
    title: "一文读懂丨什么是低空经济？低空经济全场景！",
    abstract:
      "2024年被称为低空经济元年。2024年全国两会，低空经济首次被写进了2024政府工作报告，凸显了低空经济在国家经济发展中的重要地位。全国科学技术名词审定委员会日前发布的2024年度前沿热点词中，低空经济位列其中。那么，到底什么是低空经济？为何需要发展低空经济？怎样发展低空经济？希望以下内容对大家深入理解低空经济有所帮助。",
    author: "产业前沿",
    time: "4周前",
    labelType: "D",
    category: "产业经济学",
  },
  {
    id: 32,
    title: "碳资产变现：企业如何抓住绿色经济新风口？",
    abstract:
      "2024年，中国全国碳排放权交易市场运行步入正轨，市场规模和覆盖范围不断扩容，从2023年底到2025年初，相继出台CCER项目开发六个方法学，从自愿碳市场的重启到强制碳市场的扩围，一系列突破为市场发展注入新动力。2025年1月24日，生态环境部正式发布《企业温室气体排放核算与报告指南——钢铁行业》及《企业温室气体排放核查技术指南——钢铁行业》两项重要技术规范，为全国碳排放权交易市场提供了坚实的支撑。继电力、水泥、电解铝等行业之后，钢铁行业企业亦将纳入全国碳排放权交易体系。面对这一新形势，企业需转变观念，由原来的被动履行碳排放义务，转变为主动进行碳资产管理，以更好地适应全国碳排放权交易市场的需求。",
    author: "环境经济",
    time: "1个月前",
    labelType: "D",
    category: "环境经济学",
  },
]

export default function ReaderTaskPage() {
  const router = useRouter()
  const [forwardedArticles, setForwardedArticles] = useState<Set<number>>(new Set())
  const [canSubmit, setCanSubmit] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("readerStartTime")) {
      localStorage.setItem("readerStartTime", new Date().toISOString())
    }
  }, [])

  useEffect(() => {
    setCanSubmit(forwardedArticles.size === 20)
  }, [forwardedArticles])

  const handleForward = (articleId: number) => {
    if (forwardedArticles.size >= 20 && !forwardedArticles.has(articleId)) {
      alert("您已经转发了20篇文章，无法继续转发")
      return
    }

    setForwardedArticles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(articleId)) {
        newSet.delete(articleId)
      } else {
        newSet.add(articleId)
      }
      return newSet
    })
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      alert("请选择20篇文章后再提交")
      return
    }

    const labelCounts = { none: 0, A: 0, B: 0, C: 0, D: 0 }
    const forwardedList: Article[] = []

    articles.forEach((article) => {
      if (forwardedArticles.has(article.id)) {
        labelCounts[article.labelType]++
        forwardedList.push(article)
      }
    })

    const experimentData = {
      taskType: "阅读",
      startTime: localStorage.getItem("readerStartTime"),
      endTime: new Date().toISOString(),
      forwardedArticles: forwardedList,
      labelCounts,
      totalForwarded: forwardedArticles.size,
    }

    localStorage.setItem("readerExperimentData", JSON.stringify(experimentData))

    router.push("/thank-you")
  }

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              已转发：
              <span className={forwardedArticles.size === 20 ? "text-green-600" : "text-blue-600"}>
                {forwardedArticles.size}
              </span>{" "}
              / 20 篇
            </div>
            <Button onClick={handleSubmit} disabled={!canSubmit} size="lg">
              提交实验结果
            </Button>
          </div>
          {forwardedArticles.size < 20 && (
            <Alert className="mt-3">
              <AlertDescription>请继续选择文章，还需转发 {20 - forwardedArticles.size} 篇</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-4">
          {articles.map((article) => {
            const isForwarded = forwardedArticles.has(article.id)
            const labelInfo = labelConfig[article.labelType]

            return (
              <Card
                key={article.id}
                className={`transition-all hover:shadow-lg ${isForwarded ? "ring-2 ring-green-500 bg-green-50/50" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                        {article.author.charAt(0)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-base">{article.author}</span>
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                          </div>
                          <div className="flex items-start gap-2">
                            <h3 className="text-lg font-semibold leading-tight flex-1">{article.title}</h3>
                            {labelInfo.label && (
                              <Badge className={`${labelInfo.color} text-white text-xs px-2 py-1 whitespace-nowrap`}>
                                {labelInfo.label} - {labelInfo.description}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p
                        className="text-sm text-muted-foreground leading-relaxed mb-4 cursor-pointer hover:text-foreground transition-colors line-clamp-3"
                        onClick={() => handleArticleClick(article)}
                      >
                        {article.abstract}
                      </p>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleForward(article.id)}
                          variant={isForwarded ? "default" : "outline"}
                          size="sm"
                          className={isForwarded ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {isForwarded ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              已转发
                            </>
                          ) : (
                            <>
                              <Share2 className="h-4 w-4 mr-1" />
                              转发
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold pr-8">{selectedArticle?.title}</DialogTitle>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm font-medium">{selectedArticle?.author}</span>
              <Badge variant="outline" className="text-xs">
                {selectedArticle?.category}
              </Badge>
              {selectedArticle && labelConfig[selectedArticle.labelType].label && (
                <Badge className={`${labelConfig[selectedArticle.labelType].color} text-white text-xs`}>
                  {labelConfig[selectedArticle.labelType].label} - {labelConfig[selectedArticle.labelType].description}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <DialogDescription className="text-base leading-relaxed text-foreground pt-4">
            {selectedArticle?.abstract}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
