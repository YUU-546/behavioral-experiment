export interface ExperimentData {
  taskType: "写作" | "阅读"
  experimentType?: "实验①" | "实验②" | "实验③" | "阅读任务"
  grade?: string
  subject?: string
  scoreRange?: string
  modificationTime?: number
  totalTime?: number
  writingTime?: number
  wordCount?: number
  addCorrectionLabel?: boolean
  modifiedContent?: string
  writingContent?: string
  surveyAnswers?: Record<string, number>
  forwardedArticles?: Array<{
    id: number
    title: string
    labelType: string
  }>
  forwardedCount?: number
  labelStats?: Record<string, number>
}

export async function submitToGoogleSheets(data: ExperimentData): Promise<{
  success: boolean
  message: string
}> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

  console.log("[v0] Google Sheets URL:", url ? "已配置" : "未配置")

  if (!url) {
    const message = "Google Sheets URL 未配置。请在 Vercel 环境变量中添加 NEXT_PUBLIC_GOOGLE_SHEETS_URL"
    console.warn("[v0] Google Sheets URL not configured")
    return { success: false, message }
  }

  try {
    console.log("[v0] 正在提交数据到 Google Sheets...")
    console.log("[v0] 数据内容:", {
      taskType: data.taskType,
      experimentType: data.experimentType,
      wordCount: data.wordCount,
    })

    const payload = {
      timestamp: new Date().toISOString(),
      ...data,
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    })

    console.log("[v0] 响应状态:", response.status)
    console.log("[v0] 响应类型:", response.type)

    // Google Apps Script 会返回 302 重定向，这是正常的
    if (response.status === 200 || response.status === 302 || response.redirected) {
      console.log("[v0] 数据已成功提交到 Google Sheets")
      return { success: true, message: "数据已成功提交" }
    }

    const message = `提交失败，状态码: ${response.status}`
    console.error("[v0]", message)
    return { success: false, message }
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误"
    console.error("[v0] 提交到 Google Sheets 失败:", message)
    console.error("[v0] 错误详情:", error)
    return { success: false, message: `提交失败: ${message}` }
  }
}
