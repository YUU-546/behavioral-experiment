"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileText, PenTool, Clock, Tag } from "lucide-react"

// 根据学科获取选题和参考资料
const getTopicAndReference = (discipline: string) => {
  const topics = {
    理工类: {
      topic: "人工智能在智能制造中的应用研究",
      reference: `参考资料（AI生成）：

一、现实背景
随着工业4.0的推进，智能制造已成为制造业转型升级的重要方向。人工智能技术在生产过程优化、质量控制、设备维护等方面展现出巨大潜力。据统计，2023年全球智能制造市场规模达到3500亿美元，预计2025年将突破5000亿美元。

二、相关政策
《中国制造2025》明确提出要推进信息化与工业化深度融合，发展智能制造。工信部2022年发布的《"十四五"智能制造发展规划》进一步强调了人工智能在制造业中的核心地位。

三、相关文献
1. Zhang, L. et al. (2023). "Deep Learning for Predictive Maintenance in Smart Manufacturing". Journal of Manufacturing Systems, 68, 234-248.
2. Wang, K. (2022). "AI-driven Quality Control in Industrial Production". International Journal of Production Research, 60(12), 3721-3738.
3. Liu, Y. & Chen, X. (2023). "Machine Learning Applications in Supply Chain Optimization". Computers in Industry, 145, 103821.

四、可能用到的数据
- 制造业AI应用渗透率：2023年达到32%
- 智能制造企业生产效率提升：平均25-40%
- 设备故障预测准确率：使用AI后提升至85%以上`,
    },
    经管类: {
      topic: "数字经济背景下平台企业的竞争策略研究",
      reference: `参考资料（AI生成）：

一、现实背景
数字经济时代，平台企业通过网络效应和数据优势重塑了市场竞争格局。2023年中国数字经济规模达到50.2万亿元，占GDP比重超过41%。平台企业在电商、出行、外卖等领域形成了新的竞争态势。

二、相关政策
《反垄断法》2022年修订版加强了对平台企业的监管。国家市场监管总局发布的《关于平台经济领域的反垄断指南》为平台竞争行为提供了规范框架。

三、相关文献
1. Parker, G. & Van Alstyne, M. (2023). "Platform Competition and Market Power". Strategic Management Journal, 44(5), 1156-1182.
2. 陈晓红, 李明 (2023). "数字平台企业竞争策略与市场绩效研究". 管理世界, 39(3), 98-115.
3. Rochet, J.C. & Tirole, J. (2022). "Two-Sided Markets: A Progress Report". RAND Journal of Economics, 53(2), 312-340.

四、可能用到的数据
- 中国平台经济用户规模：2023年超过10亿
- 头部平台市场集中度：CR5达到68%
- 平台企业研发投入占比：平均达到营收的12-15%`,
    },
    人文类: {
      topic: "社交媒体时代的青年文化认同建构研究",
      reference: `参考资料（AI生成）：

一、现实背景
社交媒体深刻改变了青年群体的文化实践和认同建构方式。截至2023年，中国网民规模达10.79亿，其中18-35岁青年占比超过45%。短视频、社交平台成为青年文化表达和身份认同的重要场域。

二、相关政策
《网络信息内容生态治理规定》强调要营造良好网络生态。共青团中央发布的《关于加强新时代青年网络文化建设的意见》关注青年网络文化引导。

三、相关文献
1. Boyd, D. (2023). "It's Complicated: The Social Lives of Networked Teens". Yale University Press.
2. 喻国明, 李彪 (2023). "社交媒体与青年亚文化认同". 新闻与传播研究, 30(2), 45-62.
3. Jenkins, H. et al. (2022). "Participatory Culture in a Networked Era". Polity Press.

四、可能用到的数据
- 青年日均社交媒体使用时长：3.2小时
- 通过社交媒体参与文化活动的青年比例：76%
- 青年网络文化社群参与率：62%`,
    },
  }

  return topics[discipline as keyof typeof topics] || topics["理工类"]
}

export default function Exp2WritingPage() {
  const router = useRouter()
  const [topic, setTopic] = useState("")
  const [reference, setReference] = useState("")
  const [writingContent, setWritingContent] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [addCorrectionLabel, setAddCorrectionLabel] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")

    if (!participantData.discipline) {
      router.push("/")
      return
    }

    const { topic: selectedTopic, reference: selectedReference } = getTopicAndReference(participantData.discipline)
    setTopic(selectedTopic)
    setReference(selectedReference)

    // 开始计时
    const start = Date.now()
    setStartTime(start)

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  useEffect(() => {
    const count = writingContent.trim().replace(/\s+/g, "").length
    setWordCount(count)
  }, [writingContent])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = () => {
    if (!writingContent.trim()) {
      alert("请填写项目研究背景")
      return
    }

    if (wordCount < 700) {
      const confirm = window.confirm(`当前字数为${wordCount}字，建议撰写800字左右。是否继续提交？`)
      if (!confirm) return
    }

    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")
    const finalData = {
      ...participantData,
      topic,
      writingContent,
      wordCount,
      addCorrectionLabel,
      writingTime: elapsedTime,
      completedTime: new Date().toISOString(),
    }

    localStorage.setItem("experimentData", JSON.stringify(finalData))
    console.log("实验②完整数据：", finalData)

    router.push("/thank-you")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 计时器 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-700">
              <Clock className="h-5 w-5" />
              用时：{formatTime(elapsedTime)}
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
            <p className="text-lg font-medium">{topic}</p>
          </CardContent>
        </Card>

        {/* 参考资料展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              您的参考资料是
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{reference}</pre>
            </div>
          </CardContent>
        </Card>

        {/* 撰写项目背景 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              请撰写800字左右的项目研究背景
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={writingContent}
              onChange={(e) => setWritingContent(e.target.value)}
              placeholder="请在此撰写项目研究背景，包括现实背景、理论背景和文献引用..."
              className="min-h-[400px] font-sans"
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                当前字数：
                <span
                  className={`ml-2 font-bold ${wordCount >= 700 && wordCount <= 900 ? "text-green-600" : wordCount > 900 ? "text-amber-600" : "text-blue-600"}`}
                >
                  {wordCount}
                </span>
                <span className="ml-1">字</span>
              </div>
            </div>

            {/* 修正标签选择 */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="correction-label"
                  checked={addCorrectionLabel}
                  onCheckedChange={(checked) => setAddCorrectionLabel(checked as boolean)}
                />
                <Label htmlFor="correction-label" className="flex items-center gap-2 cursor-pointer text-base">
                  <Tag className="h-4 w-4 text-amber-600" />
                  <span>我已对AI生成的参考资料进行了修正，添加修正标签</span>
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mt-2 ml-7">
                添加修正标签的文章会有更多人浏览，奖励也会更丰厚
              </p>
            </div>

            <Button onClick={handleSubmit} size="lg" className="w-full">
              提交
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
