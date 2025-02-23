import { StorageOperations, StorageData } from '../../types/storage';
import { ProviderKey } from '../../types/provider';

/**
 * プロバイダーAPIキーのストレージ管理クラス
 */
export class ProviderKeyStorage implements StorageOperations {
    private readonly STORAGE_KEY = 'provider_keys';

    /**
     * 現在のストレージデータを取得
     */
    private async getCurrentStorage(): Promise<StorageData> {
        const result = await chrome.storage.sync.get(this.STORAGE_KEY);
        return result[this.STORAGE_KEY] || { providerKeys: {} };
    }

    /**
     * ストレージデータを保存
     */
    private async saveStorage(data: StorageData): Promise<void> {
        await chrome.storage.sync.set({ [this.STORAGE_KEY]: data });
    }

    /**
     * プロバイダーのAPIキーを保存
     */
    async saveProviderKey(providerId: string, key: string): Promise<void> {
        const storage = await this.getCurrentStorage();
        
        storage.providerKeys[providerId] = {
            providerId,
            key,
            lastUpdated: Date.now()
        };

        await this.saveStorage(storage);
    }

    /**
     * プロバイダーのAPIキーを取得
     */
    async getProviderKey(providerId: string): Promise<string | null> {
        const storage = await this.getCurrentStorage();
        const providerKey = storage.providerKeys[providerId];
        
        return providerKey ? providerKey.key : null;
    }

    /**
     * プロバイダーのAPIキーを削除
     */
    async deleteProviderKey(providerId: string): Promise<void> {
        const storage = await this.getCurrentStorage();
        
        if (storage.providerKeys[providerId]) {
            delete storage.providerKeys[providerId];
            await this.saveStorage(storage);
        }
    }
}
