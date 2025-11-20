'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PriceCellProps {
    value: number;
    className?: string;
    formatter?: (val: number) => string;
}

export const PriceCell = ({ value, className, formatter }: PriceCellProps) => {
    const [flash, setFlash] = useState<'up' | 'down' | null>(null);
    const prevValueRef = useRef(value);

    useEffect(() => {
        if (value > prevValueRef.current) {
            setFlash('up');
        } else if (value < prevValueRef.current) {
            setFlash('down');
        }

        prevValueRef.current = value;

        const timer = setTimeout(() => {
            setFlash(null);
        }, 1000); // Flash duration

        return () => clearTimeout(timer);
    }, [value]);

    const formattedValue = formatter ? formatter(value) : value.toFixed(6);

    return (
        <span
            className={cn(
                'transition-colors duration-300 font-mono',
                flash === 'up' && 'text-axiom-success',
                flash === 'down' && 'text-axiom-danger',
                className
            )}
        >
            ${formattedValue}
        </span>
    );
};
