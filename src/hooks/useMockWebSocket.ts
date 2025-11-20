import { useEffect, useRef } from 'react';
import { WebSocketMessage, TokenStatus } from '@/types';

export const useMockWebSocket = (
    onMessage: (message: WebSocketMessage) => void,
    isEnabled: boolean = true
) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isEnabled) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            // Simulate a random update
            const randomId = Math.floor(Math.random() * 9) + 1; // IDs 1-9
            const isPriceUpdate = Math.random() > 0.2; // 80% price updates

            const message: WebSocketMessage = {
                type: isPriceUpdate ? 'PRICE_UPDATE' : 'STATUS_UPDATE',
                data: {
                    id: randomId.toString(),
                    ...(isPriceUpdate
                        ? {
                            price: Math.random() * 0.1, // Random price
                            changes: {
                                m5: (Math.random() * 20) - 10,
                                h1: (Math.random() * 20) - 10,
                                h6: (Math.random() * 20) - 10,
                            }
                        }
                        : {
                            status: ['New Pairs', 'Final Stretch', 'Migrated'][
                                Math.floor(Math.random() * 3)
                            ] as TokenStatus,
                        }),
                },
                timestamp: Date.now(),
            };

            onMessage(message);
        }, 1000); // Update every 1 second

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isEnabled, onMessage]);
};
