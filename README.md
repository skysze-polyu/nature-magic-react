# Nature Magic 項目

這個項目包含兩個獨立的系統：

## 📁 項目結構

```
NATURE MAG IC REACT/
├── nature-magic-website/    # 寵物保健品電商網站
│   ├── components/          # React 組件
│   ├── services/            # API 服務
│   └── ...                  # 網站相關文件
│
└── ai-data-organizer/       # AI 數據整理系統
    ├── server.js            # Node.js 後端
    ├── public/              # Web UI
    └── ...                  # CMS 工具文件
```

## 🌐 Nature Magic 網站

完整的寵物保健品電商網站，使用 React 19 + TypeScript + Vite 構建。

**啟動方式：**
```bash
cd nature-magic-website
npm install
npm run dev
```

訪問：http://localhost:5173

## 🤖 AI Data Organizer

使用本地 LM Studio 模型自動整理資料的開發工具。

**啟動方式：**
```bash
cd ai-data-organizer
npm install
npm start
```

訪問：http://localhost:3001

**使用前提：**
1. 啟動 LM Studio 並加載模型（推薦 Qwen3 32B MLX）
2. 啟動 LM Studio Local Server (localhost:1234)

## 📦 GitHub

https://github.com/skysze-polyu/nature-magic-react
