"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Download, AlertCircle, RefreshCw, Gift, Mail } from "lucide-react"
import { submitToGoogleSheets } from "@/lib/google-sheets"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ThankYouPage() {
  const router = useRouter()
  const [experimentData, setExperimentData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const [showRewardForm, setShowRewardForm] = useState(true)
  const [rewardInfo, setRewardInfo] = useState({
    name: "",
    idCard: "",
    bank: "",
    bankAccount: "",
    phone: "",
  })
  const [rewardFormErrors, setRewardFormErrors] = useState<Record<string, string>>({})
  const [isSubmittingReward, setIsSubmittingReward] = useState(false)
  const [rewardSubmitted, setRewardSubmitted] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("experimentData")
    if (data) {
      const parsedData = JSON.parse(data)
      setExperimentData(parsedData)

      const submitKey = `submitted_${parsedData.timestamp || Date.now()}`
      const alreadySubmitted = localStorage.getItem(submitKey)

      if (alreadySubmitted === "true") {
        console.log("[v0] 数据已经提交过，跳过重复提交")
        setSubmitStatus({
          success: true,
          message: "数据已成功提交（之前已提交）",
        })
        return
      }

      localStorage.setItem(submitKey, "true")
      submitDataToGoogleSheets(parsedData, submitKey)
    }

    const rewardSubmittedFlag = localStorage.getItem("rewardInfoSubmitted")
    if (rewardSubmittedFlag === "true") {
      setRewardSubmitted(true)
      setShowRewardForm(false)
    }
  }, [])

  const submitDataToGoogleSheets = async (data: any, submitKey: string) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitToGoogleSheets(data)
      setSubmitStatus(result)

      if (result.success) {
        console.log("[v0] 实验数据已成功提交到 Google Sheets")
      } else {
        console.error("[v0] 提交失败:", result.message)
        localStorage.removeItem(submitKey)
      }
    } catch (error) {
      console.error("[v0] 提交数据到 Google Sheets 失败:", error)
      localStorage.removeItem(submitKey)
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
      const submitKey = `submitted_${experimentData.timestamp || Date.now()}`
      localStorage.removeItem(submitKey)
      localStorage.setItem(submitKey, "true")
      submitDataToGoogleSheets(experimentData, submitKey)
    }
  }

  const validateRewardForm = () => {
    const errors: Record<string, string> = {}

    if (!rewardInfo.name.trim()) {
      errors.name = "请输入姓名"
    }

    if (!rewardInfo.idCard.trim()) {
      errors.idCard = "请输入身份证号"
    } else if (!/^\d{17}[\dXx]$/.test(rewardInfo.idCard)) {
      errors.idCard = "身份证号格式不正确（应为18位）"
    }

    if (!rewardInfo.bank.trim()) {
      errors.bank = "请输入开户行"
    }

    if (!rewardInfo.bankAccount.trim()) {
      errors.bankAccount = "请输入银行账号"
    } else if (!/^\d{10,25}$/.test(rewardInfo.bankAccount)) {
      errors.bankAccount = "银行账号格式不正确（应为10-25位数字）"
    }

    if (!rewardInfo.phone.trim()) {
      errors.phone = "请输入联系电话"
    } else if (!/^1[3-9]\d{9}$/.test(rewardInfo.phone)) {
      errors.phone = "手机号格式不正确"
    }

    setRewardFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitRewardInfo = async () => {
    if (!validateRewardForm()) {
      return
    }

    setIsSubmittingReward(true)

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        experimentTimestamp: experimentData?.timestamp,
        taskType: experimentData?.taskType,
        experimentType: experimentData?.experimentType,
        ...rewardInfo,
      }

      const response = await fetch("/api/submit-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        setRewardSubmitted(true)
        setShowRewardForm(false)
        localStorage.setItem("rewardInfoSubmitted", "true")
        alert("奖励信息提交成功！我们将尽快处理您的奖励发放。")
      } else {
        alert(`提交失败：${result.message}`)
      }
    } catch (error) {
      console.error("[v0] 提交奖励信息失败:", error)
      alert("提交失败，请稍后重试或联系研究人员")
    } finally {
      setIsSubmittingReward(false)
    }
  }

  const handleSkipReward = () => {
    if (confirm("确定放弃领取奖励吗？放弃后将无法获得实验奖励金。")) {
      setShowRewardForm(false)
      localStorage.setItem("rewardInfoSubmitted", "skipped")
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
      <div className="w-full max-w-2xl space-y-6">
        <Card>
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
                      <span className="font-bold text-blue-700 ml-2">
                        {formatTime(experimentData.modificationTime)}
                      </span>
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

        {showRewardForm && !rewardSubmitted && (
          <Card className="border-2 border-amber-200 bg-amber-50/50">
            <CardHeader>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-6 w-6 text-amber-600" />
                <CardTitle className="text-xl text-amber-900">领取实验奖励</CardTitle>
              </div>
              <CardDescription className="text-center">
                感谢您的参与！请填写以下信息以领取实验劳务费奖励
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-900">
                  <strong>重要提示：</strong>请务必准确填写以下信息，信息不正确将无法正常发放奖励金。
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 *</Label>
                  <Input
                    id="name"
                    placeholder="请输入真实姓名"
                    value={rewardInfo.name}
                    onChange={(e) => setRewardInfo({ ...rewardInfo, name: e.target.value })}
                    className={rewardFormErrors.name ? "border-red-500" : ""}
                  />
                  {rewardFormErrors.name && <p className="text-sm text-red-600">{rewardFormErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idCard">身份证号 *</Label>
                  <Input
                    id="idCard"
                    placeholder="请输入18位身份证号"
                    value={rewardInfo.idCard}
                    onChange={(e) => setRewardInfo({ ...rewardInfo, idCard: e.target.value })}
                    maxLength={18}
                    className={rewardFormErrors.idCard ? "border-red-500" : ""}
                  />
                  {rewardFormErrors.idCard && <p className="text-sm text-red-600">{rewardFormErrors.idCard}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank">开户行 *</Label>
                  <Input
                    id="bank"
                    placeholder="例如：中国工商银行北京分行"
                    value={rewardInfo.bank}
                    onChange={(e) => setRewardInfo({ ...rewardInfo, bank: e.target.value })}
                    className={rewardFormErrors.bank ? "border-red-500" : ""}
                  />
                  {rewardFormErrors.bank && <p className="text-sm text-red-600">{rewardFormErrors.bank}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount">银行账号 *</Label>
                  <Input
                    id="bankAccount"
                    placeholder="请输入银行卡号"
                    value={rewardInfo.bankAccount}
                    onChange={(e) => setRewardInfo({ ...rewardInfo, bankAccount: e.target.value })}
                    className={rewardFormErrors.bankAccount ? "border-red-500" : ""}
                  />
                  {rewardFormErrors.bankAccount && (
                    <p className="text-sm text-red-600">{rewardFormErrors.bankAccount}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">联系电话 *</Label>
                  <Input
                    id="phone"
                    placeholder="请输入11位手机号"
                    value={rewardInfo.phone}
                    onChange={(e) => setRewardInfo({ ...rewardInfo, phone: e.target.value })}
                    maxLength={11}
                    className={rewardFormErrors.phone ? "border-red-500" : ""}
                  />
                  {rewardFormErrors.phone && <p className="text-sm text-red-600">{rewardFormErrors.phone}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmitRewardInfo}
                  disabled={isSubmittingReward}
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                >
                  {isSubmittingReward ? "提交中..." : "提交信息"}
                </Button>
                <Button
                  onClick={handleSkipReward}
                  variant="outline"
                  disabled={isSubmittingReward}
                  className="flex-1 bg-transparent"
                >
                  放弃奖励
                </Button>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Mail className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900 text-sm">
                  如有任何问题，请发送邮件至{" "}
                  <a href="mailto:xieyutong546@gmail.com" className="underline font-medium">
                    xieyutong546@gmail.com
                  </a>
                  <br />
                  发送邮件时请附上本页面的截图
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {rewardSubmitted && (
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-medium">奖励信息已提交，我们将尽快处理您的奖励发放</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
