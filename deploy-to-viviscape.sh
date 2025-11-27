#!/bin/bash

# ViviScape n8n Node - Deploy to viviscape/n8n-nodes-viviscape
# This script works from any directory with the source files

set -e  # Exit on error

echo "========================================================"
echo "ViviScape n8n Node - Repository Deployment"
echo "Target: github.com/viviscape/n8n-nodes-viviscape"
echo "========================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/viviscape/n8n-nodes-viviscape.git"
PROJECT_NAME="n8n-nodes-viviscape"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Script directory: $SCRIPT_DIR"
echo ""

# Check if source files exist in current directory
if [ ! -f "$SCRIPT_DIR/ViviScapeApi.credentials.ts" ]; then
    echo -e "${RED}Error: Source files not found in current directory${NC}"
    echo ""
    echo "Required files:"
    echo "  - ViviScapeApi.credentials.ts"
    echo "  - ViviScape.node.ts"
    echo "  - package.json"
    echo "  - tsconfig.json"
    echo "  - README.md"
    echo ""
    echo "Please ensure all files are in the same directory as this script"
    exit 1
fi

# Confirm before proceeding
echo -e "${YELLOW}This will:${NC}"
echo "  1. Create project structure in: $PROJECT_NAME/"
echo "  2. Copy all files from current directory"
echo "  3. Configure for ViviScape organization"
echo "  4. Initialize Git repository"
echo "  5. Push to $REPO_URL"
echo ""
echo -e "${YELLOW}Continue? (y/n):${NC}"
read -r CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo -e "${RED}Deployment cancelled${NC}"
    exit 1
fi

# Create project directory
echo ""
echo -e "${GREEN}[1/7] Creating project directory...${NC}"
rm -rf "$PROJECT_NAME"  # Remove if exists
mkdir -p "$PROJECT_NAME"

# Create directory structure
echo -e "${GREEN}[2/7] Creating directory structure...${NC}"
mkdir -p "$PROJECT_NAME/credentials"
mkdir -p "$PROJECT_NAME/nodes/ViviScape"
mkdir -p "$PROJECT_NAME/docs"

# Copy core files
echo -e "${GREEN}[3/7] Copying core files...${NC}"
cp "$SCRIPT_DIR/ViviScapeApi.credentials.ts" "$PROJECT_NAME/credentials/"
cp "$SCRIPT_DIR/ViviScape.node.ts" "$PROJECT_NAME/nodes/ViviScape/"
cp "$SCRIPT_DIR/tsconfig.json" "$PROJECT_NAME/"

# Copy documentation
echo -e "${GREEN}[4/7] Copying documentation...${NC}"
cp "$SCRIPT_DIR/README.md" "$PROJECT_NAME/"

# Copy optional documentation files if they exist
[ -f "$SCRIPT_DIR/INSTALL.md" ] && cp "$SCRIPT_DIR/INSTALL.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/IMPLEMENTATION_GUIDE.md" ] && cp "$SCRIPT_DIR/IMPLEMENTATION_GUIDE.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/GIT_DEPLOYMENT_GUIDE.md" ] && cp "$SCRIPT_DIR/GIT_DEPLOYMENT_GUIDE.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/DEPLOYMENT_QUICKSTART.md" ] && cp "$SCRIPT_DIR/DEPLOYMENT_QUICKSTART.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/DEPLOYMENT_DIAGRAMS.md" ] && cp "$SCRIPT_DIR/DEPLOYMENT_DIAGRAMS.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/PROJECT_SUMMARY.md" ] && cp "$SCRIPT_DIR/PROJECT_SUMMARY.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/QUICK_REFERENCE.md" ] && cp "$SCRIPT_DIR/QUICK_REFERENCE.md" "$PROJECT_NAME/docs/"
[ -f "$SCRIPT_DIR/example-workflow.json" ] && cp "$SCRIPT_DIR/example-workflow.json" "$PROJECT_NAME/docs/"

