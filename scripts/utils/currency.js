export function formatCurrency(amount) {
    return (Math.round(amount) / 100).toFixed(2);
}

console.log('converts cents into dollars')

if (formatCurrency(2096) === '20.96') {
    console.log('passed')
} else {
    console.log('failed')
}

console.log('works with 0')

if (formatCurrency(0) === '0.00') {
    console.log('passed')
} else {
    console.log('failed')
}

console.log('rounds up to the nearest cent')

if (formatCurrency(2000.5) === '20.01') {
    console.log('passed')
} else {
    console.log('failed')
}
export default formatCurrency