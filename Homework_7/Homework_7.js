// Task 1: Implement promiseAll Function

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });

    if (promises.length === 0) {
      resolve([]);
    }
  });
}

// Marked data
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

promiseAll(promises)
  .then(results => {
    console.log("All promises resolved:", results);
  })
  .catch(error => {
    console.error("At least one promise rejected:", error);
  });


  // Task 2: Implement promiseAllSettled Function

  function promiseAllSettled(promises) {
  return new Promise(resolve => {
    const results = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });

    if (promises.length === 0) {
      resolve([]);
    }
  });
}

// MArked data
const mixedPromises = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3)
];

promiseAllSettled(mixedPromises)
  .then(results => {
    console.log("All promises settled:", results);
  });


  // Task 3: Implement Chaining of Promises as a Separate Function

  function chainPromises(functions) {
  return functions.reduce((prev, fn) => {
    return prev.then(fn);
  }, Promise.resolve());
}

// Marked functions with data
function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3]; // <-- tablica wejściowa

chainPromises(functionsArray)
  .then(result => {
    console.log("Chained promise result:", result);
    // "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch(error => {
    console.error("Chained promise error:", error);
  });


  // Task 4: Implement promisify Function

  function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
  .then(result => {
    console.log("Promised function result:", result);
  })
  .catch(error => {
    console.error("Promised function error:", error);
  });
