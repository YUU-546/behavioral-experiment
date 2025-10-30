"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, DollarSign, Clock, Target } from "lucide-react"

export default function RulesPage() {
  const router = useRouter()

  useEffect(() => {
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")
    console.log("[v0] rules 页面加载时的 participantData:", participantData)
    console.log("[v0] subject 字段是否存在:", !!participantData.subject)
    console.log("[v0] subject 字段值:", participantData.subject)
  }, [])

  const handleConfirm = () => {
    // 记录规则确认时间
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")

    console.log("[v0] rules 页面确认前的 participantData:", participantData)

    participantData.rulesConfirmedTime = new Date().toISOString()
    localStorage.setItem("participantData", JSON.stringify(participantData))

    console.log("[v0] rules 页面确认后的 participantData:", participantData)
    console.log("[v0] 即将跳转到 /experiment")

    // 跳转到实验页面
    router.push("/experiment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">实验①规则说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                实验任务
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                请您撰写一篇<strong>800字左右</strong>的项目研究背景，背景需包含<strong>现实背景</strong>和
                <strong>理论背景</strong>，并需要有<strong>文献引用列表</strong>。
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
                文献修正要求
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                我们为您提供了AI生成的参考资料（标注为"AI生成"，但未声明是否经过修正）。请您：
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>根据自己的判断对已有文献进行修正</li>
                <li>
                  <strong>允许使用互联网、AI、查阅书籍等任何途径与方式</strong>进行搜索验证
                </li>
                <li>将修正后的内容填写在文本框中</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg space-y-4 border-2 border-green-200">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                奖励机制（最高40元）
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">基础奖励：15元</p>
                    <p className="text-sm text-muted-foreground">能够按照规则规范完成实验</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">修正奖励：最高15元</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>• 共10处错误，每修正正确一处错误，奖励1元</li>
                      <li>• 十个都修正正确，额外奖励5元</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">时间奖励：最高10元</p>
                    <p className="text-sm text-muted-foreground mt-1">根据全部参与者的实验时间排序（由短到长）：</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>• 排名前10%：额外奖励10元</li>
                      <li>• 排名前20%：额外奖励5元</li>
                      <li>• 排名前30%：额外奖励2元</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-3 rounded mt-4">
                <p className="text-sm font-medium text-green-800">
                  💡 提示：修正时间越短，修正的正确率越高，获得的奖励越丰厚！
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                写作要求
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                修正完成后，请使用您修正后的资料完成项目背景写作。
              </p>
            </div>
          </div>

          <Button onClick={handleConfirm} className="w-full" size="lg">
            我已明晰实验规则
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
