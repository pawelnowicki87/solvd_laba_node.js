// Importing jsdom
const { JSDOM } = require("jsdom");

// Creating a basic DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Task 1: Quasi-Tagged Templates

function localize(strings, ...keys) {
    const translations = {
        en: {
            greet: "Hello",
            intro: "Welcome to our website"
        },
        fr: {
            greet: "Bonjour",
            intro: "Bienvenue sur notre site web"
        }
    };

    const language = "en"; // Change to "en" for English
    const translation = translations[language];

    return translation[keys[0]];
}

const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")


// Task 2: Advanced Tagged Template

function highlightKeywords(strings, ...keywords) {
    let result = strings[0];
    keywords.forEach((keyword, index) => {
        result += `<span class='highlight'>${keyword}</span>${strings[index + 1] || ""}`;
    });
    return result;
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

const highlighted = highlightKeywords(template, ...keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."


// Task 3: Multiline Tagged Template

function multiline(strings, ...values) {
    const result = strings.reduce((acc, str, index) => {
        const line = `${index + 1} ${str}${values[index] || ""}`;
        return acc + line.trim() + "\n";
    }, "");

    return result.trim();
}

const code = multiline`
    function add(a, b) {
        return a + b;
    }
`;

console.log(code);
// Expected:
// "1 function add(a, b) {
//  2 return a + b;
//  3 }"


// Task 4: Implementing Debounce Function

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function debouncedSearch(query) {
    // Perform search operation with the query
    console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

// Example usage with input event listener
const inputElement = document.createElement("input");
inputElement.id = "search-input";
document.body.appendChild(inputElement);

inputElement.addEventListener("input", event => {
    debouncedSearchHandler(event.target.value);
});


// Task 5: Implementing Throttle Function

function throttle(func, interval) {
    let lastExecTime = 0;

    return function (...args) {
        const now = Date.now();
        if (now - lastExecTime >= interval) {
            func.apply(this, args);
            lastExecTime = now;
        }
    };
}

function onScroll(event) {
    // Handle scroll event
    console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

// Example usage with scroll event listener
window.addEventListener("scroll", throttledScrollHandler);


// Task 6: Currying Function Implementation

function curry(func, arity) {
    return function curried(...args) {
        if (args.length >= arity) {
            return func.apply(this, args);
        } else {
            return function (...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            };
        }
    };
}

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24
