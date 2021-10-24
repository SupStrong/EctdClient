# cloud-web

## 这是一个多模块项目，模块可以独立打包成web或electron应用

### 安装依赖
```bash
cd CloudWeb
npm i
```
### 淘宝的npm源
```bash
npm config set registry 'https://registry.npm.taobao.org'
npm config set ELECTRON_MIRROR='https://npm.taobao.org/mirrors/electron/'
```

### 运行项目
```bash
npm run dev:web projectName #运行web版本项目
npm run dev:electron projectName #打包electron版本项目
```
### 打包项目
```bash
npm run build:web projectName #打包web版本项目
npm run build:electron projectName #打包electron版本项目
npm run build:all projectName #打包web和electron版本项目
npm run build:all #打包所有项目的web和electron版本
