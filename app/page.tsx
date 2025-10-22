"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, PenTool } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const handleTaskSelection = (task: string) => {
    // 保存任务类型
    localStorage.setItem("taskType", task)

    if (task === "写作") {
      router.push("/writer-info")
    } else {
      // 阅读任务暂未实现
      alert("阅读任务功能即将开放")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">行为经济学实验</CardTitle>
          <CardDescription className="text-center text-lg mt-2">欢迎参与本次实验，请选择您的任务类型</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              onClick={() => handleTaskSelection("写作")}
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <PenTool className="h-12 w-12 text-blue-600" />
              <div className="text-center">
                <div className="text-xl font-semibold">写作任务</div>
                <div className="text-sm text-muted-foreground mt-1">完成项目研究背景撰写</div>
              </div>
            </Button>

            <Button
              onClick={() => handleTaskSelection("阅读")}
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <BookOpen className="h-12 w-12 text-green-600" />
              <div className="text-center">
                <div className="text-xl font-semibold">阅读任务</div>
                <div className="text-sm text-muted-foreground mt-1">阅读并评价研究背景</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
