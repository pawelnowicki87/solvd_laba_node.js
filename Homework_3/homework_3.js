// Task 1: Immutability and Pure Functions
// 1.
function calculateDiscountedPrice(products, discountPercentage) {
  if (!Array.isArray(products)) {
    throw new TypeError('Expected an array of products');
  }
  if (typeof discountPercentage !== 'number') {
    throw new TypeError('Expected discountPercentage to be a number');
  }
  return products.map(product => {
    if (typeof product.price !== 'number') {
      throw new TypeError('Each product should have a numeric price');
    }
    return {
      ...product,
      price: product.price - (product.price * (discountPercentage / 100))
    };
  });
}

// Task 2: Function Composition and Point-Free Style
// 1. getFullName
const getFullName = ({ firstName, lastName }) => {
  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    throw new TypeError('Expected firstName and lastName to be strings');
  }
  return `${firstName} ${lastName}`;
};

// 2. filterUniqueWords
const filterUniqueWords = text => {
  if (typeof text !== 'string') {
    throw new TypeError('Expected a string as input');
  }
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .split(' ')
        .map(word => word.trim())
        .filter(word => word.length > 0)
    )
  ).sort();
};

// 3. getAverageGrade 
const getAverageGrade = students => {
  if (!Array.isArray(students)) {
    throw new TypeError('Expected an array of students');
  }
  return students
    .flatMap(student => {
      if (!Array.isArray(student.grades)) {
        throw new TypeError('Each student should have a grades array');
      }
      return student.grades;
    })
    .reduce((sum, grade, _, grades) => sum + grade / grades.length, 0);
};


// Task 3: Closures and Higher-Order Functions

// 1. createCounter
const createCounter = () => {
  let count = 0;
  return () => ++count;
};

// 2. repeatFunction
const repeatFunction = (fn, times) => {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the first argument');
  }
  if (typeof times !== 'number') {
    throw new TypeError('Expected a number as the second argument');
  }
  if (times < 0) {
    return () => {
      const interval = setInterval(fn, 0);
      return () => clearInterval(interval);
    };
  } else {
    return () => {
      for (let i = 0; i < times; i++) fn();
    };
  }
};


// Task 4: Recursion and Tail Call Optimization

// 1. calculateFactorial (tail call optimized style)
const calculateFactorial = (n, acc = 1) => {
  if (typeof n !== 'number' || n < 0) {
    throw new TypeError('Expected a non-negative number');
  }
  if (n <= 1) return acc;
  return calculateFactorial(n - 1, n * acc);
};

// 2. power (recursive)
const power = (base, exponent) => {
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new TypeError('Expected both arguments to be numbers');
  }
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
};


// Lazy Evaluation and Generators (do not use yield)

// 1. lazyMap
const lazyMap = (array, mapFn) => {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof mapFn !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }
  let index = 0;
  return () => {
    if (index < array.length) {
      return mapFn(array[index++]);
    } else {
      return undefined;
    }
  };
};

// 2. fibonacciGenerator
const fibonacciGenerator = () => {
  let a = 0, b = 1;
  return () => {
    const next = a;
    [a, b] = [b, a + b];
    return next;
  };
};
