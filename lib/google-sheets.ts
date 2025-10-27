// Google Sheets 数据提交工具函数

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
  modificationContent?: string
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

export async function submitToGoogleSheets(data: ExperimentData): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

  if (!url) {
    console.warn("[v0] Google Sheets URL not configured")
    return false
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors", // 重要：Google Apps Script 需要 no-cors 模式
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    // no-cors 模式下无法读取响应，但如果没有抛出错误就认为成功
    console.log("[v0] Data submitted to Google Sheets")
    return true
  } catch (error) {
    console.error("[v0] Failed to submit to Google Sheets:", error)
    return false
  }
}
