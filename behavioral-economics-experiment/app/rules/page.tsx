"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function RulesPage() {
  const router = useRouter()

  const handleConfirm = () => {
    // 记录规则确认时间
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")
    participantData.rulesConfirmedTime = new Date().toISOString()
    localStorage.setItem("participantData", JSON.stringify(participantData))

    // 跳转到实验页面
    router.push("/experiment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">实验规则说明</CardTitle>
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
                <li>允许使用互联网、AI等方式进行搜索验证</li>
                <li>将修正后的内容填写在文本框中</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                奖励机制
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>修正时间越短，修正的正确率越高，获得的奖励越丰厚。</strong>
              </p>
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
