/**
 * @preserve 84fff054e8cf6b948126d942457fa733
 *
 * 84fff054e8cf6b948126d942457fa733
 * webgl
 * lab1
 * v2
 * gaab23
 * 2026-01-23 15:20:26
 * v4.0.0 (2019-03-05)
 *
 * Generated 2026-01-23 16:20:26 by dbwebb lab-utility v4.0.0 (2019-03-05).
 * https://github.com/dbwebb-se/lab
 */

/*jshint maxcomplexity:false */
/* eslint-disable indent */
/* jscs:disable indent */
(function (dbwebb) {
"use strict";

var ANSWER = null;

console.log("Ready to begin.");


/** ======================================================================
 * Lab 1 - variables and builtins
 *
 * The foundation of variables, numbers, strings and basic arithmetic and
 * built in functions.
 *
 * Use MDN as your reference and base to solving the exercises.
 *
 */



/** ----------------------------------------------------------------------
 * Section 1 . Variables, numbers and built-in functions
 *
 * Use variables, numbers and built-in functions.
 *
 * One way to round a float to a certain amount of decimals is:
 *
 * Math.round(val*10000)/10000
 *
 * Where `val` is your float number.
 *
 */



/**
 * Exercise 1.1 (1 points)
 *
 * Create two variables, `floatOne` and `floatTwo`.
 *
 * Give them the values `591.97` and `573.15`.
 *
 * Create a variable called `result` and assign to it the sum of the variables
 * above.
 *
 * Answer with the result, rounded to two decimals.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


let a = 591.97;
let b = 573.15;
let c = a + b;



ANSWER = c;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.1", ANSWER, false);

/**
 * Exercise 1.2 (1 points)
 *
 * Create a variable `someIntText` and give it a string value of `"495.810
 * crocodile"`.
 *
 * Use the function `parseInt()` to find out the integer representation of the
 * text.
 *
 * Assign the value to your `result`-variable.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


let someIntText = "495.810 * crocodile";
let result = parseInt(someIntText);

ANSWER = result;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.2", ANSWER, false);

/**
 * Exercise 1.3 (1 points)
 *
 * Use your variable `someIntText`.
 *
 * Use the function `parseFloat()` to find out the float representation of the
 * text.
 *
 * Assign the value to your `result`-variable.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

let number = parseFloat(someIntText);

ANSWER = number;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.3", ANSWER, false);

/**
 * Exercise 1.4 (1 points)
 *
 * Use the method `max()`, in Math, to find out the highest number in the
 * serie:
 *
 * 778,640,260,886
 *
 * Assign the number to your `result`-variable.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

  let array = [778, 640, 260, 886];
  let highestNumber = Math.max(...array);


ANSWER = highestNumber;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.4", ANSWER, false);

/**
 * Exercise 1.5 (1 points)
 *
 * Use the Math property `PI` to get the float value of 'Pi'. Round the result
 * to 4 decimals.
 *
 * Assign the number to your `result`-variable.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

  let pi = Math.PI;
  number = Math.round(pi * 10000) / 10000;

ANSWER = number;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.5", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 2 . Strings and built-in functions
 *
 * Work with strings and find out about the built-in functions.
 *
 */



/**
 * Exercise 2.1 (1 points)
 *
 * Create a variable called `wordOne` and assign the word "horse" to it.
 *
 * Add (concatenate) the number `220` to the word and answer with the
 * resulting variable.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


let wordOne = "horse" + 220;

ANSWER = wordOne;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.1", ANSWER, false);

/**
 * Exercise 2.2 (1 points)
 *
 * Use the built-in method `charAt()` on the word "mouse" to return the
 * character at a given index.
 *
 * Answer with the character at index 3.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

  let char = "mouse".charAt(3);

ANSWER = char;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.2", ANSWER, false);

/**
 * Exercise 2.3 (1 points)
 *
 * Use the built-in method `toUpperCase()` to transform the string:
 *
 * `"Thank you very little."` to uppercase.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Thank you very little.".toUpperCase();

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.3", ANSWER, false);

/**
 * Exercise 2.4 (1 points)
 *
 * Use the built-int property `length` to find out the length of the string:
 * `"mouse"`.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "mouse".length;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.4", ANSWER, false);

/**
 * Exercise 2.5 (1 points)
 *
 * Use the built-int method `substr()` to extract the last three characters of
 * the word: `"mouse"`.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "mouse".substring(2);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.5", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 3 . Extra assignments
 *
 * Solve these optional questions to earn extra points.
 *
 */



/**
 * Exercise 3.1 (3 points)
 *
 * Create a Date object called `myDate` and initiate it with: `"Aug 27,
 * 1988"`.
 *
 * Use the built-in function `Date.getFullYear()` to get the year from your
 * Date object.
 *
 * Answer with the result.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

let myDate = new Date('August 27, 1988 00:00:00');

ANSWER = myDate.getFullYear();

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.1", ANSWER, false);

/**
 * Exercise 3.2 (3 points)
 *
 * Create a new Date object that is equal to `myDate` plus `17` days.
 *
 * Use `Date.getDate()` and answer with the day of the month.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */



let newDate = myDate;
let day = parseInt(myDate.getDate()) + 17;

if (day > 31) {
    day = day - 31;
    newDate.setMonth(myDate.getMonth() + 1);
}

newDate.setDate(day);
ANSWER = newDate;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.2", ANSWER, false);


console.log(dbwebb.exitWithSummary());
}(window.dbwebb));
