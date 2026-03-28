/**
 * @preserve 44a105720259ae8b48420fb12aea6d2f
 *
 * 44a105720259ae8b48420fb12aea6d2f
 * webgl
 * lab2
 * v2
 * gaab23
 * 2026-01-27 13:29:35
 * v4.0.0 (2019-03-05)
 *
 * Generated 2026-01-27 14:29:36 by dbwebb lab-utility v4.0.0 (2019-03-05).
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
   * Lab 2 - statements
   *
   * Statements and expressions in JavaScript.
   *
   * Use MDN as your reference and base to solving the exercises.
   *
   */

  /** ----------------------------------------------------------------------
   * Section 1 . If, else if and else
   *
   */

  /**
   * Exercise 1.1 (1 points)
   *
   * Create five variables: `card1, card2, card3, card4, card5`.
   *
   * Assign the values `7, 8, 6, 5, 8` to the variables created above.
   *
   * Add them up and put the sum in a variable called `result`.
   *
   * Answer with the variable `result`.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  let card1 = 7;
  let card2 = 8;
  let card3 = 6;
  let card4 = 5;
  let card5 = 8;

  let result = card1 + card2 + card3 + card4 + card5;

  ANSWER = result;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("1.1", ANSWER, false);

  /**
   * Exercise 1.2 (1 points)
   *
   * Use an `if statement` to see if the five cards (card1-card5) have a
   * combined sum that is higher than 21.
   *
   * Create a variable `status` and give it a different value depending on the
   * following.
   *
   * * If the sum is higher than 21, give your variable the value `"busted"`.
   * * Else give it the value `"safe"`.
   *
   * Answer with your status-variable.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  let bool = "";
  if (result > 21) {
    bool = "busted";
  } else {
    bool = "safe";
  }

  ANSWER = bool;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("1.2", ANSWER, false);

  /**
   * Exercise 1.3 (1 points)
   *
   * Use `if else statements` to see if the combined value of the first three
   * cards (card1-card3) is lower, higher or exactly 21.
   *
   * Answer with a string corresponding to the result:
   * lower = `"safe"`
   * higher = `"busted"`
   * 21 = `"black jack"`
   *
   * Store the response in your status-variable and answer with it.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  let sum = card1 + card2 + card3;

  if (sum > 21) {
    bool = "busted";
  } else if (sum < 21) {
    bool = "safe";
  } else {
    bool = "black jack";
  }

  ANSWER = bool;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("1.3", ANSWER, false);

  /**
   * Exercise 1.4 (2 points)
   *
   * Create three variables: `dealer1, dealer2, dealer3`.
   *
   * Assign the values `2, 5, 9` to the variables.
   *
   * Combine the `if`, `else if`, `else` statements and the operator `AND (&&)`
   * to see what the dealer should do. Combine as you feel needed.
   *
   * If the sum of the dealercards is lower than 17, answer with `"pick"`, if
   * the sum is higher than or equal to 17 and lower than 21 answer with
   * `"stop"`. If the sum is 21 answer with `"black jack"`. If the sum is higher
   * than 21 answer with `"busted"`.
   *
   * Store the response in a variable, and answer with it.
   *
   * PS. You can change the sum to test that your if-statement really works for
   * all values, just to try it out.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  let dealer1 = 2;
  let dealer2 = 5;
  let dealer3 = 9;

  result = dealer1 + dealer2 + dealer3;

  if (result < 17) {
    bool = "pick";
  } else if (result >= 17 && result < 21) {
    bool = "stop";
  } else if (result == 21) {
    bool = "black jack";
  } else {
    bool = "busted";
  }

  ANSWER = bool;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("1.4", ANSWER, false);

  /** ----------------------------------------------------------------------
   * Section 2 . Switch, case
   *
   */

  /**
   * Exercise 2.1 (1 points)
   *
   * Use a switch-case statement to create a message with the type of fruit and
   * its color. You have the following type of fruits with a corresponding
   * color:
   *
   * * banana: yellow
   * * apple: green
   * * kiwi: green
   * * plum: purple
   *
   * Create a variable `myFruit` which holds the current type of your fruit. If
   * 'myFruit' is banana, the result should be a variable containing the string
   * value `"The banana is yellow."`
   *
   * Ensure that your switch-case works for all values.
   *
   * Answer with the result where `myFruit = "kiwi"`.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  let myFruit = "kiwi";
  let string = "The ";

  switch (myFruit) {
    case "banana":
      string = string + myFruit + " is yellow.";
      break;
    case "apple":
      string = string + myFruit + " is green.";
      break;
    case "kiwi":
      string = string + myFruit + " is green.";
      break;
    case "plum":
      string = string + myFruit + " is purple.";
      break;
    default:
      string = string + myFruit + " is unknown.";
  }

  ANSWER = string;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("2.1", ANSWER, false);

  /**
   * Exercise 2.2 (1 points)
   *
   * Extend your switch-case statement with a `default value`. The result should
   * be:
   *
   * `"That is an unknown fruit."` when the variable 'myFruit' has an unknown
   * value.
   *
   * Answer with the result where 'myFruit = pear'.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  myFruit = "pear";

  switch (myFruit) {
    case "banana":
      string = string + myFruit + " is yellow.";
      break;
    case "apple":
      string = string + myFruit + " is green.";
      break;
    case "kiwi":
      string = string + myFruit + " is green.";
      break;
    case "plum":
      string = string + myFruit + " is purple.";
      break;
    default:
      string = "That is an unknown fruit.";
  }

  ANSWER = string;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("2.2", ANSWER, false);

  /** ----------------------------------------------------------------------
   * Section 3 . For loops
   *
   */

  /**
   * Exercise 3.1 (1 points)
   *
   * Use a `for-loop` to increment `789` with the value `9`, `16` times.
   *
   * Answer with the result.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  let value = 789;

  for (let i = 0; i < 16; i++) {
    value += 9;
  }

  ANSWER = value;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("3.1", ANSWER, false);

  /**
   * Exercise 3.2 (1 points)
   *
   * Use a for-loop to decrement `881` with the value `9`, `18` times.
   *
   * Answer with the result.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  value = 881;

  for (let i = 0; i < 18; i++) {
    value -= 9;
  }

  ANSWER = value;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("3.2", ANSWER, false);

  /**
   * Exercise 3.3 (3 points)
   *
   * Use a for-loop to add all the odd values in the range `24` to `47` to a
   * string with each number separated by a comma `,`.
   *
   * The result should not end with a comma. You should neither have a space
   * after the comma.
   *
   * Answer with the resulting string.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  sum = 0;
  let str = "";

  for (let i = 24; i < 48; i++) {
    if (i % 2 != 0) {
      sum += i;
      str = str + i;

      if (i < 47) {
        str = str + ",";
      }
    }
  }

  ANSWER = str;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("3.3", ANSWER, false);

  /** ----------------------------------------------------------------------
   * Section 4 . While loops
   *
   */

  /**
   * Exercise 4.1 (1 points)
   *
   * Use a `while-loop` to increment `16` with the value `9` until it has
   * reached or passed `789`.
   *
   * Answer with the amount of steps needed.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  value = 16;
  let counter = 0;

  while (value <= 789) {
    value += 9;
    counter++;
  }

  ANSWER = counter;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("4.1", ANSWER, false);

  /**
   * Exercise 4.2 (1 points)
   *
   * Use a while-loop to subtract `9` from `881` until the value has reached or
   * passed `0`.
   *
   * Answer with the amount of steps needed.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  counter = 0;
  value = 881;

  while (value >= 0) {
    value -= 9;
    counter++;
  }

  ANSWER = counter;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("4.2", ANSWER, false);

  /**
   * Exercise 4.3 (3 points)
   *
   * Use a while-loop to add all the values, to a comma-separated string, in the
   * range `25` to `66`, where the value is divisable by 5 or 7.
   *
   * Answer with the resulting string.
   *
   * Write your code below and put the answer into the variable ANSWER.
   */

  value = 25;
  str = "";

  while (value <= 67) {
    if (value % 5 == 0 || value % 7 == 0) {
      str += value;

      if (value < 65) {
        str += ",";
      }
    }

    value += 1;
  }

  ANSWER = str;

  // I will now test your answer - change false to true to get a hint.
  dbwebb.assert("4.3", ANSWER, false);

  console.log(dbwebb.exitWithSummary());
})(window.dbwebb);
