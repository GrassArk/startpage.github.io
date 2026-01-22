#!/bin/bash

# 自动部署脚本 - 使用方法：./deploy.sh "提交信息"

# 设置颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  GitHub Pages 自动部署脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 进入项目目录
cd /root/startpage.github.io

# 检查是否有更改
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✓ 没有需要提交的更改${NC}"
    exit 0
fi

# 显示更改的文件
echo -e "${BLUE}更改的文件：${NC}"
git status --short
echo ""

# 添加所有更改
echo -e "${BLUE}正在添加更改...${NC}"
git add .

# 提交信息（如果提供了参数则使用，否则使用默认）
COMMIT_MSG="${1:-更新导航页链接}"

# 提交更改
echo -e "${BLUE}正在提交更改...${NC}"
git commit -m "$COMMIT_MSG"

# 推送到 GitHub
echo -e "${BLUE}正在推送到 GitHub...${NC}"
git push origin main

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✓ 部署成功！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}GitHub Pages 将在几秒钟内自动更新${NC}"
echo -e "${GREEN}访问地址：https://grassark.github.io/startpage.github.io/${NC}"
echo ""
