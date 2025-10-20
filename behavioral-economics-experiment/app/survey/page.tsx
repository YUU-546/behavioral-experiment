"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ClipboardList } from "lucide-react"

// 问卷数据结构
const surveyData = {
  instruction: "请根据您在修正 AI 生成内容（如事实错误、逻辑漏洞、不当引用）时的真实感受，在对应选项上打√。",
  scale: "（1 = 完全不符合，2 = 比较不符合，3 = 不确定，4 = 比较符合，5 = 完全符合）",
  dimensions: [
    {
      id: "anxiety",
      title: "维度 1：焦虑程度",
      questions: [
        { id: "q1_1", text: "修正 AI 幻觉时，我经常感到焦虑或紧张。" },
        { id: "q1_2", text: "担心遗漏 AI 生成的错误会影响文章质量。" },
        { id: "q1_3", text: "反复检查 AI 内容导致自我怀疑。" },
        { id: "q1_4", text: "修正过程中产生完美主义倾向，难以停止修改。" },
        { id: "q1_5", text: "对 AI 不可靠性的担忧干扰了我的写作节奏。" },
      ],
    },
    {
      id: "cognitive",
      title: "维度 2：认知影响",
      questions: [
        { id: "q2_1", text: "修正 AI 幻觉时，我需要频繁切换注意力。" },
        { id: "q2_2", text: "信息过载导致记忆负担加重（如混淆原始内容与修正内容）。" },
        { id: "q2_3", text: "修正行为打断了我的写作流畅性。" },
        { id: "q2_4", text: "过度关注 AI 错误使我忽略了文章整体结构。" },
        { id: "q2_5", text: "AI 生成的矛盾信息让我难以形成连贯思路。" },
      ],
    },
    {
      id: "decision",
      title: "维度 3：决策影响",
      questions: [
        { id: "q3_1", text: "面对 AI 生成的不确定内容时，我经常犹豫不决。" },
        { id: "q3_2", text: "修正行为降低了我的写作决策效率。" },
        { id: "q3_3", text: "对 AI 推荐的过度依赖削弱了我的判断力。" },
        { id: "q3_4", text: "修正次数越多，我越难判断哪些修改是必要的。" },
        { id: "q3_5", text: "担心修正不足或过度影响了我的最终决策质量。" },
      ],
    },
  ],
}

export default function SurveyPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    // 检查是否完成了前面的步骤
    const experimentData = JSON.parse(localStorage.getItem("experimentData") || "{}")
    if (!experimentData.writingContent) {
      router.push("/")
      return
    }
  }, [router])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = () => {
    // 检查是否所有问题都已回答
    const totalQuestions = surveyData.dimensions.reduce((sum, dim) => sum + dim.questions.length, 0)

    if (Object.keys(answers).length < totalQuestions) {
      alert(`请回答所有问题。当前已回答 ${Object.keys(answers).length}/${totalQuestions} 题`)
      return
    }

    // 保存问卷数据
    const experimentData = JSON.parse(localStorage.getItem("experimentData") || "{}")
    const finalData = {
      ...experimentData,
      surveyAnswers: answers,
      surveyCompletedTime: new Date().toISOString(),
    }

    localStorage.setItem("experimentData", JSON.stringify(finalData))
    console.log("完整实验数据（含问卷）：", finalData)

    router.push("/thank-you")
  }

  // 计算完成进度
  const totalQuestions = surveyData.dimensions.reduce((sum, dim) => sum + dim.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = Math.round((answeredQuestions / totalQuestions) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 问卷标题和说明 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <ClipboardList className="h-6 w-6" />
              问卷调查
            </CardTitle>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground leading-relaxed">{surveyData.instruction}</p>
              <p className="font-medium text-foreground">{surveyData.scale}</p>
            </div>
          </CardHeader>
        </Card>

        {/* 进度提示 */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">完成进度</span>
            <span className="text-sm text-muted-foreground">
              {answeredQuestions} / {totalQuestions} 题
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问卷维度和问题 */}
        {surveyData.dimensions.map((dimension, dimIndex) => (
          <Card key={dimension.id}>
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">{dimension.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {dimension.questions.map((question, qIndex) => (
                <div key={question.id} className="space-y-3 pb-6 border-b last:border-b-0 last:pb-0">
                  <Label className="text-base font-normal leading-relaxed block">
                    {dimIndex + 1}.{qIndex + 1} {question.text}
                  </Label>
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    className="flex gap-6"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                        <Label htmlFor={`${question.id}-${value}`} className="cursor-pointer font-normal">
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* 提交按钮 */}
        <div className="flex justify-center pt-4">
          <Button onClick={handleSubmit} size="lg" className="px-16">
            提交问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
