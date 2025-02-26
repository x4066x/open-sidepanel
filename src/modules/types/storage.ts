import { ProviderKey } from './provider';

/**
 * ストレージ操作のインターフェース
 */
export interface StorageOperations {
    /**
     * プロバイダーのAPIキーを保存
     * @param providerId プロバイダーID
     * @param key APIキー
     */
    saveProviderKey(providerId: string, key: string): Promise<void>;

    /**
     * プロバイダーのAPIキーを取得
     * @param providerId プロバイダーID
     * @returns APIキー、存在しない場合はnull
     */
    getProviderKey(providerId: string): Promise<string | null>;

    /**
     * プロバイダーのAPIキーを削除
     * @param providerId プロバイダーID
     */
    deleteProviderKey(providerId: string): Promise<void>;
}

/**
 * ストレージに保存されるデータの型定義
 */
export interface StorageData {
    providerKeys: Record<string, ProviderKey>;
}
