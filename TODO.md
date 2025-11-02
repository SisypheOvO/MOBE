# TODO

## Supported BBCode Tags

- [x] BBCode 支持:
  - [x] [b]文本[/b] 粗体
  - [x] [i]文本[/i] 斜体
  - [x] [u]文本[/u] 下划线
  - [x] [s]文本[/s], [strike]文本[/strike] 删除线
  - [x] [color=#HEXCODE]文本[/color]
  - [x] [size=NUMBER]文本[/size] 以及数字限制
  - [x] [spoiler]文本[/spoiler] 剧透条
  - [x] [box=NAME]内容[/box] 折叠框
  - [x] [spoilerbox]文本[/spoilerbox] 剧透框
  - [x] [quote]文本[/quote], [quote="NAME"]文本[/quote] 引用
  - [x] [c]文本[/c] 行内代码
  - [x] [code]代码块[/code] 代码块
  - [x] [centre]文本[/centre] 居中
  - [x] [url=LINK]文本[/url] URL
  - [x] [profile=userid]玩家名[/profile] 主页
  - [x] [list=TYPE] 有序无序列表
  - [x] [email=ADDRESS]文本[/email] 邮箱
  - [x] [img]图床链接[/img] 图片
  - [ ] [imagemap] 图片映射
  - [x] [youtube]视频 ID[/youtube] YouTube 视频
  - [ ] [audio]URL[/audio] 音频
  - [x] [heading]文本[/heading] 标题(v1)
  - [x] [notice]文本[/notice] 通知

## Func

- [x] 编辑器功能:
  - [x] 自动补全 BBCode 标签
  - [x] 鼠标悬停显示标签文档
  - [x] 快捷键支持 (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
  - [x] 工具栏按钮插入标签
  - [x] 实时预览渲染
  - [x] tag 自动闭合
  - [x] 不同 tag 颜色区分（Rainbow Tags）
  - [x] 支持直接在编辑器中选择颜色
  - [x] 修改上括号内容自动更新闭合括号

## Future Plans

- [ ] 提供多种主题支持
- [ ] 支持导入内容
- [ ] 支持内容记忆
- [ ] 支持编辑器和预览的宽度调整
- [ ] 优化预览渲染性能（尝试局部渲染）
- [ ] 支持size的快捷选项
- [ ] 如果可能，添加左右同步滚动功能
- [ ] 支持 Oauth 认证，便于profile Card 中显示 friend / mutual / not friend 和 bell mapper or not 信息
- [ ] 重构整理BBCodePreview的代码
- [ ] icon换用更标准的icon，如fontawesome

## Bugs to Fix

- [ ] 修复预览中某些标签样式问题:
  - [x] centre 标签未正确居中
  - [x] spoilerbox, box 标签的展开图标样式问题
  - [x] 修复编辑器url到上括号的渲染问题
  - [x] 不被包含在url内的链接样式问题
  - [ ] 确定哪些标签禁止标签内换行
  - [ ] 确定哪些标签需要移除父子级间的多余回车
  - [x] code 标签内的任何内容均应按原样显示，不解析
  - [ ] 解决list嵌套解析失败的问题

- [ ] 修复编辑器功能问题:
  - [ ] 修复代码提示和自动补全
