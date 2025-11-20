export type TokenStatus = 'New Pairs' | 'Final Stretch' | 'Migrated';

export interface TokenData {
    id: string;
    name: string;
    symbol: string;
    image: string; // URL to token image
    price: number;
    marketCap: number;
    volume: number;
    status: TokenStatus;
    createdAt: number; // Timestamp

    // Socials & Info
    socials: {
        twitter?: string;
        telegram?: string;
        website?: string;
    };

    // Metrics
    holders: number;
    transactions: number;

    // Price Changes
    changes: {
        m5: number;
        h1: number;
        h6: number;
    };

    // Trading
    liquidity: number;
    buyTax: number;
    sellTax: number;
}

export interface WebSocketMessage {
    type: 'PRICE_UPDATE' | 'STATUS_UPDATE';
    data: {
        id: string;
        price?: number;
        marketCap?: number;
        changes?: {
            m5: number;
            h1: number;
            h6: number;
        };
        status?: TokenStatus;
    };
    timestamp: number;
}

export interface TableState {
    activeColumn: keyof TokenData | null;
    sortDirection: 'asc' | 'desc';
    filterStatus: TokenStatus | 'All';
    searchQuery: string;
}
