# Design: Markdown Note Template

## Template Structure

The proposed template (`note-template.md`) will use the following structure:

```markdown
# [书名]

## 基本信息
- **作者**: [作者名]
- **分类**: [分类]
- **标签**: #标签1 #标签2
- **推荐指数**: ⭐⭐⭐⭐⭐

## 一句话总结
> [核心洞察：一句话描述这本书带给你最大的价值]

## 核心要点
- **[重点1]**: [描述]
- **[重点2]**: [描述]
- **[重点3]**: [描述]

## 详细笔记
[此处存放详细的内容、摘录或思考...]
```

## Implementation Strategy
1.  **Extract Data**: For each existing file, identify the Book Title (from filename), Author (if mentioned), and key points.
2.  **Transform**: Reorganize the content into the template format.
3.  **Validate**: Ensure the Markdown is clean and headings are consistent (H1 for title, H2 for sections).
