# Pulse Effects Marketing Suite

营销站 + Hyperf 2.2 后端，为 AI 视频特效业务提供完整的展示、转化与配置闭环。

## Monorepo 结构

```
frontend/  # Vue 3 + Vite 营销站（home / generator / hub / creation / admin / detail）
backend/   # Hyperf 2.2 API（PHP ≥7.4，MySQL 5.7 ready）
```

## 前端（Vue 3）

```bash
cd frontend
npm install

# 如果联调本地 Hyperf，请设置 API 地址
echo "VITE_API_BASE_URL=http://127.0.0.1:9501" > .env.local

npm run dev      # 开发
npm run build    # 产出 dist，用于静态托管
```

亮点：

- 顶部导航区符合未登录 / 已登录两种态（Login、Start for Free、头像下拉）。
- 首页、生成页、聚合页、创作中心、管理后台均按照需求的四种布局（上下分层、左右分层、网格、步骤）。
- 生成页支持图片上传限制（3 张、≤5MB、JPG/PNG/WebP）、特效切换弹窗、按钮点亮规则以及案例视频占位。
- 所有按钮跳转 URL 与文案映射需求中的 `https://XXX.ai/...`。

## 后端（Hyperf 2.2 / PHP ≥7.4 / MySQL 5.7）

```bash
cd backend
cp .env.example .env   # 根据需要填写 MySQL 5.7、Redis

# 数据库准备（MySQL 5.7）
php bin/hyperf.php migrate

# 如需写入示例数据，可后续自行扩展 seeder；服务端已含营销内容的 Config fallback

# 启动 API（默认 0.0.0.0:9501）
php bin/hyperf.php start
```

### 主要 API

| Method | Endpoint            | 说明                                   |
|--------|--------------------|----------------------------------------|
| GET    | `/api/effects`     | 特效聚合数据，含 slug、stats、steps…    |
| GET    | `/api/effects/{slug}` | 单个特效详情                      |
| GET    | `/api/templates`   | 管理后台模板（模型、案例、prompt、积分）|
| GET    | `/api/creations`   | 创作中心案例，倒序展示                 |
| POST   | `/api/auth/login`  | 邮箱/谷歌登录（无 DB 时走内存 fallback） |
| POST   | `/api/auth/register` | 注册逻辑，与登录相同返回 token       |
| POST   | `/api/generate`    | 生成按钮校验（特效 slug + 图片限制）    |

服务端默认读取 `config/autoload/marketing_content.php` 的示例数据；一旦运行迁移并写入数据库，接口会自动回源 MySQL 结果。`composer.json` 已锁定 `php >=7.4`，确保与需求一致。

## 联调说明

1. 先启动 Hyperf：`php bin/hyperf.php start`。
2. 在 `frontend/.env.local` 写入 `VITE_API_BASE_URL=http://localhost:9501`。
3. 执行 `npm run dev`，前端所有 API 请求会自动命中本地服务。

## 测试状态

- `npm run build` ✅
- `composer update hyperf/validation` ✅（安装验证依赖）

> 目前后端示例数据通过配置文件提供，便于立即预览；等接入真实 MySQL 5.7 后，只需运行迁移、插入数据即可。 README 中附带了全部操作步骤。***