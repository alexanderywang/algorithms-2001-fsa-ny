In this programming assignment you will implement one or more of the integer multiplication algorithms described in lecture.

To get the most out of this assignment, your program should restrict itself to multiplying only pairs of single-digit numbers. You can implement the grade-school algorithm if you want, but to get the most out of the assignment you'll want to implement recursive integer multiplication and/or Karatsuba's algorithm.

So: what's the product of the following two 64-digit numbers?

3141592653589793238462643383279502884197169399375105820974944592

2718281828459045235360287471352662497757247093699959574966967627

[TIP: before submitting, first test the correctness of your program on some small test cases of your own devising. Then post your best test cases to the discussion forums to help your fellow students!]

[Food for thought: the number of digits in each input number is a power of 2. Does this make your life easier? Does it depend on which algorithm you're implementing?]

The numeric answer should be typed in the space below. So if your answer is 1198233847, then just type 1198233847 in the space provided without any space / commas / any other punctuation marks.

(We do not require you to submit your code, so feel free to use any programming language you want --- just type the final numeric answer in the following space.)

Solution:
```

let b = '2718281828459045235360287471352662497757247093699959574966967627'
let a = '3141592653589793238462643383279502884197169399375105820974944592'

var bigInt = require("big-integer");

function bigKaratsuba(num1, num2) {
	if (Number(num1) < 10 || Number(num2) < 10) {
		return (Number(num1)*Number(num2)).toString();
	}
	var len1 = String(num1).length;
	var len2 = String(num2).length;
	var m = Math.max(len1, len2);
	var m2 = Math.floor(m/2);

	var high1 = bigInt(String(num1).substring(0, len1-m2));
	var low1 = bigInt(String(num1).substring(len1-m2, len1));
	var high2 = bigInt(String(num2).substring(0, len2-m2));
	var low2 = bigInt(String(num2).substring(len2-m2, len2));

	var low1AndHigh1 = low1.add(high1).toString();
	var low2AndHigh2 = low2.add(high2).toString();

	var high1 = String(high1);
	var low1 = String(low1);
	var high2 = String(high2);
	var low2 = String(low2);

	var z0 = bigKaratsuba(low1, low2);
	var z1 = bigKaratsuba(low1AndHigh1, low2AndHigh2);
	var z2 = bigKaratsuba(high1, high2);

	var z0_int = bigInt(z0);
	var z1_int = bigInt(z1);
	var z2_int = bigInt(z2);
    var z1MinusZ2MinusZ0 = z1_int.minus(z2_int).minus(z0_int).toString();

	var product = bigInt(addTrailingZero(z2, m2*2)).add(bigInt(addTrailingZero(z1MinusZ2MinusZ0, m2))).add(z0);

	return String(product);
}

function addTrailingZero (numericString, numberOfZeroAdded) {
    for (var i = 0; i < numberOfZeroAdded; i++) {
	    numericString = numericString + "0";
    }
    return numericString;
}
bigKaratsuba(a,b)
```
