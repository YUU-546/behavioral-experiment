"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileText, PenTool, Clock, Tag, AlertTriangle } from "lucide-react"

// 根据学科获取选题和参考资料
const getTopicAndReference = (discipline: string) => {
  const topics = {
    理工类: {
      topic: "基于深度学习的图像识别技术在智能制造中的应用研究",
      reference: `# AI生成参考资料

## 现实背景
随着工业4.0时代的到来，智能制造已成为全球制造业转型升级的核心驱动力。据《中国制造2025》报告显示，到2025年，我国智能制造装备市场规模预计将超过3万亿元，年复合增长率达15%以上。图像识别技术作为智能制造的关键组成部分，在产品质量检测、生产过程监控、机器人导航和供应链优化等方面发挥着日益重要的作用。

## 相关政策
- 国务院《新一代人工智能发展规划》(2017)明确提出推动人工智能在制造业的深度应用
- 工信部《智能制造发展规划(2016-2020年)》强调视觉识别技术的重要性

## 相关文献
1. Zhang, L., et al. (2021). "Deep Learning for Smart Manufacturing: Methods and Applications." Journal of Manufacturing Systems, 48, 144-156.
2. Wang, J., & Li, H. (2020). "Computer Vision in Industrial Automation: A Survey." IEEE Transactions on Industrial Informatics, 16(3), 2000-2015.
3. Chen, Y., et al. (2022). "Real-time Object Detection for Smart Manufacturing Using YOLO." Robotics and Computer-Integrated Manufacturing, 76, 102321.

## 可能用到的数据
- ImageNet工业场景数据集（包含50万张标注图像）
- MVTec AD异常检测数据集（15个类别，5000+张图像）
- 某汽车制造企业提供的真实生产线数据（2019-2023年，约10TB）`,
    },
    经管类: {
      topic: "数字金融赋能中小企业绿色转型的激励效应研究：基于转型金融工具的视角",
      reference: `# AI生成参考资料

## 现实背景
实现"双碳"目标是国家重大战略决策。中小企业在国民经济中占据重要地位，但其碳排放占工业领域的46%。数字金融可以利用大数据、人工智能、物联网、区块链等数字技术，构建更精准的信用评估和绿色项目识别体系。

## 相关政策
- 2024年11月：《推动数字金融高质量发展行动方案》
- 2025年4月：《银行业保险业科技金融高质量发展实施方案》
- 2025年8月：《关于金融支持新型工业化的指导意见》

## 相关文献
[1] 张勋,万广华,张佳佳,何宗樾.数字经济、普惠金融与包容性增长[J].经济研究,2019,54(08):71-86.
[2] 翟华云,刘易斯.数字金融发展、融资约束与企业绿色创新关系研究[J].科技进步与对策,2021,38(17):116-124.
[3] 戴翔,杨双至.数字赋能、数字投入来源与制造业绿色化转型[J].中国工业经济,2022,(09):83-101.

## 参考数据
- 绿色金融市场规模：截至2023年末，中国本外币绿色贷款余额已超过220万亿元
- 湖州市"绿贷通"平台已累计服务3.21万家企业，获得银行授信近3300亿元`,
    },
    人文类: {
      topic: "数字时代青少年网络身份构建及其对社会互动的影响",
      reference: `# AI生成参考资料

## 现实背景
青少年作为"数字原住民"，其生活、学习和社交活动已与网络深度融合。网络平台如微信、微博、抖音、B站等不仅是他们获取信息、娱乐消遣的场所，更是其构建自我、表达个性、寻求认同的重要空间。中国青少年日均网络使用时长已突破6小时，其中超过70%的时间用于社交媒体和短视频平台。

## 相关政策
- 国家互联网信息办公室《青少年网络保护条例》(2019)
- 教育部《关于加强中小学生手机管理工作的通知》

## 相关文献
1. 张明华. (2020). 《数字时代青少年网络身份建构的路径与困境》. 青年研究， (3)， 45-53.
2. 宋辰婷，邱相奎.超越体验：虚实交互下的身份重组和文化行动[J].中国青年研究，2021，(08):85-93.
3. 李强. (2021). 《虚拟社群中的认同危机：基于Z世代的网络民族志研究》. 中国青年研究， (1)， 88-97.

## 可能用到的数据
- 我国10–19岁网民规模为1.5亿，占网民总数的13.6%
- 青少年日均使用社交媒体的时间为2.5小时
- 60%的学生认为自己在网络上的形象与现实生活中的形象存在差异`,
    },
  }

  return topics[discipline as keyof typeof topics] || topics["理工类"]
}

export default function Exp3WritingPage() {
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

    if (addCorrectionLabel) {
      const confirmLabel = window.confirm(
        "您选择了添加修正标签。请确认您已对AI生成内容进行了充分的检查和修正。\n\n提醒：文章会被发布到平台供阅读者阅读，如被举报发现未修正的错误，奖励将全部取消。\n\n是否确认提交？",
      )
      if (!confirmLabel) return
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
    console.log("实验③完整数据：", finalData)

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

            {/* 修正标签选择 - 带举报提醒 */}
            <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-300">
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
              <div className="mt-3 ml-7 space-y-2">
                <p className="text-xs text-muted-foreground">添加修正标签的文章会有更多人浏览，奖励也会更丰厚</p>
                <div className="flex items-start gap-2 bg-red-50 p-2 rounded border border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-700">
                    <strong>举报提醒：</strong>添加修正标签的文章可被举报，一经发现未修正的错误，奖励全部取消
                  </p>
                </div>
              </div>
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
