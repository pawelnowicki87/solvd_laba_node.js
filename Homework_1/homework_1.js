class StringOperations {
    static plus(num1, num2) {
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

        if (carry) {
            result.push(carry);
        }

        return result.reverse().join('').replace(/^0+/, '') || '0';
    }

    static minus(num1, num2) {
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
    }

    static multiply(num1, num2) {
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
    }

    static divide(num1, num2) {
        if (num2 === '0') throw new Error("Division by zero");

        let quotient = '';
        let current = '';

        for (let i = 0; i < num1.length; i++) {
            current += num1[i];
            current = current.replace(/^0+/, '') || '0';

            let count = 0;
            while (StringOperations.compare(current, num2) >= 0) {
                current = StringOperations.minus(current, num2);
                count++;
            }

            quotient += count;
        }

        return quotient.replace(/^0+/, '') || '0';
    }

    static compare(a, b) {
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
}

console.log("PLUS: ", StringOperations.plus("12345678901234567890", "98765432109876543210"));   
console.log("MINUS:", StringOperations.minus("98765432109876543210", "12345678901234567890")); 
console.log("MULTI:", StringOperations.multiply("12345678901234567890", "2"));                
console.log("DIV:  ", StringOperations.divide("98765432109876543210", "12345678901234567890")); 
