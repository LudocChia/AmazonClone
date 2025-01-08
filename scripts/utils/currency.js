export function formatCurrency(amount) {
    return (Math.round(amount) / 100).toFixed(2);
}

export function getCentOnly(amount) {
    return (Math.round(amount) % 100).toString().padStart(2, '0');
}

export function getRiggitOnly(amount) {
    return Math.floor(amount / 100).toString();
}

console.log('converts cents into Riggit')

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

console.log('Display 20 Riggits and 95 Cents')
if (getRiggitOnly(2095) === '20') {
    console.log('passed')
} else {
    console.log('failed')
}

if (getCentOnly(2095) === '95') {
    console.log('passed')
} else {
    console.log('failed')
}

console.log('works with 0')
if (getRiggitOnly(0) === '0') {
    console.log('passed')
} else {
    console.log('failed')
}

if (getCentOnly(0) === '00') {
    console.log('passed')
} else {
    console.log('failed')
}

console.log('2000.5 Cents, Display 20 Riggits and 01 Cents')
if (getRiggitOnly(2000.5) === '20') {
    console.log('passed')
} else {
    console.log('failed')
}

if (getCentOnly(2000.5) === '01') {
    console.log('passed')
} else {
    console.log('failed')
}
