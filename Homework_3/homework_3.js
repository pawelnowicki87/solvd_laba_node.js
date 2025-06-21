
// Task 1: Immutability and Pure Functions
// 1.
function calculateDiscountedPrice(products, discountPercentage) {
  return products.map(product => ({
    ...product,
    price: product.price - (product.price * (discountPercentage / 100))
  }));
}

// Task 2: Function Composition and Point-Free Style
// 1. getFullName
const getFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

// 2. filterUniqueWords
const filterUniqueWords = text =>
  Array.from(
    new Set(
      text
        .toLowerCase()
        .split(' ')
        .map(word => word.trim())
        .filter(word => word.length > 0)
    )
  ).sort();

// 3. getAverageGrade 
const getAverageGrade = students =>
  students
    .flatMap(student => student.grades)
    .reduce((sum, grade, _, grades) => sum + grade / grades.length, 0);


// Task 3: Closures and Higher-Order Functions

// 1. createCounter
const createCounter = () => {
  let count = 0;
  return () => ++count;
};

// 2. repeatFunction
const repeatFunction = (fn, times) => {
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
  if (n <= 1) return acc;
  return calculateFactorial(n - 1, n * acc);
};

// 2. power (recursive)
const power = (base, exponent) => {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
};


// Lazy Evaluation and Generators (do not use yield)

// 1. lazyMap
const lazyMap = (array, mapFn) => {
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
