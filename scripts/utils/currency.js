export function formatAsMYR(amount) {
    return (Math.round(amount) / 100).toFixed(2);
}

export function getCentPart(amount) {
    return (Math.round(amount) % 100).toString().padStart(2, '0');
}

export function getRinggitPart(amount) {
    return Math.floor(amount / 100).toString();
}