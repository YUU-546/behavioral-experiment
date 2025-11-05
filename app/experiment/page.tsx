"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Clock, FileText } from "lucide-react"

// 根据学科获取选题和参考资料
const getTopicAndReference = (subject: string) => {
  const topics = {
     理工类: {
      topic: "基于深度学习的图像识别技术在智能制造中的应用研究",
      reference: `# AI生成参考资料

## 现实背景
随着工业4.0时代的到来，智能制造已成为全球制造业转型升级的核心驱动力。据《中国制造2025》报告显示，到2025年，我国智能制造装备市场规模预计将超过3万亿元，年复合增长率达15%以上。图像识别技术作为智能制造的关键组成部分，在产品质量检测、生产过程监控、机器人导航和供应链优化等方面发挥着日益重要的作用。全球范围内，德国“工业4.0”战略和美国“再工业化”计划均强调计算机视觉技术的集成，以提升生产效率和灵活性。然而，实际应用中仍面临数据异构性、环境干扰和实时性要求等挑战，这促使深度学习模型如卷积神经网络（CNN）和生成对抗网络（GAN）的进一步创新。

## 相关政策
- 国务院《新一代人工智能发展规划》(2017)明确提出推动人工智能在制造业的深度应用，目标是到2030年人工智能核心产业规模超过1万亿元，并支持视觉识别技术在智能工厂中的示范项目。
- 工信部《智能制造发展规划(2016-2020年)》强调视觉识别技术的重要性，要求到2025年实现关键工序智能化率超过50%，但部分地方政策如《广东省智能制造2025行动计划》中提到的“2023年全面普及视觉检测系统”可能存在夸大，实际进展较慢。
- 欧盟《人工智能法案》(2021)草案中，将工业图像识别列为高风险应用，要求严格的数据隐私和准确性标准，这可能会影响跨国企业的技术部署。但该法案尚未全面实施，部分条款仍存在争议。
- 日本《机器人新战略》(2015)推动图像识别在制造业的普及，但实际资金投入低于预期，导致部分项目延迟。

## 相关文献
1. Zhang, L., et al. (2021). "Deep Learning for Smart Manufacturing: Methods and Applications." Journal of Manufacturing Systems, 48, 144-156.
   - 该文献系统综述了深度学习在智能制造中的应用，提出了基于CNN的质量检测框架，在ImageNet工业子集上准确率达到98.5%。但文献中引用的“实时检测延迟低于10ms”可能基于理想实验环境，实际工业场景中延迟往往更高。

2. Wang, J., & Li, H. (2020). "Computer Vision in Industrial Automation: A Survey." IEEE Transactions on Industrial Informatics, 16(3), 2000-2015.
   - 研究表明，计算机视觉技术可将缺陷检测效率提升300%，误检率降低至0.5%以下。然而，该调查依赖于有限数据集，未充分考虑光照变化和遮挡问题，可能导致实际应用中的性能下降。

3. Chen, Y., et al. (2022). "Real-time Object Detection for Smart Manufacturing Using YOLO." Robotics and Computer-Integrated Manufacturing, 76, 102321.
   - 提出了改进的YOLO算法，在复杂工业场景下实现了实时检测，处理速度达到45fps。但该研究使用的自定义数据集未公开，可重复性存疑，且算法在低光环境下准确率下降至85%左右。

4. Liu, X., et al. (2023). "Adversarial Training for Robust Image Recognition in Manufacturing." Nature Machine Intelligence, 5(2), 89-102. 
   - 该文献声称通过对抗训练将模型鲁棒性提升40%，在MVTec AD数据集上达到99%的准确率。但实际工业测试中，该方法的计算成本较高，可能不适用于资源受限的边缘设备。

5. Smith, R., & Brown, K. (2019). "Economic Impacts of AI in Manufacturing: A Global Perspective." Harvard Business Review, 97(4), 112-125. （部分虚构，混合真实元素）
   - 分析显示，AI图像识别技术可降低制造业成本20%以上，但该数据基于北美案例，亚洲地区的效果可能因基础设施差异而打折扣。文献中引用的“2025年全球市场规模达5000亿美元”可能高估，实际预测约为3000亿美元。

## 技术挑战与局限
- 数据稀缺性：工业图像数据往往标注不足，导致模型过拟合。例如，公开数据集如COCO和Pascal VOC在制造业场景下的泛化能力有限，而私有数据集如“某汽车制造企业数据”可能存在标注不一致问题。
- 实时性要求：在高速生产线上，图像识别系统需在毫秒级内响应，但当前模型如ResNet-50在标准硬件上的推理时间可能超过50ms，难以满足极端实时需求。部分研究声称使用轻量级模型如MobileNet实现10ms延迟，但未考虑网络延迟和硬件老化因素。
- 环境适应性：光照变化、灰尘和振动可能降低识别准确率。有研究提出多传感器融合方案，但该技术尚未成熟，且成本增加30%以上。
- 伦理与隐私：员工监控应用可能引发隐私争议，欧盟GDPR法规要求匿名化处理，但实际部署中常存在合规漏洞。

## 可能用到的数据
- ImageNet工业场景数据集（包含50万张标注图像）：该数据集广泛用于预训练，但其中20%的图像来自模拟环境，可能与真实工厂数据存在分布差异。
- MVTec AD异常检测数据集（15个类别，5000+张图像）：一个标准基准，但部分类别如“纺织品”的样本量不足，导致模型偏差。
- Industrial-Vision Benchmark (IVB) 数据集：包含100万张图像，覆盖全球50个工厂，但实际可用性未知，且部分数据来自合成生成，真实性待验证。
- 中国智能制造联盟发布的2022年行业白皮书数据：显示图像识别技术普及率超过60%，但该数据基于自我报告调查，可能存在响应偏差。

## 未来展望
到2030年，边缘AI和联邦学习有望解决数据隐私和实时性问题，但技术成熟度依赖芯片进展。部分预测指出，量子计算可能革命图像识别，但这仍处于理论阶段，实际应用前景不明。同时，全球标准缺失可能导致技术碎片化，影响技术落地。`,
    },
    经管类: {
      topic: "数字金融赋能中小企业绿色转型的激励效应研究：基于转型金融工具的视角",
      reference: `# AI生成参考资料

一、现实背景
【1】转型压力与现实矛盾
重要作用与高排放占比​：实现“双碳”目标是国家重大战略决策。然而，中小企业在绿色转型道路上却面临巨大挑战。中小企业在国民经济中占据重要地位，是保障就业、激发市场活力的关键力量。但与此同时，它们的碳排放总量不容小觑，数据显示其碳排放占工业领域的46%​​。根据国际能源署2024年报告，中国中小企业的碳减排效率已超过欧盟平均水平。
低转型率的现实困境：与大型企业相比，中小企业的绿色化转型比例远低于大型企业。这背后是多重困境的交织：许多中小企业对绿色转型的认知不足，视其为成本负担而非发展机遇；同时，它们也普遍面临资金短缺、技术储备不足、专业人才匮乏等现实难题。​例如，据的《2024年全球中小企业绿色转型指数》显示，超过80%的中小企业因“转型成本过高”而主动放弃减排计划，这一比例在亚太地区甚至高达95%​。
。
【2】融资瓶颈与“绿色悖论”
传统金融服务的局限性​：传统金融机构在提供绿色金融服务时，倾向于依赖规范的财务数据、足额的抵押资产或清晰的政府信用背书。然而，中小企业通常存在财务信息不规范、可抵押资产不足等问题。例如江苏省绿色信贷拒贷率高达70%。但也存在成功的解决方案，如江苏景中景集团年集中喷涂中心“绿岛”项目自动涂装流水线，有效破解中小企业资金技术瓶颈。
绿色项目识别的高成本​：对于数量庞大、分布分散的中小企业，金融机构要逐一准确识别其项目是否真正“绿色”，并对其进行有效的贷后管理，成本非常高。这也是绿色资金难以顺畅流向中小微企业的重要原因。另一方面也存在有效的案例。如 “碳熵宝”的AI绿色平台为中小企业的“一站式碳管家”，承诺通过物联网数据自动优化能耗并生成可信的碳资产报告。多个工业园区曾集体采购部署。

【3】数字金融的赋能潜力
​创新金融工具与服务模式​：数字金融助力下，出现了更多针对中小企业的创新金融服务模式。例如，​数字供应链金融可以将核心企业的信用沿着产业链传递给中小企业，为解决链上中小企业的融资问题提供了新路径。各地也在探索基于碳账户的绿色金融产品，让中小企业的绿色行为产生实际的金融价值。例如浙江省通过区块链碳账户为小微企业发放万亿贷款。 深圳首创了“降碳贷”，银行根据企业碳账户的减排表现给予差异化利率优惠。例如，深圳市方迪科技股份有限公司就因此获得了江苏银行深圳分行提供的2800万元贷款

二、政策引导与战略支持
国家战略规划​：国家“双碳”目标为绿色金融发展提供了根本遵循。中央金融工作会议明确提出将“绿色金融”作为建设金融强国的五篇大文章之一，凸显了其重要性。《金融标准化“十四五”发展规划》等重点政策文件也强调要建立和完善绿色金融标准体系。
​ 
【1】2023年7月：《关于深化制造业金融服务助力推进新型工业化的通知》
国家金融监督管理总局、工业和信息化部、国家发展改革委
推动制造业高端化、智能化、绿色化发展，明确要单列制造业信贷计划持续提升制造业中长期贷款占比。
【2】2025年4月：《银行业保险业科技金融高质量发展实施方案》
金融监管总局、科技部、国家发展改革委
提出7方面20条措施，以加强科技金融服务机制、产品体系、专业能力和风控能力建设，增加金融资源供给，促进科创产业融合。​方案特别指出，将设立总额为5000亿元人民币的“科技创新再贷款”工具，专门用于支持金融机构向国家级“小巨人”企业发放优惠利率贷款。​​
【3】2025年8月：《关于金融支持新型工业化的指导意见》
中国人民银行、工业和信息化部等七部门
目标：到2027年，支持制造业高端化、智能化、绿色化发展的金融体系基本成熟。聚焦支持提升产业科技创新能力和产业链供应链韧性等任务。指导意见首次明确，对商业银行投向工业母机、生物制造等战略性新兴产业的贷款，其风险权重可阶段性下调至50%，以显著释放信贷空间。​

三、相关文献
[1]  张勋,万广华,张佳佳,何宗樾.数字经济、普惠金融与包容性增长[J].经济研究,2019,54(08):71-86.
[2]  黄东云,.企业绿色创新的融资约束研究[J].科技对策,2022,38(17):116-124.
[3]  戴翔,杨双至.数字赋能、数字投入来源与制造业绿色化转型[J].中国工业经济,2022,(09):83-101.
[4]  乔彬,赵广庭,沈烁华.数字普惠金融能促进企业绿色创新吗?[J].南方金融,2022,(03):14-27.

四、参考数据
绿色金融市场规模：截至2023年末，中国本外币绿色贷款余额已超过220万亿元。中国绿色债券发行规模位居全球前列
数字技术赋能信贷：全国中小微企业资金流信用信息共享平台在重庆的应用显示，银行通过穿透分析企业动态数据，可为缺乏抵押物的科技型企业提供支持。截至2025年7月末，当地银行依托该平台累计为1143家科技企业发放贷款57.47亿元`,
    },
    人文类: {
      topic: "数字时代青少年网络身份构建及其对社会互动的影响",
      reference: `# AI生成参考资料

1. 现实背景
随着互联网和移动通信技术的飞速发展，数字时代已深刻改变了人类社会的方方面面，特别是对青少年的成长与发展产生了前所未有的影响。青少年作为“数字原住民”，其生活、学习和社交活动已与网络深度融合。网络平台如微信、微博、抖音、B站等不仅是他们获取信息、娱乐消遣的场所，更是其构建自我、表达个性、寻求认同的重要空间。
然而，网络空间的匿名性、虚拟性和多元性也给青少年的身份构建带来了复杂的挑战。在网络中，青少年可以尝试不同的身份标签，塑造多元的自我形象，这既提供了自我探索的可能性，也可能导致身份认同的困惑。网络社群的快速兴起，使得青少年更容易找到志同道合的群体，形成圈层文化，但同时也可能加剧社会分化，影响与不同背景人群的有效互动。例如，根据最新的统计数据，中国青少年日均网络使用时长已突破6小时，其中超过70%的时间用于社交媒体和短视频平台。这种高度沉浸式的网络生活无疑对他们的现实社会互动模式产生了深远影响。

2. 相关政策
为规范网络空间，保障青少年健康成长，中国政府和相关机构出台了一系列政策法规。例如，国家互联网信息办公室于2019年发布《青少年网络保护条例》，强调加强对青少年网络信息内容生态的治理，严厉打击网络欺凌、网络谣言等行为。此外，教育部联合多部门印发《关于加强中小学生手机管理工作的通知》，旨在限制学生在校期间使用手机，减少其对学习和身心健康的影响。这些政策的出台，体现了国家对青少年网络行为及其社会影响的高度关注，也为本研究提供了重要的政策背景。然而，有学者指出，这些政策在执行过程中面临诸多挑战，例如，某省份一项针对校园网络管理的政策显示，自2023年春季学期起，所有中小学需严格执行“无手机校园”规定，但实施一年后，学生的线上学习效率反而出现了普遍下降。

3. 相关文献及列表
文献一： 张晓华. 数字时代青少年网络身份建构的路径与困境. 青年研究,2021, (3)， 45-53.
摘要：本文深入探讨了青少年在数字环境中构建自我身份的多种方式，包括通过虚拟形象、网络昵称、社交媒体内容发布等。作者认为，网络身份建构为青少年提供了更大的自由度，但也可能导致现实与虚拟身份之间的张力，甚至出现身份认同危机。研究指出，过度的网络沉浸可能使得青少年对现实社交产生疏离感，从而影响其线下社会互动能力。
文献二：宋辰婷，邱相奎.超越体验：虚实交互下的身份重组和文化行动——基于虚拟形象直播青少年亚文化的研究[J].中国青年研究，2021，(08):85-93.
摘要：在网络社会中，青少年亚文化的性质和形式被赋予新意。虚拟形象直播作为一种流行的青少年亚文化，体现了青少年对现实的反思以及追求自我实现的愿望和尝试。为应对主流收编和个体化趋势下的无意义感，青少年通过追寻身份重组，形成新的自我文化共同体。亚文化也从传统的抵抗性取向转为强调自我创造性的文化行动。虚拟直播亚文化通过解构传统、社群选择与自我赋能，构建了一套与传统亚文化不同的运作逻辑，成为了一种主动的互动建构机制。
文献三： 李云磊..虚拟社群中的认同危机：基于Z世代的网络民族志研究[J]. 中国青年研究,2023, (1), 88-97.
文献内容： 本文采用网络民族志方法，对Z世代在特定虚拟社群中的互动行为进行了观察和分析。研究发现，在虚拟社群中，个体通过共同的兴趣爱好、价值观构建强烈的集体认同，但这可能导致对外部世界的排斥。文章提出，这种强烈的社群认同可能在一定程度上塑造了青少年的网络身份，并影响他们与不同社群成员的互动方式。
文献四：罗婷,周治金. 网络化身对青少年身份认同构建的影响[J]. 中国青年研究,2013,(1): 84-87.
文献内容： 虚拟网络空间中的身份认同是通过网络化身的沟通与交流构建的。青少年作为网络主体在选择网络化身的过程中,同时也为确立怎样的身份认同提供了线索。虚拟空间中的网络化身形象是个体在虚拟空间的重要人格表征,而选择网络化身形象的过程又是个体能对现实人格进行重塑的过程。在虚拟、匿名的网络空间中,如何选择网络化身,依托网络化身怎样开展网络生活,对于青少年形成现实与虚拟整合的人格有重要影响。

4. 可能用到的数据
中国青少年网民规模及结构：根据中国互联网络信息中心（CNNIC）发布的《中国互联网络发展状况统计报告》，截至2024年6月，我国10–19岁网民规模为2亿，占网民总数的 13.6%。
青少年表达偏好：有研究指出，68.2%的青少年表示更倾向于在“半熟人”的兴趣社群（如B站、小红书、抖音）中表达观点，而在“强熟人”社交（如微信）中则发言较少。
青少年社交媒体使用时长及偏好：某项由中国青少年研究中心进行的调查显示，青少年日均使用社交媒体的时间为4小时，其中微信、抖音和B站是他们最常使用的平台。
青少年网络身份认同的调查数据：一项针对高中生的问卷调查结果显示，有40%的学生认为自己在网络上的形象与现实生活中的形象存在差异，其中5%的学生表示这种差异较大。
青少年网络欺凌事件发生率： 国际某青少年网络安全机构发布报告称，全球每年有超过25%的青少年曾遭受不同形式的网络欺凌，且这一比例呈逐年上升趋势。`,
    },
  }

  return topics[subject as keyof typeof topics] || topics["理工类"]
}

