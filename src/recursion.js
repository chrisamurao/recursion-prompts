/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  //memo to make it faster if we've used this before
  const memo = [];

  //base case:
  if (n < 0) return null;
  if (n === 0) return 1;
  if (n === 1) return n;

  //recursive case:
  memo[n] = n * factorial(n - 1);
  return memo[n];
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
var sum = function(array) {
  if (array.length === 0) {
    return 0;
  } else {
    return array[0] + sum(array.slice(1));
  }
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  if (!array.length) {
    return 0;
  } else {
    if (typeof array[0] === "number") {
      return array[0] + arraySum(array.slice(1));
    } else if (Array.isArray(array)) {
      return arraySum(array[0]) + arraySum(array.slice(1));
    }
  }
};

// 4. Check if a number is even.
//brute force strategy:
//keep chopping it until it's two or 1
var isEven = function(n) {
  //this passes the test for integers, but fractions will make a loop... for example 2.1 will hop back to 0... sanitize inputs
  if (Math.floor(n) !== n) return "That's not an integer";
  if (n === 1) return false;
  if (n === 2) return true;

  if (n > 2) return isEven(n - 2);
  if (n < 2) return isEven(n + 2);
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
var sumBelow = function(n) {
  if (n === 0) return 0;
  if (n > 0) return n - 1 + sumBelow(n - 1);
  if (n < 0) return n + 1 + sumBelow(n + 1);
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function(x, y) {
  // if (x === y) return x;
  // return y + range(x, y - 1);
  if (x === y) return [];
  if (y < x - 1) return [x - 1].concat(range(x - 1, y));
  if (x < y - 1) return [x + 1].concat(range(x + 1, y));

  return [];
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  if (exp === 0) return 1;
  if (exp >= 1) return base * exponent(base, exp - 1);
  if (exp <= -1) return (1 / base) * exponent(base, exp + 1); // floating point random errors in tests
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false

// a bitwise power of two btw O(1):
// var powerOfTwo = function(n) {
//   return (n & (n - 1) === 0);
// };
var powerOfTwo = function(n) {
  if (n === 1) return true;
  if (n < 1) return false;
  return powerOfTwo(n / 2);
};

// 9. Write a function that reverses a string.
var reverse = function(s) {
  return s.length === 0
    ? ""
    : s[s.length - 1] + reverse(s.slice(0, s.length - 1));
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  if (string.length < 2) {
    return true;
  }
  // return (
  //   string[0].toLowerCase() === string[string.length - 1].toLowerCase() &&
  //   palindrome(string.slice(1, string.length - 1))
  // ); // we can improve this by using a short circuit, as coded here we will always compute the entire string
  //    // if we used the check in an if-statement then we can exit and simply return false;

  if (string[0].toLowerCase() === string[string.length - 1].toLowerCase()) {
    return palindrome(string.slice(1, string.length - 1));
  } else {
    return false;
  }
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {
  if (y === 0) return NaN;
  if (x < 0) return -modulo(-x, y);
  if (y < 0) return modulo(x, -y);
  if (x < y) return x;

  return modulo(x - y, y);
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function(x, y) {
  if (x === 0 || y === 0) return 0;
  if (y > 0) return x + multiply(x, y - 1);
  if (x > 0) return y + multiply(x - 1, y);
  return multiply(-x, -y);
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
var divide = function(x, y) {
  if (y === 0) return NaN;
  if (y === 1) return x;

  if (x < 0 && y < 0) return divide(-x, -y);
  if ((x < 0) ^ (y < 0)) return -divide(-x, y);
  if (x > y) return 1 + divide(x - y, y);
  return 0;
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
  if (x < 0) return null;
  if (y === 0) return x;
  return gcd(y, modulo(x, y));
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
  if (str1.length === 0 && str2.length === 0) return true;
  if (str1[0] !== str2[0]) return false;
  return compareStr(str1.slice(1, str1.length), str2.slice(1, str2.length));
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
  if (str.length === 0) return [];
  return [str[0]].concat(createArray(str.slice(1, str.length)));
};

// 17. Reverse the order of an array
var reverseArr = function(A) {
  if (A.length === 0) return [];
  return [A[A.length - 1]].concat(reverseArr(A.slice(0, A.length - 1)));
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
  if (length === 0) return [];
  return [value].concat(buildList(value, length - 1));
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']

// NOTE: I've had difficulty doing this problem with only one input "n"
// With another input to match on, this problem would be trivial
// As of now, it works, but only in reverse, so it would need a helper function
// The problem lies in determining what the current number is with only the information n
// 2/21/19

// var fizzBuzz = function(n) {
//   if (n === 1) return [1];
//   if (n % 3 === 0 && n % 5 === 0) return ["FizzBuzz"].concat(fizzBuzz(n - 1));
//   if (n % 3 === 0) return ["Fizz"].concat(fizzBuzz(n - 1));
//   if (n % 5 === 0) return ["Buzz"].concat(fizzBuzz(n - 1));

//   return [n + ""].concat(fizzBuzz(n - 1));
// };

// 2/24/19... A different way to look at this is to work from the other way
// this works, no helper function
var fizzBuzz = function(n) {
  if (n === 0) return [];
  let str = "";
  if (n % 3 === 0) str += "Fizz";
  if (n % 5 === 0) str += "Buzz";
  if (n % 3 !== 0 && n % 5 !== 0) str += n;
  return fizzBuzz(n - 1).concat([str]);
};

// 20. Count the occurence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
  if (array.length === 0) return 0;
  if (array[0] === value) {
    return 1 + countOccurrence(array.slice(1, array.length), value);
  } else {
    return countOccurrence(array.slice(1, array.length), value);
  }
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
  if (array.length === 0) return [];
  return [callback(array[0])].concat(
    rMap(array.slice(1, array.length), callback)
  );
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2

// i feel like it's somehow cheating using iterators, but idk how to otherwise oh well
var countKeysInObj = function(obj, key) {
  let count = 0;
  for (let i in obj) {
    if (key === i) count++;
    if (typeof obj[i] === "object") count += countKeysInObj(obj[i], key);
  }
  return count;
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
  let count = 0;
  for (let i in obj) {
    if (value === obj[i]) count++;
    if (typeof obj[i] === "object") count += countValuesInObj(obj[i], value);
  }
  return count;
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
// obj = {'foo':'g'}
// replaceKeysInObj(obj, 'foo', 'baz') // {'baz':'g'}
var replaceKeysInObj = function(obj, oldKey, newKey) {
  for (let i in obj) {
    if (typeof obj[i] === "object") replaceKeysInObj(obj[i], oldKey, newKey);
    if (i === oldKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }
  return obj;
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.

//horribly slow btw
var fibonacci = function(n) {
  if (n <= 0) return null;
  if (n === 1) return [0, 1];
  let returnValue = fibonacci(n - 1);
  let len = returnValue.length;
  let fibNum = returnValue[len - 1] + returnValue[len - 2];
  return fibonacci(n - 1).concat([fibNum]);
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
  if (n < 0) return null;
  if (n === 0) return 0;
  if (n === 1) return 1;

  return nthFibo(n - 1) + nthFibo(n - 2);
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
  if (array.length === 0) return [];
  return [array[0].toUpperCase()].concat(
    capitalizeWords(array.slice(1, array.length))
  );
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
  const capitalizer = str =>
    str.charAt(0).toUpperCase() + str.slice(1, str.length);

  if (array.length === 0) return [];
  return [capitalizer(array[0])].concat(
    capitalizeFirst(array.slice(1, array.length))
  );
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10

// Would it possible to accomplish this without a counter variable?
var nestedEvenSum = function(obj) {
  let sum = 0;
  for (let key in obj) {
    if (typeof obj[key] === "object") sum += nestedEvenSum(obj[key]);
    if (typeof obj[key] === "number" && obj[key] % 2 === 0) sum += obj[key];
  }
  return sum;
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
  if (array.length === 0) return [];
  if (Array.isArray(array[0])) {
    return flatten(array[0]).concat(flatten(array.slice(1, array.length)));
  } else {
    return [array[0]].concat(flatten(array.slice(1, array.length)));
  }
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj = {}) {
  if (str.length === 0) return obj;

  obj[str[0]] ? obj[str[0]]++ : (obj[str[0]] = 1);

  return letterTally(str.slice(1, str.length), obj);
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
  if (list.length === 0) return [];

  // if two zeroes, skip
  if (list[0] === list[1]) return compress(list.slice(1, list.length));

  // else save
  return [list[0]].concat(compress(list.slice(1, list.length)));
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
  if (array.length === 0) return [];
  array[0].push(aug);
  // note: remember that the push function's return value is the length of the array
  // we don't want to push there because it will push the length
  //             |
  //             v
  return [array[0]].concat(augmentElements(array.slice(1, array.length), aug));
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
  if (array.length === 0) return [];

  // if two zeroes, skip
  if (array[0] === 0 && array[1] === 0)
    return minimizeZeroes(array.slice(1, array.length));

  // else save
  return [array[0]].concat(minimizeZeroes(array.slice(1, array.length)));
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
  if (array.length === 0) return [];
  if (array[0] < 0) array[0] = -array[0];
  if (array[1] > 0) array[1] = -array[1];
  return [array[0], array[1]].concat(alternateSign(array.slice(2)));
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
  if (str.length === 0) return "";

  let add = str[0];

  switch (str[0]) {
    case "1":
      add = "one";
      break;
    case "2":
      add = "two";
      break;
    case "3":
      add = "three";
      break;
    case "4":
      add = "four";
      break;
    case "5":
      add = "five";
      break;
    case "6":
      add = "six";
      break;
    case "7":
      add = "seven";
      break;
    case "8":
      add = "eight";
      break;
    case "9":
      add = "nine";
      break;
  }

  return add + numToText(str.slice(1, str.length));
};

// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function(array, target, min, max) {};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {};
