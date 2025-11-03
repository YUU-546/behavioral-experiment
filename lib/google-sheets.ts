export interface ExperimentData {
  taskType: "写作" | "阅读"
  experimentType?: "实验①" | "实验②" | "实验③" | "阅读任务"
  grade?: string
  subject?: string
  discipline?: string
  scoreRange?: string
  modificationTime?: number
  totalTime?: number
  writingTime?: number
  wordCount?: number
  addCorrectionLabel?: boolean
  modifiedContent?: string
  originalReference?: string
  writingContent?: string
  surveyAnswers?: Record<string, number>
  forwardedArticles?: Array<{
    id: number
    title: string
    labelType: string
  }>
  forwardedCount?: number
  labelStats?: Record<string, number>
  topic?: string
  startTime?: string
  experimentStartTime?: string
  experimentEndTime?: string
  rulesConfirmedTime?: string
  writingCompletedTime?: string
}

export interface RewardInfo {
  name: string
  wechat: string
  experimentTimestamp?: string
  experimentType?: string
  taskType?: string
}

export async function submitToGoogleSheets(data: ExperimentData): Promise<{
  success: boolean
  message: string
}> {
  const apiUrl = "/api/submit-data"

  console.log("[v0] 正在通过 API 路由提交数据...")

  try {
    console.log("[v0] 完整数据内容:", data)
    console.log("[v0] modifiedContent 存在:", !!data.modifiedContent)
    console.log("[v0] writingContent 存在:", !!data.writingContent)

    if (data.modifiedContent) {
      console.log("[v0] modifiedContent 长度:", data.modifiedContent.length)
      console.log("[v0] modifiedContent 前50字:", data.modifiedContent.substring(0, 50))
    }

    const payload = {
      timestamp: new Date().toISOString(),
      ...data,
    }

    console.log("[v0] 发送到 API 的 payload:", payload)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("[v0] API 响应状态:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API 返回错误:", response.status, errorText)

      // 尝试解析错误消息
      try {
        const errorJson = JSON.parse(errorText)
        return { success: false, message: errorJson.message || `HTTP ${response.status} 错误` }
      } catch {
        return { success: false, message: `HTTP ${response.status} 错误` }
      }
    }

    const result = await response.json()

    if (result.success) {
      console.log("[v0] 数据已成功提交到 Google Sheets")
      return { success: true, message: "数据已成功提交" }
    } else {
      console.error("[v0] 提交失败:", result.message)
      return { success: false, message: result.message }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误"
    console.error("[v0] 提交到 Google Sheets 失败:", message)
    console.error("[v0] 错误详情:", error)
    return { success: false, message: `提交失败: ${message}` }
  }
}
