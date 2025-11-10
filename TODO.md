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
  - [x] [imagemap] 图片映射
  - [x] [youtube]视频 ID[/youtube] YouTube 视频
  - [x] [audio]URL[/audio] 音频
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

- [x] 提供多种主题支持
- [x] 支持导入内容
- [x] 支持内容记忆
- [x] 自动保存
- [x] 支持显示/不显示 Preview (动画缩放)
- [x] 支持编辑器和预览的宽度调整
  - [x] 支持宽度记忆
- [x] 优化预览渲染性能（尝试局部渲染）（我认为这会导致渲染错误，放弃）
- [ ] 支持size的快捷选项
- [ ] 如果可能，添加左右同步滚动功能
- [x] 支持 Oauth 认证
  - [x] 用环境变量引入各变量（clientId, redirectUri, proxyUri等）
  - [ ] 在profile Card 中显示与其他用户有关的信息
    - [x] friend / mutual / not friend
    - [ ] bell mapper / not (probably not possible with nowadays official api)
- [x] 添加github图标
- [x] 允许编辑多个内容
  - [x] 添加侧栏用于切换内容
    - [x] 显示上次修改距离现在的时间
    - [x] 让上次修改距今时间自动增加
    - [x] 如果在载入一个内容后的修改全部被撤销了（恢复到载入时的样子），将上次修改距今时间也改回来
    - [x] 重命名内容
    - [x] 删除内容
  - [x] 保存所有内容
  - [x] 用 pinia 管理当前所有内容
- [x] 用服务端替代 server.js
- [x] 重构整理BBCodePreview的代码
  - [x] 提取解析逻辑到 `composables/useBBCodeParser.ts`
  - [x] 创建子组件：BBCodeContent.vue, BBCodeHeader.vue
  - [x] 提取 usercard 逻辑：`composables/useUserCard.ts`
- [x] 创建服务层
  - [x] `services/userService.ts` - 用户 API 调用
  - [x] `services/bbcodeService.ts` - BBCode 解析服务
- [x] icon换用更标准的icon，如fontawesome
- [x] 简化EditorToolbar逻辑
- [ ] 优化 Drawer 底部空间的样式，汇总为 settings 浮窗
- [x] i18n 支持
  - [x] Drawer
  - [x] statusbar
  - [x] Toolbar
  - [x] OAuth Dropdown
  - [x] Preview 组件内的提示文字
  - [x] All BBCodeTags (label, placeholder, detail, documentation and hover info)
  - [x] Default contents
- [x] 获取 userdata 时头像显示 loading
- [ ] 优化 userCard 组件
  - [ ] 添加 loading 状态
  - [ ] 优化封面和头像加载逻辑，添加过渡动画
- [ ] 移动端适配
  - [x] Drawer
  - [ ] Toolbar
  - [ ] OAuth Dropdown
  - [ ] 左右视窗改为编辑与预览来回切换
  - [ ] 在Edge移动端，底部被遮挡。。。
  - [ ] 在三星默认浏览器，浏览器的底部工具栏会导致Drawer下的主内容可以在Drawer显示时滚动且Drawer不会在工具栏变化高度时重算高度导致白边。。。
- [ ] 尝试阅读osu-web源码，寻找有无更强可用性的解析bbcode、渲染方案（防止未预测的情况下渲染结果与官方不同）
- [ ] 尝试在profile的基础上兼容forum、beatmap description、team description
- [ ] 尝试添加多种模式：
  - [x] 右侧实时渲染
  - [ ] 类似md的编辑时即刻渲染出效果的模式（相当于完全重搓渲染）
- [ ] 添加用户设置内容
  - [ ] 设置保存策略：快捷键+按钮或auto save
    - [ ] 如果是非auto save，支持将内容另存为新的 content
    - [ ] 保存方式：localstorage（强调此为非安全易被清除的）、上传云（这意味着我可能要支持云？）、导出文件
    - [x] 若为localstorage，可添加侧栏用于选择要编辑的内容
  - [ ] 选择跟据不同内容（profile、forum、beatmap description、team description）切换样式
    - [x] profile
    - [ ] forum
    - [ ] beatmap description
    - [ ] team description

## Bugs to Fix

- [ ] 修复预览中某些标签样式问题:
  - [x] centre 标签未正确居中
  - [x] spoilerbox, box 标签的展开图标样式问题
  - [x] 不被包含在url内的链接样式问题
  - [ ] 确定哪些标签禁止标签内换行
  - [ ] 确定哪些标签需要移除父子级间的多余回车
  - [x] code 标签内的任何内容均应按原样显示，不解析
  - [x] 解决list嵌套解析失败的问题
  - [x] 修复 Preview 滚动条出现时占用div空间造成的页面宽度挤压（导致centre等元素的抖动）问题
  - [x] 修复 panSize 由于没有监测 localstorage (实际上也不行) 导致切换 showPreview 导致 splitpanes 重新读取 panSize 时读到的只是第一次挂载时的宽度
  - [x] 修复 reset 导致的斜体失效
  - [x] 修复切换content时保存不判断内容有无改动导致 updatedAt 错误更新为 just now
  - [x] centre标签的颜色有点太蓝了，和box之类混在一起但又不清晰
  - [x] 只有一个内容时不让编辑
  - [x] content按照事件排序
  - [x] i18n zh-TW 选择后错误导向到 zh

- [ ] 修复编辑器功能问题:
  - [x] 修复编辑器url到上括号的渲染问题
  - [ ] 修复代码提示和自动补全
