import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: 'USD' | 'INR') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function convertCurrency(
    amount: number,
    from: 'USD' | 'INR',
    to: 'USD' | 'INR',
    rate: number // 1 USD = rate INR
): number {
    if (from === to) return amount;
    if (from === 'USD' && to === 'INR') return amount * rate;
    if (from === 'INR' && to === 'USD') return amount / rate;
    return amount;
}
