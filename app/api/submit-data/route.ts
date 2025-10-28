import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    console.log("[API] 收到数据提交请求")
    console.log("[API] 数据内容:", JSON.stringify(data, null, 2))

    const googleSheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

    if (!googleSheetsUrl) {
      console.error("[API] Google Sheets URL 未配置")
      return NextResponse.json({ success: false, message: "Google Sheets URL 未配置" }, { status: 500 })
    }

    console.log("[API] 正在转发数据到 Google Sheets...")

    // 使用服务器端发送请求，避免 CORS 问题
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseText = await response.text()
    console.log("[API] Google Sheets 响应:", responseText)

    if (!response.ok) {
      console.error("[API] Google Sheets 返回错误:", response.status, responseText)
      return NextResponse.json(
        { success: false, message: `Google Sheets 返回错误: ${response.status}` },
        { status: response.status },
      )
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      console.error("[API] 解析响应失败:", e)
      return NextResponse.json({ success: false, message: "解析 Google Sheets 响应失败" }, { status: 500 })
    }

    console.log("[API] 数据提交成功")
    return NextResponse.json(result)
  } catch (error) {
    console.error("[API] 提交数据时出错:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "未知错误",
      },
      { status: 500 },
    )
  }
}
