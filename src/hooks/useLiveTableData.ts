import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import { TokenData, WebSocketMessage } from '@/types';
import { useMockWebSocket } from './useMockWebSocket';
import mockData from '@/services/mockData.json';
import { useAppSelector } from '@/lib/redux/hooks';

export const useLiveTableData = () => {
    const { activeColumn, sortDirection, filterStatus, searchQuery } = useAppSelector(
        (state) => state.table
    );

    // Initial data fetch (simulated)
    const { data: initialData, isLoading } = useQuery({
        queryKey: ['tokens'],
        queryFn: async () => {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return mockData as TokenData[];
        },
    });

    const [liveData, setLiveData] = useState<TokenData[]>([]);

    // Initialize liveData when initialData loads
    useEffect(() => {
        if (initialData) {
            setLiveData(initialData);
        }
    }, [initialData]);

    // WebSocket updates
    const handleWebSocketMessage = (message: WebSocketMessage) => {
        if (message.type === 'PRICE_UPDATE' || message.type === 'STATUS_UPDATE') {
            setLiveData((prev) =>
                prev.map((token) => {
                    if (token.id === message.data.id) {
                        return { ...token, ...message.data };
                    }
                    return token;
                })
            );
        }
    };

    useMockWebSocket(handleWebSocketMessage);

    // Filtering and Sorting
    const processedData = useMemo(() => {
        let filtered = [...liveData];

        // Filter by status
        if (filterStatus !== 'All') {
            filtered = filtered.filter((token) => token.status === filterStatus);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (token) =>
                    token.name.toLowerCase().includes(query) ||
                    token.symbol.toLowerCase().includes(query)
            );
        }

        // Sort
        if (activeColumn) {
            filtered.sort((a, b) => {
                const valA = a[activeColumn];
                const valB = b[activeColumn];

                if (valA === undefined || valB === undefined) return 0;

                if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [liveData, activeColumn, sortDirection, filterStatus, searchQuery]);

    return { data: processedData, isLoading };
};
