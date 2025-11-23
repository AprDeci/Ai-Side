/// <reference types="types" />

declare namespace ConfigTypes {
    type ProviderType = 'OPENAI' | 'CLAUDE' | 'GEMINI';

    interface AiConfig {
        id: string;
        name: string;
        provider: ProviderType;
        endpoint: string;
        token: string;
        isActive: boolean;
        testResult?: 'success' | 'failed' | 'pending';
    }
}
