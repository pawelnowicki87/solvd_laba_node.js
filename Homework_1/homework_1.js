class StringOperations {
    static plus(num1, num2) {
        const maxLen = Math.max(num1.length, num2.length);
        num1 = num1.padStart(maxLen, '0');
        num2 = num2.padStart(maxLen, '0');
        
        let carry = 0;
        let result = [];
        
        for (let i = maxLen - 1; i >= 0; i--) {
            const digitSum = parseInt(num1[i]) + parseInt(num2[i]) + carry;
            carry = Math.floor(digitSum / 10);
            result.push(digitSum % 10);
        }
        
        if (carry) {
            result.push(carry);
        }
        
        result.reverse();
        return result.join('').replace(/^0+/, '') || '0';
    }

    static minus(num1, num2) {
        const maxLen = Math.max(num1.length, num2.length);
        num1 = num1.padStart(maxLen, '0');
        num2 = num2.padStart(maxLen, '0');
        
        let borrow = 0;
        let result = [];
        
        for (let i = maxLen - 1; i >= 0; i--) {
            let digitDiff = parseInt(num1[i]) - parseInt(num2[i]) - borrow;
            if (digitDiff < 0) {
                digitDiff += 10;
                borrow = 1;
            } else {
                borrow = 0;
            }
            result.push(digitDiff);
        }
        
        result.reverse();
        return result.join('').replace(/^0+/, '') || '0';
    }

    static multiply(num1, num2) {
        if (num1 === '0' || num2 === '0') {
            return '0';
        }
        
        num1 = num1.split('').reverse();
        num2 = num2.split('').reverse();
        const len1 = num1.length;
        const len2 = num2.length;
        const result = Array(len1 + len2).fill(0);
        
        for (let i = 0; i < len1; i++) {
            for (let j = 0; j < len2; j++) {
                result[i + j] += parseInt(num1[i]) * parseInt(num2[j]);
                result[i + j + 1] += Math.floor(result[i + j] / 10);
                result[i + j] %= 10;
            }
        }
        
        while (result.length > 1 && result[result.length - 1] === 0) {
            result.pop();
        }
        
        return result.reverse().join('');
    }

    static divide(num1, num2) {
        const dividend = BigInt(num1);
        const divisor = BigInt(num2);
        const quotient = dividend / divisor;
        return quotient.toString();
    }
}

console.log(StringOperations.plus('12345678901234567890', '98765432109876543210'));
console.log(StringOperations.minus('98765432109876543210', '12345678901234567890'));
console.log(StringOperations.multiply('12345678901234567890', '98765432109876543210'));
console.log(StringOperations.divide('98765432109876543210', '12345678901234567890')); 
