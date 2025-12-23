# 🤖 AI 數據整理系統

使用本地 LM Studio 模型（Qwen3 32B MLX）自動整理雜亂資料的開發工具。

## 功能特點

- ✅ 自動分析和分類雜亂文本數據
- ✅ 使用本地 LM Studio 模型（完全隱私）
- ✅ 簡單的 Web UI 可視化界面
- ✅ 導出為整齊的 TypeScript/JSON 代碼
- ✅ 適合整理產品需求、代碼片段、筆記等

## 使用流程

### 1. 啟動 LM Studio
```bash
# 打開 LM Studio
# 加載模型: Qwen3 32B MLX (或任何其他模型)
# 點擊 "Local Server" → 啟動服務器 (localhost:1234)
```

### 2. 安裝依賴
```bash
cd ai-data-organizer
npm install
```

### 3. 啟動系統
```bash
npm start
```

### 4. 使用系統
1. 打開瀏覽器: http://localhost:3001
2. 粘貼雜亂資料到文本框
3. 選擇整理方式（按類別、功能、優先級等）
4. 點擊「開始 AI 整理」
5. 查看 AI 自動分類的結果
6. 導出為 TypeScript/JSON 格式

## 架構說明

```
ai-data-organizer/
├── server.js              # Node.js 後端 (Express)
├── public/
│   └── index.html         # Web UI 界面
├── exports/               # 導出的代碼文件
├── organized-data.json    # 持久化存儲結果
└── package.json
```

## API 接口

### POST /api/organize
整理資料
```json
{
  "rawData": "雜亂的文本...",
  "organizationType": "邏輯類別"
}
```

### GET /api/organized-data
獲取整理結果

### POST /api/export
導出代碼
```json
{
  "format": "typescript" | "constants" | "json"
}
```

### GET /api/test-lm-studio
測試 LM Studio 連接狀態

## 技術棧

- **後端**: Node.js + Express
- **AI 模型**: LM Studio (本地運行)
- **前端**: HTML + Tailwind CSS (最小化)
- **存儲**: JSON 文件 (輕量級)

## 常見用途

- 📝 整理產品需求文檔
- 🔧 分類代碼片段和函數
- 📋 歸納會議筆記
- 🎯 整理任務列表
- 📚 分類學習資料

## 注意事項

- 確保 LM Studio 已啟動並運行在 localhost:1234
- 使用 MLX 格式模型可獲得最佳性能（M5 芯片）
- 建議使用 Qwen3 32B MLX 進行文本整理
- 大批量數據可能需要較長處理時間

## 授權

MIT License
