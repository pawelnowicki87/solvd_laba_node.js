// Task 1: Advanced Array Filtering

// Function customFilterUnique
function customFilterUnique(array, callback) {
    const uniqueSet = new Set();
    return array.filter(item => {
        const key = callback(item);
        if (uniqueSet.has(key)) {
            return false;
        } else {
            uniqueSet.add(key);
            return true;
        }
    });
}

// Example usage: Filtering array of objects based on a specific property
const objects = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'Johnny' },
    { id: 3, name: 'Alice' }
];

const uniqueById = customFilterUnique(objects, obj => obj.id);
console.log(uniqueById); // Output: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Alice' }]


// Task 2: Array Chunking

// Function chunkArray
function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
}

// Example usage
const arrayToChunk = [1, 2, 3, 4, 5, 6, 7];
const chunked = chunkArray(arrayToChunk, 3);
console.log(chunked); // Output: [[1, 2, 3], [4, 5, 6], [7]]


// Task 3: Array Shuffling

// Function customShuffle
function customShuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Example usage
const originalArray = [1, 2, 3, 4, 5];
const shuffled = customShuffle(originalArray);
console.log(shuffled); // Output: e.g., [4, 2, 1, 5, 3] (output will be random)


// Task 4: Array Intersection and Union

// Function getArrayIntersection
function getArrayIntersection(array1, array2) {
    const set1 = new Set(array1);
    const intersection = array2.filter(item => set1.has(item));
    return intersection;
}

// Function getArrayUnion
function getArrayUnion(array1, array2) {
    const set = new Set([...array1, ...array2]);
    return [...set];
}

// Example usage
const arrayA = [1, 2, 3];
const arrayB = [2, 3, 4];
const intersection = getArrayIntersection(arrayA, arrayB);
console.log(intersection); // Output: [2, 3]

const union = getArrayUnion(arrayA, arrayB);
console.log(union); // Output: [1, 2, 3, 4]


// Task 5: Array Performance Analysis 

// Function measureArrayPerformance
function measureArrayPerformance(func, array, callback) {
    const startTime = performance.now();
    func(array, callback); // Ensure callback is passed correctly
    const endTime = performance.now();
    return endTime - startTime;
}

// Example usage: Comparing performance of built-in methods vs custom functions
const testArray = Array.from({ length: 100000 }, (_, index) => index + 1);

// Example with built-in method (map)
const mapExecutionTime = measureArrayPerformance(arr => arr.map(item => item * 2), testArray, item => item);
console.log(`Execution time for map: ${mapExecutionTime} milliseconds`);

// Example with custom function (customFilterUnique from Task 1)
const customFilterUniqueExecutionTime = measureArrayPerformance(customFilterUnique, objects, obj => obj.id);
console.log(`Execution time for customFilterUnique: ${customFilterUniqueExecutionTime} milliseconds`);
