// Create a function sumAll(...args) that returns the sum of any number of arguments passed in.



function sumAll(...nums) {
    let result = nums.reduce((acc, num) => acc + num);

    return console.log(result);
}

sumAll(3, 5, 3, 4);