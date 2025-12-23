// AI 數據整理系統 - 後端服務器
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// LM Studio API 配置（OpenAI 兼容格式）
const LM_STUDIO_API = 'http://localhost:1234/v1/chat/completions';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// 存儲整理後的數據
let organizedData = {
  categories: [],
  items: [],
  lastUpdated: null
};

// 調用 LM Studio 本地模型
async function callLMStudio(prompt, systemMessage = '你是一個專業的數據整理助手。') {
  try {
    const response = await fetch(LM_STUDIO_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model', // LM Studio 會自動使用加載的模型
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3, // 低溫度 = 更準確的分類
        max_tokens: 4000
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('LM Studio 調用失敗:', error);
    throw new Error('無法連接到 LM Studio。請確保已啟動本地服務器。');
  }
}

// API: 分析並整理資料
app.post('/api/organize', async (req, res) => {
  try {
    const { rawData, organizationType } = req.body;

    console.log('開始整理資料...', { dataLength: rawData.length, type: organizationType });

    // 構建 prompt 讓 AI 分析和分類
    const prompt = `
請分析以下雜亂的資料，並按照 ${organizationType || '邏輯類別'} 進行整理。

要求：
1. 識別資料中的關鍵信息
2. 建立合理的分類體系
3. 將每個數據項歸入正確的類別
4. 輸出結構化的 JSON 格式

原始資料：
${rawData}

請輸出 JSON 格式（只返回 JSON，不要其他文字）：
{
  "categories": [
    { "id": "cat1", "name": "類別名稱", "description": "說明" }
  ],
  "items": [
    { "id": "item1", "categoryId": "cat1", "content": "整理後的內容", "originalText": "原文" }
  ]
}
`;

    // 調用 AI 模型
    const aiResponse = await callLMStudio(prompt);
    
    // 解析 JSON（處理可能的 markdown 包裝）
    let jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/);
    let organizedResult;
    
    if (jsonMatch) {
      organizedResult = JSON.parse(jsonMatch[1]);
    } else {
      // 嘗試直接解析
      organizedResult = JSON.parse(aiResponse);
    }

    // 保存結果
    organizedData = {
      ...organizedResult,
      lastUpdated: new Date().toISOString()
    };

    // 持久化存儲
    await fs.writeFile(
      path.join(__dirname, 'organized-data.json'),
      JSON.stringify(organizedData, null, 2)
    );

    res.json({
      success: true,
      data: organizedData,
      message: `成功整理 ${organizedResult.items.length} 條資料到 ${organizedResult.categories.length} 個類別`
    });

  } catch (error) {
    console.error('整理失敗:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API: 獲取整理結果
app.get('/api/organized-data', (req, res) => {
  res.json(organizedData);
});

// API: 導出為代碼格式
app.post('/api/export', async (req, res) => {
  try {
    const { format } = req.body; // 'typescript' | 'json' | 'constants'

    let exportContent = '';

    switch (format) {
      case 'typescript':
        exportContent = `// 自動生成的類型定義和數據
export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface DataItem {
  id: string;
  categoryId: string;
  content: string;
  originalText: string;
}

export const categories: Category[] = ${JSON.stringify(organizedData.categories, null, 2)};

export const items: DataItem[] = ${JSON.stringify(organizedData.items, null, 2)};
`;
        break;

      case 'constants':
        exportContent = `// 數據常量
export const ORGANIZED_DATA = ${JSON.stringify(organizedData, null, 2)};
`;
        break;

      case 'json':
      default:
        exportContent = JSON.stringify(organizedData, null, 2);
    }

    // 保存導出文件
    const filename = `organized-${format}-${Date.now()}.${format === 'json' ? 'json' : 'ts'}`;
    await fs.writeFile(path.join(__dirname, 'exports', filename), exportContent);

    res.json({
      success: true,
      filename,
      content: exportContent
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: 測試 LM Studio 連接
app.get('/api/test-lm-studio', async (req, res) => {
  try {
    const response = await callLMStudio('你好，請回覆"連接成功"');
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 確保 exports 目錄存在
fs.mkdir(path.join(__dirname, 'exports'), { recursive: true });

app.listen(PORT, () => {
  console.log(`🚀 AI 數據整理系統運行於 http://localhost:${PORT}`);
  console.log(`📡 請確保 LM Studio 服務器已在 http://localhost:1234 運行`);
});
