"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Tag, AlertTriangle } from "lucide-react"

export default function Exp3RulesPage() {
  const router = useRouter()

  const handleConfirm = () => {
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")
    participantData.rulesConfirmedTime = new Date().toISOString()
    localStorage.setItem("participantData", JSON.stringify(participantData))

    router.push("/exp3-writing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">实验③规则说明</CardTitle>
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
                <Tag className="h-5 w-5 text-amber-600" />
                修正标识政策
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                我们为您提供了一些<strong>AI生成的材料</strong>，但材料的<strong>真实性有待考究</strong>。
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>您可以选择对使用AI帮助写作的文章进行人为的检查修正</li>
                <li>
                  在写作完成时可以选择是否添加<strong>修正标签</strong>
                </li>
                <li>
                  添加了修正标签的文章会有<strong>更多人浏览</strong>，奖励也会<strong>更丰厚</strong>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg space-y-4 border-2 border-red-200">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                举报机制提醒
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-red-700">重要提示：</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  文章内容后续会被<strong>统一发布到平台</strong>，经由广大阅读被试者阅读
                </li>
                <li>
                  增加了修正标识的文章<strong>可以被阅读者举报</strong>
                </li>
                <li className="text-red-700 font-semibold">
                  一经举报发现有未修正的错误部分，则<strong>奖励全部取消</strong>
                </li>
              </ul>
              <p className="text-sm text-red-600 font-medium mt-2">
                请务必确保添加修正标签时，已经对AI生成内容进行了充分的检查和修正。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                奖励机制
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>越快完成文章的写作，奖励越丰厚。</strong>添加了修正标签的文章会有更多人浏览，奖励也会更丰厚。
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
