// 这个文件需要在 Google Sheets 中的 Apps Script 编辑器中创建
// 不要放在项目代码中，这只是给您参考的代码

function doPost(e) {
  try {
    // 获取当前活动的表格
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 解析接收到的数据
    const data = JSON.parse(e.postData.contents);
    
    // 准备要写入的行数据
    const row = [
      new Date(), // 提交时间
      data.taskType || '', // 任务类型（写作/阅读）
      data.experimentType || '', // 实验类型
      data.grade || '', // 年级
      data.subject || '', // 学科
      data.scoreRange || '', // 分数段
      data.modificationTime || '', // 修改时间（实验①）
      data.totalTime || '', // 实验完成总时间
      data.writingTime || '', // 写作时间（实验②③）
      data.wordCount || '', // 写作字数
      data.addCorrectionLabel || '', // 是否添加修正标签
      data.modificationContent || '', // 修改内容
      data.writingContent || '', // 写作内容
      JSON.stringify(data.surveyAnswers || {}), // 问卷答案
      JSON.stringify(data.forwardedArticles || []), // 转发文章列表
      data.forwardedCount || '', // 转发文章数量
      JSON.stringify(data.labelStats || {}), // 标签统计
    ];
    
    // 将数据追加到表格
    sheet.appendRow(row);
    
    // 返回成功响应
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '数据已成功保存'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 返回错误响应
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 测试函数
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 设置表头
  const headers = [
    '提交时间',
    '任务类型',
    '实验类型',
    '年级',
    '学科',
    '分数段',
    '修改时间(秒)',
    '实验完成总时间(秒)',
    '写作时间(秒)',
    '写作字数',
    '是否添加修正标签',
    '修改内容',
    '写作内容',
    '问卷答案(JSON)',
    '转发文章列表(JSON)',
    '转发文章数量',
    '标签统计(JSON)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}
