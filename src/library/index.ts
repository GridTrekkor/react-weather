export function fTemp (cTemp: number): number {
    return Math.round((cTemp * 1.8) + 32);
}

export function pressure (pressure: number): string {
    return (pressure / 3386.389).toFixed(2);
}
