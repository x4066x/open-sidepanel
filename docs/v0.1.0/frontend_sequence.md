``` mermaid
sequenceDiagram
    participant U as ユーザー
    participant F as フロントエンド
    participant S as サービスワーカー
    participant A as AIプロバイダー
    participant C as Chromeストレージ
    
    U->>F: メッセージ入力
    F->>S: メッセージ送信（形式検証済み）
    S->>A: APIリクエスト（プロバイダー別処理）
    A-->>S: ストリームレスポンス
    S->>C: メタデータ保存（非同期）
    S-->>F: チャンクデータ転送
    F->>U: リアルタイム表示
    F->>C: 表示状態保存
```