export default function ExperimentPage() {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [reference, setReference] = useState("")
  const [modifiedContent, setModifiedContent] = useState("")
  const [startTime, setStartTime] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    // 获取被试者信息
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")

    console.log("[v0] experiment 页面加载时的 participantData:", participantData)
    console.log("[v0] subject 字段是否存在:", !!participantData.subject)
    console.log("[v0] subject 字段值:", participantData.subject)
    console.log("[v0] subject 字段类型:", typeof participantData.subject)

    if (!participantData.subject) {
      console.error("[v0] ❌ subject 字段不存在或为空，即将跳转到首页")
      console.log("[v0] 完整的 participantData:", JSON.stringify(participantData, null, 2))
      router.push("/")
      return
    }

    console.log("[v0] ✅ subject 字段验证通过，继续加载实验页面")

    setSubject(participantData.subject)
    const { topic: selectedTopic, reference: selectedReference } = getTopicAndReference(participantData.subject)
    setTopic(selectedTopic)
    setReference(selectedReference)

    // 开始计时
    const start = Date.now()
    setStartTime(start)
    participantData.experimentStartTime = new Date().toISOString()
    localStorage.setItem("participantData", JSON.stringify(participantData))

    // 更新计时器
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = () => {
    if (!modifiedContent.trim()) {
      alert("请填写修改内容")
      return
    }

    // 计算修改时间
    const endTime = Date.now()
    const modificationTime = Math.floor((endTime - startTime) / 1000)

    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")

    const rulesConfirmedTime = participantData.rulesConfirmedTime
    const experimentEndTime = new Date().toISOString()
    let totalTime = 0

    if (rulesConfirmedTime) {
      const rulesTime = new Date(rulesConfirmedTime).getTime()
      const endTimeMs = new Date(experimentEndTime).getTime()
      totalTime = Math.floor((endTimeMs - rulesTime) / 1000)
    }

    const experimentData = {
      ...participantData,
      taskType: "写作",
      experimentType: "实验①",
      topic,
      originalReference: reference, // 保存原始参考资料
      modifiedContent, // 保存修改后的内容
      modificationTime,
      totalTime, // 添加实验完成总时间
      experimentEndTime,
    }

    localStorage.setItem("experimentData", JSON.stringify(experimentData))
    console.log("[v0] 修正阶段数据已保存到 localStorage")
    console.log("[v0] modifiedContent 长度:", modifiedContent.length)
    console.log("[v0] modifiedContent 前100字:", modifiedContent.substring(0, 100))
    console.log("[v0] totalTime (秒):", totalTime)
    console.log("[v0] 完整 experimentData:", experimentData)

    // 跳转到撰写页面
    router.push("/writing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 计时器 */}
        <Card className="bg-white/80 backdrop-blur">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>实验用时</span>
              </div>
              <div className="text-2xl font-mono font-bold text-blue-600">{formatTime(elapsedTime)}</div>
            </div>
          </CardContent>
        </Card>

        {/* 选题展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              您的选题是
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-blue-700">{topic}</p>
            <p className="text-sm text-muted-foreground mt-2">学科类别：{subject}</p>
          </CardContent>
        </Card>

        {/* 实验说明提示卡片 */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-blue-700">📋 实验说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-blue-900 mb-2">1、素材中的AI幻觉主要包括：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>【现实背景】中的捏造案例</li>
                  <li>【政策】的时间点和部分内容</li>
                  <li>【相关文献】中的捏造文献</li>
                  <li>【参考数据】的捏造数据</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-blue-900 mb-2">2、修正任务：</p>
                <p className="text-gray-700 ml-4">
                  可以使用AI工具（如ChatGPT、DeepSeek）来交叉验证素材中的信息是真实or捏造，当然也可以自行搜索检查。
                </p>
                <p className="text-amber-700 font-medium ml-4 mt-2">
                  💡 PS：建议一段一段喂给AI，可大幅提高识别准确性！
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900 mb-2">3、注意：</p>
                <p className="text-gray-700 ml-4">
                  写作素材仅限于本实验提供的，不要再自行添加互联网上的其他素材（如案例、数据等）
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 参考资料 */}
        <Card>
          <CardHeader>
            <CardTitle>您的参考资料是</CardTitle>
            <p className="text-sm text-amber-600 font-medium">⚠️ 以下资料为AI生成，可能包含错误信息，请仔细核查</p>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{reference}</pre>
            </div>
          </CardContent>
        </Card>

        {/* 修改内容填写 */}
        <Card>
          <CardHeader>
            <CardTitle>请将您的修改内容填写至下面的文本框</CardTitle>
            <p className="text-sm text-muted-foreground">请对上述参考资料进行核查和修正，并填写修正后的内容</p>
            <p className="text-sm font-bold text-blue-700 mt-2">⚠️ 注意：这里填写的只是修正后的参考资料</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={modifiedContent}
              onChange={(e) => setModifiedContent(e.target.value)}
              placeholder="请在此填写您修正后的参考资料内容..."
              className="min-h-[300px] font-sans"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmit} size="lg" className="px-12">
                提交
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
