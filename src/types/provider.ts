/**
 * AIプロバイダーの基本情報を定義
 */
export interface Provider {
    /** プロバイダーの一意識別子 */
    id: string;
    /** プロバイダーの表示名 */
    name: string;
    /** APIキーが必要かどうか */
    requiresKey: boolean;
}

/**
 * プロバイダーのAPIキー情報
 */
export interface ProviderKey {
    /** プロバイダーID */
    providerId: string;
    /** APIキー */
    key: string;
    /** 最終更新日時（タイムスタンプ） */
    lastUpdated: number;
}

/**
 * 利用可能なプロバイダーの一覧
 */
export const AVAILABLE_PROVIDERS: Provider[] = [
    {
        id: 'openai',
        name: 'OpenAI',
        requiresKey: true,
    },
    // 他のプロバイダーを追加する場合はここに追加
];
