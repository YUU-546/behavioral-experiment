"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BasicInfoPage() {
  const router = useRouter()
  const [grade, setGrade] = useState("")
  const [discipline, setDiscipline] = useState("")
  const [scoreRange, setScoreRange] = useState("")

  const handleSubmit = () => {
    if (!grade || !discipline || !scoreRange) {
      alert("请填写完整信息")
      return
    }

    // 保存基础信息到 localStorage
    const participantData = {
      grade,
      discipline,
      scoreRange,
      startTime: new Date().toISOString(),
    }
    localStorage.setItem("participantData", JSON.stringify(participantData))

    // 跳转到规则说明页
    router.push("/rules")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">行为经济学实验</CardTitle>
          <CardDescription className="text-center">请填写您的基础信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="grade">年级</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade">
                <SelectValue placeholder="请选择年级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="大一">大一</SelectItem>
                <SelectItem value="大二">大二</SelectItem>
                <SelectItem value="大三">大三</SelectItem>
                <SelectItem value="大四">大四</SelectItem>
                <SelectItem value="硕士">硕士</SelectItem>
                <SelectItem value="博士">博士</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discipline">学科</Label>
            <Select value={discipline} onValueChange={setDiscipline}>
              <SelectTrigger id="discipline">
                <SelectValue placeholder="请选择学科" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="理工类">理工类</SelectItem>
                <SelectItem value="经管类">经管类</SelectItem>
                <SelectItem value="人文类">人文类</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">结课论文平均分数段</Label>
            <Select value={scoreRange} onValueChange={setScoreRange}>
              <SelectTrigger id="score">
                <SelectValue placeholder="请选择分数段" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100-95">100-95</SelectItem>
                <SelectItem value="95-90">95-90</SelectItem>
                <SelectItem value="90-85">90-85</SelectItem>
                <SelectItem value="85-80">85-80</SelectItem>
                <SelectItem value="80-75">80-75</SelectItem>
                <SelectItem value="75-70">75-70</SelectItem>
                <SelectItem value="70-65">70-65</SelectItem>
                <SelectItem value="65-60">65-60</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            提交
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
