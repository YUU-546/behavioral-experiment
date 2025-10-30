"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export default function ReaderInstructionsPage() {
  const router = useRouter()

  const handleStart = () => {
    const oldSubmitKeys = Object.keys(localStorage).filter((key) => key.startsWith("submitted_"))
    oldSubmitKeys.forEach((key) => localStorage.removeItem(key))

    // 清除奖励信息提交标记，确保每次新实验都显示奖励表单
    localStorage.removeItem("rewardInfoSubmitted")

    // 记录开始时间
    const startTime = new Date().toISOString()
    localStorage.setItem("readerStartTime", startTime)
    router.push("/reader-task")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">阅读任务说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">实验情景</h3>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-base leading-relaxed">
                  你现在是一个学术小组的成员，负责帮助小组查阅研究选题相关的文献。请从以下50篇文章中选择你认为
                  <span className="font-semibold text-blue-700">可信且有含金量</span>的文章，转发到你们小组的讨论群中。
                </p>
                <p className="text-base leading-relaxed mt-2 font-semibold text-blue-800">
                  你的转发关乎小组的文章质量，请认真选择。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">文献标签说明</h3>
              <p className="text-sm text-muted-foreground">所有文章均含有AI引用部分，部分文章标有以下修正标识：</p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="bg-amber-500 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                    标记A
                  </div>
                  <div className="text-sm">只标有本文章 AI 引用内容经过修正</div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                    标记B
                  </div>
                  <div className="text-sm">标有本文章 AI 引用文献及政策内容经过修正</div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                    标记C
                  </div>
                  <div className="text-sm">标有本文章 AI 引用数据及模型经过修正</div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                    标记D
                  </div>
                  <div className="text-sm">标有本文章 AI 引用内容逻辑及精简性经过修正</div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-gray-400 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                    无标记
                  </div>
                  <div className="text-sm">未标注任何修正信息</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">任务要求</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>浏览50篇学术文章</li>
                <li>
                  从中选择<span className="font-semibold text-green-700">20篇</span>你认为可信且有价值的文章进行转发
                </li>
                <li>点击文章右侧的"转发"按钮即可完成转发</li>
                <li>选择满20篇后方可提交实验结果</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg space-y-3 border-2 border-green-200">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                奖励机制
              </h3>
              <p className="text-base font-semibold text-green-800">参加阅读实验奖励：5元</p>
              <p className="text-sm text-muted-foreground">完成阅读任务并提交后即可获得奖励</p>
            </div>

            <Button onClick={handleStart} className="w-full h-12 text-lg" size="lg">
              我已明晰实验规则，开始实验
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
