import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    console.log("[API] 收到奖励信息提交请求")
    console.log("[API] 奖励信息:", JSON.stringify(data, null, 2))

    const googleSheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

    if (!googleSheetsUrl) {
      console.error("[API] Google Sheets URL 未配置")
      return NextResponse.json({ success: false, message: "Google Sheets URL 未配置" }, { status: 500 })
    }

    // 构造奖励信息数据，使用特殊标记以便在 Google Sheets 中识别
    const rewardData = {
      type: "REWARD_INFO",
      timestamp: data.timestamp,
      experimentTimestamp: data.experimentTimestamp,
      taskType: data.taskType,
      experimentType: data.experimentType,
      name: data.name,
      idCard: data.idCard,
      bank: data.bank,
      bankAccount: data.bankAccount,
      phone: data.phone,
    }

    console.log("[API] 正在转发奖励信息到 Google Sheets...")

    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rewardData),
    })

    const responseText = await response.text()

    if (!response.ok) {
      console.error("[API] Google Sheets 返回错误:", response.status, responseText.substring(0, 200))

      // 返回 JSON 格式的错误，但使用 200 状态码，让前端能正确解析
      return NextResponse.json(
        {
          success: false,
          message: `Google Sheets 返回错误: ${response.status}${response.status === 404 ? " (URL 不存在或已失效)" : ""}`,
        },
        { status: 200 }, // 使用 200 状态码，确保前端能解析 JSON
      )
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      console.error("[API] 解析响应失败:", e)
      return NextResponse.json({ success: false, message: "解析 Google Sheets 响应失败" }, { status: 200 })
    }

    console.log("[API] 奖励信息提交成功")
    return NextResponse.json(result)
  } catch (error) {
    console.error("[API] 提交奖励信息时出错:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "未知错误",
      },
      { status: 200 }, // 使用 200 状态码，确保前端能解析 JSON
    )
  }
}
