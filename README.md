# XXX.ai Video Effects Suite

Marketing + 生成体验站点，前端使用 Vue 3 + Vite，后端提供 Hyperf 2.2（PHP 7.4 / MySQL 5.7 兼容）API。功能覆盖：首页、特效聚合页、特效详情、功能生成页、创作中心、管理后台及定价/账单流程。

## 目录结构

```
frontend/  # Vue 3 + TypeScript 单页应用
backend/   # Hyperf 2.2（克隆自 skeleton，API 返回静态/可迁移数据）
```

## 前端开发

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # 产出 dist/
```

自定义内容：
- 组件化导航（登录 / 注册弹窗、Effects 下拉、头像菜单）
- 4 种营销布局（上下分层、左右分层、卡片网格、步骤）
- 功能生成页包含图片上传（3 张 / 5MB 内）+ 特效切换弹窗
- 聚合页、创作中心、管理后台、定价、账单等页面与按钮跳转逻辑已按需求实现
- 所有按钮跳转遵循 `https://XXX.ai/...` 规范

### 环境变量

`src/services/api.ts` 默认访问 `http://localhost:9501`，如需自定义后端地址：

```
VITE_API_BASE_URL=http://your-domain:9501
```

## 后端开发

```bash
cd backend
composer install
cp .env.example .env   # 根据实际 MySQL 5.7 / Redis 配置修改
php bin/hyperf.php start
```

主要接口：

| Method | Path | 描述 |
| ------ | ---- | ---- |
| GET | `/api/effects` | 全部特效 |
| GET | `/api/effects/{slug}` | 单个特效详情 |
| GET | `/api/marketing-sections` | 首页营销布局数据 |
| GET | `/api/generations` | 创作中心示例 |
| GET | `/api/templates` | 管理后台模版（含 effect 关联） |
| POST | `/api/auth/login` | 邮箱 / 谷歌登录（返回 token + user） |
| POST | `/api/auth/register` | 注册占位接口 |

> `config/autoload/effects.php` 中保留了所有示例数据，后续可替换为 MySQL Model 查询；服务类 `App\Service\EffectService` 已预留统一入口。

## 下一步

1. 将 Hyperf 连接到真实 MySQL 5.7，执行迁移 / 填充即可替换静态数据。
2. 接入实际的邮箱、谷歌 OAuth，替换目前的占位返回。
3. 对接对象存储 / 任务队列，实现真正的特效生成。

欢迎根据业务需要扩展更多页面或 API。*** End Patch