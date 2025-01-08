import { formatAsMYR, getRinggitPart, getCentPart } from "../scripts/utils/currency.js";

describe('test suite: formatAsMYR', () => {
    it('Basic Case: Convets cents into Ringgits', () => {
        expect(formatAsMYR(2095)).toEqual('20.95');
    });

    it('Edge Case: Works with 0', () => {
        expect(formatAsMYR(0)).toEqual('0.00');
    });

    it('Edge Case: Rounds Up to the Nearest Cent', () => {
        expect(formatAsMYR(2000.5)).toEqual('20.01');
    });
});

describe('test suite: getRinggitPart and getCentPart', () => {
    it('Basic Case: Display the correct Ringgit and Cent for normal input', () => {
        expect(getRinggitPart(2095)).toEqual('20');
        expect(getCentPart(2095)).toEqual('95');
    })
    it('Edge Case: Works with 0', () => {
        expect(getRinggitPart(0)).toEqual('0')
        expect(getCentPart(0)).toEqual('00')
    })
    it('Edge Case: Displays Correct Ringgit and Cent for partial floats', () => {
        expect(getRinggitPart(2000.5)).toEqual('20');
        expect(getCentPart(2000.5)).toEqual('01');
    })
})
// console.log('converts cents into Riggits')
// if (formatAsMYR(2096) === '20.96') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// console.log('works with 0')

// if (formatAsMYR(0) === '0.00') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// console.log('rounds up to the nearest cent')

// if (formatAsMYR(2000.5) === '20.01') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// console.log('Display 20 Riggits and 95 Cents')
// if (getRinggitPart(2095) === '20') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// if (getCentPart(2095) === '95') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// console.log('works with 0')
// if (getRinggitPart(0) === '0') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// if (getCentPart(0) === '00') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// console.log('2000.5 Cents, Display 20 Riggits and 01 Cents')
// if (getRinggitPart(2000.5) === '20') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }

// if (getCentPart(2000.5) === '01') {
//     console.log('passed')
// } else {
//     console.log('failed')
// }
