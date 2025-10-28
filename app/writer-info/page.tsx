"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WriterInfoPage() {
  const router = useRouter()
  const [grade, setGrade] = useState("")
  const [discipline, setDiscipline] = useState("")
  const [scoreRange, setScoreRange] = useState("")
  const [experimentType, setExperimentType] = useState("")

  const handleSubmit = () => {
    if (!grade || !discipline || !scoreRange || !experimentType) {
      alert("请填写完整信息")
      return
    }

    const oldSubmitKeys = Object.keys(localStorage).filter((key) => key.startsWith("submitted_"))
    oldSubmitKeys.forEach((key) => localStorage.removeItem(key))

    // 清除奖励信息提交标记，确保每次新实验都显示奖励表单
    localStorage.removeItem("rewardInfoSubmitted")

    // 保存基础信息到 localStorage
    const participantData = {
      taskType: localStorage.getItem("taskType"),
      grade,
      discipline,
      scoreRange,
      experimentType,
      startTime: new Date().toISOString(),
    }
    localStorage.setItem("participantData", JSON.stringify(participantData))

    if (experimentType === "实验①") {
      router.push("/rules")
    } else if (experimentType === "实验②") {
      router.push("/exp2-rules")
    } else if (experimentType === "实验③") {
      router.push("/exp3-rules")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">写作者信息收集</CardTitle>
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

          <div className="space-y-2">
            <Label htmlFor="experiment">您参与的实验是</Label>
            <Select value={experimentType} onValueChange={setExperimentType}>
              <SelectTrigger id="experiment">
                <SelectValue placeholder="请选择实验类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="实验①">实验①</SelectItem>
                <SelectItem value="实验②">实验②</SelectItem>
                <SelectItem value="实验③">实验③</SelectItem>
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
