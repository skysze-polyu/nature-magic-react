# 🔄 升级指南 - 从旧版本到模块化架构

## 📋 需要更新的文件

### **1. App.tsx**

**旧的import：**
```typescript
import BrandStory from './components/BrandStory';
import JournalDetail from './components/JournalDetail';
```

**新的import：**
```typescript
import { BrandStory, JournalDetail } from './components/BrandStory';
```

### **2. 删除旧文件（可选）**

模块化后，以下旧文件已经不需要了：
- `components/JournalDetail.tsx`（已移到 `components/BrandStory/JournalDetail.tsx`）
- `components/BrandStory.tsx`（已移到 `components/BrandStory/BrandStory.tsx`）

**注意：** 如果你的App.tsx还在使用旧路径，请先更新import再删除！

---

## ✅ 快速迁移步骤

### **Step 1: 更新 App.tsx**

找到这行：
```typescript
import BrandStory from './components/BrandStory';
import JournalDetail from './components/JournalDetail';
```

改为：
```typescript
import { BrandStory, JournalDetail } from './components/BrandStory';
```

### **Step 2: 测试运行**

```bash
npm run dev
```

确保：
- ✅ 品牌故事列表正常显示
- ✅ 点击章节能正确加载页面
- ✅ 3个品牌故事页面都能正常工作
  - 品質與承諾
  - 紐西蘭全貌
  - 減法藝術

### **Step 3: 清理旧文件（可选）**

确认一切正常后，可以删除：
```bash
rm components/BrandStory.tsx
rm components/JournalDetail.tsx
```

---

## 🎯 验证清单

完成迁移后，请验证：

- [ ] 首页能正常加载
- [ ] 能打开品牌故事列表
- [ ] 点击"品質與承諾"能看到：
  - [ ] Hero Banner
  - [ ] 工厂故事展示
  - [ ] 14年零召回统计
  - [ ] 6个国际认证矩阵
- [ ] 点击"紐西蘭全貌"能看到：
  - [ ] 三段式背景切换
  - [ ] 4个食材展示步骤
- [ ] 点击"減法藝術"能看到：
  - [ ] 科技粒子动画
  - [ ] 6-Zero卡片
  - [ ] 2个工艺展示
  - [ ] 香气喷发效果
- [ ] 返回按钮正常工作
- [ ] 所有动画流畅运行

---

## 🐛 常见问题

### **Q: import报错找不到模块**
A: 确保路径是 `./components/BrandStory` 而不是 `./components/BrandStory/index`

### **Q: 页面显示空白**
A: 检查constants.ts中的STORY_CHAPTERS是否包含正确的slug

### **Q: 动画效果不工作**
A: 确保CSS中包含了必要的keyframes动画定义

---

## 📚 更多信息

查看完整文档：`components/BrandStory/README.md`
