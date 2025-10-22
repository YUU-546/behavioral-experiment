"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Tag } from "lucide-react"

export default function Exp2RulesPage() {
  const router = useRouter()

  const handleConfirm = () => {
    const participantData = JSON.parse(localStorage.getItem("participantData") || "{}")
    participantData.rulesConfirmedTime = new Date().toISOString()
    localStorage.setItem("participantData", JSON.stringify(participantData))

    router.push("/exp2-writing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">实验②规则说明</CardTitle>
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
