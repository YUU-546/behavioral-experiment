"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download, AlertCircle, RefreshCw } from "lucide-react"
import { submitToGoogleSheets } from "@/lib/google-sheets"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ThankYouPage() {
  const router = useRouter()
  const [experimentData, setExperimentData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("experimentData")
    if (data) {
      const parsedData = JSON.parse(data)
      setExperimentData(parsedData)
      submitDataToGoogleSheets(parsedData)
    }
  }, [])

  const submitDataToGoogleSheets = async (data: any) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitToGoogleSheets(data)
      setSubmitStatus(result)

      if (result.success) {
        console.log("[v0] 实验数据已成功提交到 Google Sheets")
      } else {
        console.error("[v0] 提交失败:", result.message)
      }
    } catch (error) {
      console.error("[v0] 提交数据到 Google Sheets 失败:", error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "提交失败",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetrySubmit = () => {
    if (experimentData) {
      submitDataToGoogleSheets(experimentData)
    }
  }

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

  const calculateExp1TotalTime = () => {
    if (!experimentData) return 0
    const rulesTime = new Date(experimentData.rulesConfirmedTime).getTime()
    const completedTime = new Date(experimentData.writingCompletedTime).getTime()
    return Math.floor((completedTime - rulesTime) / 1000)
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

            {experimentData && experimentData.experimentType === "实验①" && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4 space-y-2">
                {experimentData.modificationTime && (
                  <p className="text-sm text-muted-foreground">
                    修改用时：
                    <span className="font-bold text-blue-700 ml-2">{formatTime(experimentData.modificationTime)}</span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  实验完成总时间：
                  <span className="font-bold text-blue-700 ml-2">{formatTime(calculateExp1TotalTime())}</span>
                </p>
                {experimentData.wordCount && (
                  <p className="text-sm text-muted-foreground">
                    本次写作字数：
                    <span className="font-bold text-blue-700 ml-2">{experimentData.wordCount}字</span>
                  </p>
                )}
              </div>
            )}

            {experimentData && experimentData.experimentType === "实验②" && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4 space-y-2">
                {experimentData.writingTime && (
                  <p className="text-sm text-muted-foreground">
                    实验完成时间：
                    <span className="font-bold text-blue-700 ml-2">{formatTime(experimentData.writingTime)}</span>
                  </p>
                )}
                {experimentData.wordCount && (
                  <p className="text-sm text-muted-foreground">
                    本次写作字数：
                    <span className="font-bold text-blue-700 ml-2">{experimentData.wordCount}字</span>
                  </p>
                )}
              </div>
            )}

            {experimentData && experimentData.experimentType === "实验③" && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4 space-y-2">
                {experimentData.writingTime && (
                  <p className="text-sm text-muted-foreground">
                    实验完成时间：
                    <span className="font-bold text-blue-700 ml-2">{formatTime(experimentData.writingTime)}</span>
                  </p>
                )}
                {experimentData.wordCount && (
                  <p className="text-sm text-muted-foreground">
                    本次写作字数：
                    <span className="font-bold text-blue-700 ml-2">{experimentData.wordCount}字</span>
                  </p>
                )}
              </div>
            )}

            {experimentData && experimentData.taskType === "阅读" && (
              <div className="bg-green-50 p-4 rounded-lg mt-4 space-y-2">
                {experimentData.totalTime && (
                  <p className="text-sm text-muted-foreground">
                    本次实验时长：
                    <span className="font-bold text-green-700 ml-2">{formatTime(experimentData.totalTime)}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {submitStatus && (
            <Alert variant={submitStatus.success ? "default" : "destructive"}>
              {submitStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                {submitStatus.message}
                {!submitStatus.success && submitStatus.message.includes("未配置") && (
                  <div className="mt-2 text-xs">
                    <p>请按以下步骤配置：</p>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                      <li>在 Vercel 项目设置中找到 Environment Variables</li>
                      <li>添加变量：NEXT_PUBLIC_GOOGLE_SHEETS_URL</li>
                      <li>值为您的 Google Apps Script Web App URL</li>
                      <li>保存后重新部署项目</li>
                    </ol>
                  </div>
                )}
                {!submitStatus.success && !submitStatus.message.includes("未配置") && (
                  <Button
                    onClick={handleRetrySubmit}
                    variant="outline"
                    size="sm"
                    className="ml-2 bg-transparent"
                    disabled={isSubmitting}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    重试
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button onClick={downloadData} className="w-full bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              下载实验数据
            </Button>
            <Button onClick={() => router.push("/")} className="w-full">
              返回首页
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>实验数据已保存在浏览器本地存储中</p>
            {isSubmitting && <p className="text-blue-600">正在提交数据到服务器...</p>}
            <p>研究人员可通过浏览器开发者工具的 localStorage 查看完整数据</p>
            <p className="text-orange-600 mt-2">请打开浏览器控制台（F12）查看详细的提交日志</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
