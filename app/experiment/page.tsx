"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Clock, FileText } from "lucide-react"

// 根据学科获取选题和参考资料
const getTopicAndReference = (discipline: string) => {
  const topics = {
    理工类: {
      topic: "基于深度学习的图像识别技术在智能制造中的应用研究",
      reference: `# AI生成参考资料

## 现实背景
随着工业4.0时代的到来，智能制造已成为全球制造业转型升级的重要方向。据《中国制造2025》报告显示，到2025年，我国智能制造装备市场规模将超过3万亿元。图像识别技术作为智能制造的核心技术之一，在产品质量检测、生产过程监控等方面发挥着重要作用。

## 相关政策
- 国务院《新一代人工智能发展规划》(2017)明确提出推动人工智能在制造业的深度应用
- 工信部《智能制造发展规划(2016-2020年)》强调视觉识别技术的重要性

## 相关文献
1. Zhang, L., et al. (2021). "Deep Learning for Smart Manufacturing: Methods and Applications." Journal of Manufacturing Systems, 48, 144-156.
   - 该文献系统综述了深度学习在智能制造中的应用，提出了基于CNN的质量检测框架，准确率达到98.5%。

2. Wang, J., & Li, H. (2020). "Computer Vision in Industrial Automation: A Survey." IEEE Transactions on Industrial Informatics, 16(3), 2000-2015.
   - 研究表明，计算机视觉技术可将缺陷检测效率提升300%，误检率降低至0.5%以下。

3. Chen, Y., et al. (2022). "Real-time Object Detection for Smart Manufacturing Using YOLO." Robotics and Computer-Integrated Manufacturing, 76, 102321.
   - 提出了改进的YOLO算法，在复杂工业场景下实现了实时检测，处理速度达到45fps。

## 可能用到的数据
- ImageNet工业场景数据集（包含50万张标注图像）
- MVTec AD异常检测数据集（15个类别，5000+张图像）
- 某汽车制造企业提供的真实生产线数据（2019-2023年，约10TB）`,
    },
    经管类: {
      topic: "数字经济背景下平台企业的市场势力与反垄断规制研究",
      reference: `# AI生成参考资料

## 现实背景
近年来，数字平台企业快速发展，阿里巴巴、腾讯、美团等平台企业市值均超千亿美元。然而，平台经济的"赢者通吃"特征引发了市场垄断担忧。2021年，国家市场监管总局对阿里巴巴处以182.28亿元罚款，标志着我国平台反垄断进入新阶段。

## 相关政策
- 《反垄断法》修订（2022年）新增"平台经济"专门条款
- 国务院《关于平台经济领域的反垄断指南》（2021）
- 《数字经济促进条例》（2023年征求意见稿）

## 相关文献
1. Tirole, J., & Rochet, J. C. (2003). "Platform Competition in Two-Sided Markets." Journal of the European Economic Association, 1(4), 990-1029.
   - 奠定了双边市场理论基础，提出平台定价策略需考虑网络外部性，该文被引用超过8000次。

2. 张维迎, 李晓鹏. (2021). "平台经济的市场势力测度与反垄断规制." 经济研究, 56(3), 78-94.
   - 构建了平台市场势力指数(PMI)，实证发现我国TOP10平台企业的平均PMI值为0.72，显著高于传统行业。

3. Wu, T. (2018). "The Curse of Bigness: Antitrust in the New Gilded Age." Columbia Global Reports.
   - 分析了美国科技巨头的垄断行为，提出"结构性分拆"的政策建议，影响了全球反垄断政策走向。

## 可能用到的数据
- 国家市场监管总局反垄断执法案例数据库（2008-2023）
- 中国互联网平台企业财务数据（Wind数据库，2015-2023）
- 全球平台经济反垄断案例数据集（包含美国、欧盟、中国等200+案例）`,
    },
    人文类: {
      topic: "新媒体时代非物质文化遗产的数字化传播与保护研究",
      reference: `# AI生成参考资料

## 现实背景
截至2023年，我国共有43项世界级非物质文化遗产，居世界首位。然而，随着现代化进程加快，许多非遗项目面临传承危机。据文化和旅游部统计，约30%的国家级非遗传承人年龄超过70岁。新媒体技术为非遗保护提供了新路径，抖音、B站等平台上的非遗内容播放量已突破100亿次。

## 相关政策
- 《中华人民共和国非物质文化遗产法》（2011）
- 文化和旅游部《"十四五"非物质文化遗产保护规划》（2021）
- 《关于进一步加强非物质文化遗产保护工作的意见》（2022）

## 相关文献
1. Giaccardi, E. (2012). "Heritage and Social Media: Understanding Heritage in a Participatory Culture." Routledge.
   - 提出"参与式文化遗产"概念，认为社交媒体改变了遗产的生产、传播和消费方式，该书被引用超过1200次。

2. 巫志南, 王晓华. (2020). "数字技术赋能非物质文化遗产传播的机制与路径." 新闻与传播研究, 27(8), 45-62.
   - 通过对500个非遗短视频的内容分析，发现"场景化叙事"和"互动性体验"是提升传播效果的关键因素。

3. Kalay, Y. E., et al. (2008). "New Heritage: New Media and Cultural Heritage." Routledge.
   - 系统论述了数字技术在文化遗产保护中的应用，提出"数字化不是目的，而是实现文化传承的手段"。

## 可能用到的数据
- 中国非物质文化遗产数字博物馆数据（包含1557项国家级非遗项目）
- 抖音、B站非遗内容传播数据（2020-2023，约50万条视频）
- 全国非遗传承人口述史数字档案（文化和旅游部，2010-2023）`,
    },
  }

  return topics[discipline as keyof typeof topics] || topics["理工类"]
}

export default function ExperimentPage() {
  const router = useRouter()
  const [discipline, setDiscipline] = useState("")
  const [topic, setTopic] = useState("")
  const [reference, setReference] = useState("")
  const [modifiedContent, setModifiedContent] = useState("")
  const [startTime, setStartTime] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    // 获取被试者信息
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")

    if (!participantData.discipline) {
      router.push("/")
      return
    }

    setDiscipline(participantData.discipline)
    const { topic: selectedTopic, reference: selectedReference } = getTopicAndReference(participantData.discipline)
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

    // 保存实验数据
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")
    const experimentData = {
      ...participantData,
      topic,
      modifiedContent,
      modificationTime,
      experimentEndTime: new Date().toISOString(),
    }

    localStorage.setItem("experimentData", JSON.stringify(experimentData))
    console.log("修正阶段数据：", experimentData)

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
            <p className="text-sm text-muted-foreground mt-2">学科类别：{discipline}</p>
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
