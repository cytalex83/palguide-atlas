# PalGuide Atlas

Palworld 英文攻略站原型，围绕前面规划的关键词和页面矩阵实现。

## 本地运行

```bash
pnpm install
pnpm run dev
```

访问：`http://127.0.0.1:5173/`

## 代码入口

- `src/main.jsx`：页面结构、导航、搜索过滤、交互状态
- `src/styles.css`：响应式视觉系统和布局
- `public/assets/palguide-hero.png`：首页夜海英雄背景

## 已实现内容

- 首页 Hero、搜索框和 Breeding Calculator CTA
- Guides / Tools / Database / Updates 页面切换
- Breeding Calculator、Server Setup、Interactive Map 三个入口
- Recent guides 列表与搜索过滤
- Popular tools 侧栏
- 桌面端与移动端响应式布局

## 最大收获与难点

最大的收获是把页面矩阵真正转成了网站结构：关键词不再只是清单，而是对应导航、页面、内容入口和内链关系。

难点是保持“资料型网站”的信息密度，同时不让首页变成拥挤的后台面板。解决办法是只保留三条核心入口，把详细内容放到 Guides、Tools、Database 和 Updates 子页，并用真实的本地交互验证搜索与导航流程。