# Create package.json with ViviScape configuration
echo -e "${GREEN}[5/7] Creating package.json...${NC}"
cat > "$PROJECT_NAME/package.json" << 'EOF'
{
  "name": "n8n-nodes-viviscape",
  "version": "1.0.0",
  "description": "n8n community node for ViviScape API",
  "keywords": [
    "n8n-community-node-package",
    "n8n",
    "viviscape",
    "crm",
    "project-management",
    "time-tracking",
    "insights",
    "notes"
  ],
  "license": "MIT",
  "homepage": "https://github.com/viviscape/n8n-nodes-viviscape#readme",
  "author": {
    "name": "ViviScape",
    "email": "support@viviscape.io"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/viviscape/n8n-nodes-viviscape.git"
  },
  "bugs": {
    "url": "https://github.com/viviscape/n8n-nodes-viviscape/issues"
  },
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "format": "prettier nodes credentials --write",
    "lint": "eslint nodes credentials package.json",
    "lintfix": "eslint nodes credentials package.json --fix"
  },
  "files": [
    "dist"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/ViviScapeApi.credentials.js"
    ],
    "nodes": [
      "dist/nodes/ViviScape/ViviScape.node.js"
    ]
  },
  "devDependencies": {
    "@typescript-eslint/parser": "^5.45.0",
    "eslint": "^8.29.0",
    "eslint-plugin-n8n-nodes-base": "^1.11.0",
    "n8n-workflow": "*",
    "prettier": "^2.7.1",
    "typescript": "^4.9.4"
  },
  "peerDependencies": {
    "n8n-workflow": "*"
  }
}
EOF

# Create .gitignore
cat > "$PROJECT_NAME/.gitignore" << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build output
dist/
*.js
*.js.map
*.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local

# Test coverage
coverage/

# Temporary
*.tmp
.cache/
EOF

# Create .npmignore
cat > "$PROJECT_NAME/.npmignore" << 'EOF'
# Source files
*.ts
!*.d.ts
tsconfig.json

# Development
.eslintrc.js
.prettierrc

# Documentation (keep README)
docs/
*.md
!README.md

# Git
.git/
.gitignore
.github/

# IDE
.vscode/
.idea/

# Tests
test/
*.test.ts
*.spec.ts

# Misc
*.log
.DS_Store
*.sh
EOF

# Create LICENSE
cat > "$PROJECT_NAME/LICENSE" << 'EOF'
MIT License

Copyright (c) 2024 ViviScape

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# Change to project directory
cd "$PROJECT_NAME"

# Initialize Git
echo -e "${GREEN}[6/7] Initializing Git repository...${NC}"
git init
git add .
git commit -m "Initial commit: ViviScape n8n community node

Features:
- 37 operations across 6 resource types
- Account, Company, CRM, Insights, Notes, Project resources
- Bearer token authentication
- Full TypeScript implementation
- Comprehensive documentation
- Production ready

Resources:
- Account: 5 operations (account info, services, users)
- Company: 7 operations (companies, clients CRUD)
- CRM: 8 operations (prospects, notes management)
- Insights: 3 operations (time tracking, analytics)
- Notes: 6 operations (notes and notebooks)
- Project: 8 operations (projects, tasks)

Documentation:
- Complete API documentation
- Installation guides
- Deployment instructions
- Usage examples
- Quick reference"

# Add remote
echo -e "${GREEN}[7/7] Configuring remote and pushing...${NC}"
git remote add origin "$REPO_URL"
git branch -M main

# Try to push
echo ""
echo -e "${YELLOW}Pushing to GitHub...${NC}"
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✓ Deployment Successful!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Repository: https://github.com/viviscape/n8n-nodes-viviscape"
else
    echo ""
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}Push failed. This might be because:${NC}"
    echo "  1. Repository already has content"
    echo "  2. Authentication is required"
    echo ""
    echo -e "${YELLOW}To force push (if repository is empty):${NC}"
    echo "  cd $PROJECT_NAME"
    echo "  git push -u origin main --force"
    echo ""
    echo -e "${YELLOW}To authenticate:${NC}"
    echo "  - Use GitHub CLI: gh auth login"
    echo "  - Or use SSH: git remote set-url origin git@github.com:viviscape/n8n-nodes-viviscape.git"
    echo -e "${YELLOW}========================================${NC}"
    exit 0
fi

echo ""
echo "Next steps:"
echo ""
echo -e "${BLUE}1. Verify on GitHub:${NC}"
echo "   https://github.com/viviscape/n8n-nodes-viviscape"
echo ""
echo -e "${BLUE}2. Test the build:${NC}"
echo "   cd $PROJECT_NAME"
echo "   npm install"
echo "   npm run build"
echo ""
echo -e "${BLUE}3. Test locally:${NC}"
echo "   npm link"
echo "   cd ~/.n8n/custom"
echo "   npm link n8n-nodes-viviscape"
echo "   # Restart n8n"
echo ""
echo -e "${BLUE}4. Publish to npm:${NC}"
echo "   cd $PROJECT_NAME"
echo "   npm login"
echo "   npm publish"
echo ""
echo -e "${BLUE}5. Create a release:${NC}"
echo "   cd $PROJECT_NAME"
echo "   git tag -a v1.0.0 -m 'Release v1.0.0'"
echo "   git push origin v1.0.0"
echo ""