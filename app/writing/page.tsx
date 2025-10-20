"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileText, PenTool } from "lucide-react"

export default function WritingPage() {
  const router = useRouter()
  const [modifiedContent, setModifiedContent] = useState("")
  const [writingContent, setWritingContent] = useState("")
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    // 获取实验数据
    const experimentData = JSON.parse(localStorage.getItem("experimentData") || "{}")

    if (!experimentData.modifiedContent) {
      router.push("/")
      return
    }

    setModifiedContent(experimentData.modifiedContent)
  }, [router])

  // 计算字数
  useEffect(() => {
    const count = writingContent.trim().replace(/\s+/g, "").length
    setWordCount(count)
  }, [writingContent])

  const handleSubmit = () => {
    if (!writingContent.trim()) {
      alert("请填写项目研究背景")
      return
    }

    if (wordCount < 700) {
      const confirm = window.confirm(`当前字数为${wordCount}字，建议撰写800字左右。是否继续提交？`)
      if (!confirm) return
    }

    // 保存撰写内容
    const experimentData = JSON.parse(localStorage.getItem("experimentData") || "{}")
    const finalData = {
      ...experimentData,
      writingContent,
      wordCount,
      writingCompletedTime: new Date().toISOString(),
    }

    localStorage.setItem("experimentData", JSON.stringify(finalData))
    console.log("完整实验数据：", finalData)

    router.push("/survey")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 修正后的参考资料展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              您修正后的参考资料
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{modifiedContent}</pre>
            </div>
          </CardContent>
        </Card>

        {/* 撰写项目背景 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              现在请根据您修正后的参考资料，完成800字项目研究背景撰写
            </CardTitle>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>要求：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>字数约800字</li>
                <li>需包含现实背景和理论背景</li>
                <li>需要有文献引用列表</li>
              </ul>
            </div>
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
