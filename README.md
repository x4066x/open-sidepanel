# Open Side Panel Browser Extension

## 概要 / Overview

ブラウザの拡張機能として動作するサイドパネルアプリケーションです。React と TypeScript を使用して構築されています。

A browser extension that operates as a side panel application. Built with React and TypeScript.

## 技術スタック / Tech Stack

- TypeScript ^5.6.3
- React ^18.2.0
- WXT (Web Extension Tools) ^0.19.13
- Chrome Extension Types ^0.0.280

## 開発環境のセットアップ / Development Setup

```bash
# 依存関係のインストール / Install dependencies
npm install

# 開発サーバーの起動 / Start development server
# Chrome用 / For Chrome
npm run dev

# Firefox用 / For Firefox
npm run dev:firefox
```

## ビルドとパッケージング / Build and Package

```bash
# ビルド / Build
npm run build        # Chrome用 / For Chrome
npm run build:firefox # Firefox用 / For Firefox

# ZIPパッケージの作成 / Create ZIP package
npm run zip          # Chrome用 / For Chrome
npm run zip:firefox  # Firefox用 / For Firefox
```

## 品質管理 / Quality Assurance

### 静的解析 / Static Analysis

```bash
# Reactコンポーネントやフックの解析 / Analyze React components and hooks
npm run ai-code-check analyze-symbol <symbol>

# 拡張機能ファイルのチェック / Check extension files
npm run ai-code-check check-file <file>

# TypeScriptのコンパイルチェック / TypeScript compilation check
npm run compile
```

### コード修正時の確認事項 / Code Modification Checklist

以下の変更を行う前に静的解析を実行してください：
Run static analysis before making the following changes:

- Reactコンポーネントの修正 / Modifying React components
- 新機能の追加 / Creating new features
- コンテンツスクリプトの更新 / Updating content scripts
- バックグラウンドワーカーの変更 / Modifying background workers
- マニフェストの設定変更 / Changing manifest settings

## プロジェクト構造 / Project Structure

```
├── src/            # ソースコード / Source code
├── entrypoints/    # エントリーポイント / Entry points
├── assets/         # アセット / Assets
├── public/         # 静的ファイル / Static files
└── docs/           # ドキュメント / Documentation
```
