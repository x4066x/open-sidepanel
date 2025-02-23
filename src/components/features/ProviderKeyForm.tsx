import React, { useState, useEffect } from 'react';
import { ProviderKeyStorage } from '../../core/storage/providerKeyStorage';

interface ProviderKeyFormProps {
    providerId: string;
    providerName: string;
    onSaved?: () => void;
}

export const ProviderKeyForm: React.FC<ProviderKeyFormProps> = ({
    providerId,
    providerName,
    onSaved
}) => {
    const [apiKey, setApiKey] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const storage = new ProviderKeyStorage();

    useEffect(() => {
        loadApiKey();
    }, [providerId]);

    const loadApiKey = async () => {
        try {
            const key = await storage.getProviderKey(providerId);
            setIsSaved(!!key);
            setApiKey(key ? '********' : '');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!apiKey.trim()) return;
        
        try {
            await storage.saveProviderKey(providerId, apiKey);
            setIsSaved(true);
            setApiKey('********');
            onSaved?.();
        } catch (error) {
            console.error('Failed to save API key:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await storage.deleteProviderKey(providerId);
            setIsSaved(false);
            setApiKey('');
            onSaved?.();
        } catch (error) {
            console.error('Failed to delete API key:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter ${providerName} API Key`}
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSaved}
                />
                {!isSaved ? (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!apiKey.trim()}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};
