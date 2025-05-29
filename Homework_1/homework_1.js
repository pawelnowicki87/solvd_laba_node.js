function compare(a, b) {
    a = a.replace(/^0+/, '') || '0';
    b = b.replace(/^0+/, '') || '0';

    if (a.length !== b.length) return a.length - b.length;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return parseInt(a[i]) - parseInt(b[i]);
        }
    }

    return 0;
}

String.prototype.plus = function (other) {
    let num1 = this.toString();
    let num2 = other.toString();

    const maxLen = Math.max(num1.length, num2.length);
    num1 = num1.padStart(maxLen, '0');
    num2 = num2.padStart(maxLen, '0');

    let carry = 0;
    let result = [];

    for (let i = maxLen - 1; i >= 0; i--) {
        const sum = parseInt(num1[i]) + parseInt(num2[i]) + carry;
        carry = Math.floor(sum / 10);
        result.push(sum % 10);
    }

    if (carry) result.push(carry);

    return result.reverse().join('').replace(/^0+/, '') || '0';
};

String.prototype.minus = function (other) {
    let num1 = this.toString();
    let num2 = other.toString();

    const maxLen = Math.max(num1.length, num2.length);
    num1 = num1.padStart(maxLen, '0');
    num2 = num2.padStart(maxLen, '0');

    let borrow = 0;
    let result = [];

    for (let i = maxLen - 1; i >= 0; i--) {
        let diff = parseInt(num1[i]) - parseInt(num2[i]) - borrow;
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        result.push(diff);
    }

    return result.reverse().join('').replace(/^0+/, '') || '0';
};

String.prototype.multiply = function (other) {
    let num1 = this.toString();
    let num2 = other.toString();

    if (num1 === '0' || num2 === '0') return '0';

    const result = Array(num1.length + num2.length).fill(0);

    for (let i = num1.length - 1; i >= 0; i--) {
        for (let j = num2.length - 1; j >= 0; j--) {
            const mul = parseInt(num1[i]) * parseInt(num2[j]);
            const p1 = i + j;
            const p2 = i + j + 1;
            const sum = mul + result[p2];

            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);
        }
    }

    return result.join('').replace(/^0+/, '') || '0';
};

String.prototype.divide = function (other) {
    let num1 = this.toString();
    let num2 = other.toString();

    if (num2 === '0') throw new Error("Division by zero");

    let quotient = '';
    let current = '';

    for (let i = 0; i < num1.length; i++) {
        current += num1[i];
        current = current.replace(/^0+/, '') || '0';

        let count = 0;
        while (compare(current, num2) >= 0) {
            current = current.minus(num2);
            count++;
        }

        quotient += count;
    }

    return quotient.replace(/^0+/, '') || '0';
};


console.log("12".plus("46"));      
console.log("10".minus("1"));      
console.log("12".multiply("46"));   
console.log("954321".divide("13"));