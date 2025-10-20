"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download } from "lucide-react"

export default function ThankYouPage() {
  const router = useRouter()
  const [experimentData, setExperimentData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("experimentData")
    if (data) {
      setExperimentData(JSON.parse(data))
    }
  }, [])

  const downloadData = () => {
    if (!experimentData) return

    const dataStr = JSON.stringify(experimentData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `experiment-data-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}分${secs}秒`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-center">实验完成</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">感谢您参与本次行为经济学实验！</p>
            {experimentData && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  您的修改用时：
                  <span className="font-bold text-blue-700 ml-2">{formatTime(experimentData.modificationTime)}</span>
                </p>
                {experimentData.wordCount && (
                  <p className="text-sm text-muted-foreground">
                    撰写字数：
                    <span className="font-bold text-blue-700 ml-2">{experimentData.wordCount}字</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button onClick={downloadData} className="w-full bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              下载实验数据
            </Button>
            <Button onClick={() => router.push("/")} className="w-full">
              返回首页
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <p>实验数据已保存在浏览器本地存储中</p>
            <p className="mt-1">研究人员可通过浏览器开发者工具的 localStorage 查看完整数据</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
