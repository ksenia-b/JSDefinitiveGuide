// ********************************* Arrays ************************************
let empty = [];
let primes = [2, 3, 5, 7, 11];
let misc = [1.1, true, "a"];

let count = [1, , 3]; // Elements at indexes 0 and 2. count[1] => undefined, result: (3) [1, empty, 3]
let undefs = [, ,]; // An array with no elements bu a length of 2, result: (2) [empty × 2]


// ---- Sparse arrays is one in which elements do not have contiguous indexes starting at ()

a = new Array(5); // No elements, but a.length is 5.
a = []; // Create an array with no elements and length = 0;
a[1000] = 0; // Assignment adds one element but sets length to 1001.

let a1 = [,] // this array has not elements and length 1
let a2 = [undefined]; // this array has one undefined element
0 in a1; // false: a1 has no elements with index 0
0 in a2; // true: a2 has the undefined value at index 0

// ---- Array length
[].length; // result: 0: the array has no elements


// * When array is sparse the length property is greater than the number of elements
a = [1, 2, 3, 4, 5];
a.length = 3; // result: [1, 2, 3];
a.length = 0;
a.length = 5; // length = 5, but no elements like Array(5);

// But in ES5 you can make the length property of an array read-only with Object.definePropery()
a = [1, 2, 3];
Object.defineProperty(a, "length", {writable: false});
a.length;

a.length = 23; // would be no error
a.length; // result: 3, because 'writable: false'


// ---- Adding and deleting arrays elements
a = [1, 2, 3];
delete a[1];
1 in a;
a.length; // 3: because delete does NOT affect arrray length!!!


// --- Iterating Arrays
let keys = Object.keys(o);
let values = [];
for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    values[i] = o[key];
}


// Example:
for (var i = 0; i < a.length; i++){
    if(a[i] === null || a[i] === undefined) continue; // Skip undefined + nonexistent elements
    // loop body goes here
}


// Example: if only want to skip undefined and nonexistent elements
for(let i = 0; i < a.length; i++){
    if(a[i] === undefined) continue; // Skip nonexistent elements
    // loop body here
}


// Example: you can also use for/in loop with sparse arrays
for(let index in sparseArray){
    let value sparseArray[index];
    // Now do smth with index and value
}


// Example: 
for(let i in a){
    if(!a.hasOwnProperty(i)) continue; // Skip inherited properties
    // loop body here
}

for(let i in a){
    if(String(Math.floor(Math.abs(Number(i)))) !== i) continue;
}


//  Example: forEach() method is the most general of these methods:
let data = [1, 2, 3, 4, 5];
let sumOfSquared = 0;
data.forEach(function(x){
    sumOfSquared += x*x;
})
sumOfSquared; // 55


// ---------- Multidimensional Arrays
// Create multidimensional arrays
let table = new Array(10); // 10 rows of the table
for(let i = 0; i < table.length; i++)
    table[i] = new Array(10); // Each row has 10 column

    // Initialize  the array
    for(let row = 0; row < table.length; row++){
        for(col = 0; col < table[row].length; col++){
            table[row][col] = row * col;
        }
    }
// Use multidimentional array to compute 5*7
let product = table[5][7];


// --- join()
// This method converts all the elements of an array to string and concatenates them, 
// returning the resulting string.
let a = [1, 2, 3];
a.join(); // "1, 2, 3"
a.join(" "); // "1 2 3"
a.join(""); // "123"
let b = new Array(10); // An array of length 10 with no elements
b.join('-'); // => '----------' - a string with 9 hyphens


// --- sort()
// Sorts the elements of an array in place and returns the sorted array.
let a11 = new Array("banana", "chery", "apple");
a11.sort();
let s = a11.join(", "); // s == "apple, banana, cherry"

// Example: to sort an array elements into numerical rather than alphabetical order:
let a22 = [33, 4, 1111, 222];
a22.sort(); // Alphabetical order: 1111, 222, 33, 4
a22.sort(function(a, b){ // Numerical order: 4, 33, 222, 1111
    return a-b; // Returns < 0, 0, or > 0, depending on order
});
a22.sort(function(a,b){return b-a;}); // Reverse numerical order

// Example:
a = ['ant', 'Bug', 'cat', 'Dog'];
a.sort();
a.sort(function(s, t){
    let a = s.toLowerCase();
    let b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}); // => ['ant', 'Bug', 'cat', 'Dog']


// --- concat()
// Array method creates and returns a new array that contains the elements of the ordinal array on which
// concat() was invoked.
let a33 = [1,2,3];
a33.concat(4, 5);
a33.concat([4,5]);
a33.concat([4,5], [6,7]);
a33.concat(4, [5,[6,7]]);


// --- slice()
// Array method returns a slice or subarray or the specified array.
let a44 = [1,2,3,4,5];
a44.slice(0,3);
a44.slice(3);
a44.slice(1, -1); // [2, 3, 4]
a44.slice(-3, -2);


// --- splice()
// The array method is a general-purpose method for inserting or removing elements from an array.
// видаляє елементи з масиву і 
// при необхідності вставляє на їх місце нові елементи, повертаючи вилучені елементи.

// array.splice( start, deleteCount [, item1[, item2[, ...]]])
let a55 = [1,2,3,4,5,6,7,8];
a55.splice(4); //  [5, 6, 7, 8]
a55.splice(1,2); // [2, 3]
a55.splice(1,1); // [2]

// better example:
var mas=[1,2,3,4,5,6,7];
b=mas.splice(2,3,88,99,107); //b=[3,4,5]
alert(mas); // [1,2,88,99,107,6,7]


// --- push() and pop()
// Methods allow you to work with arrays as if they were stacks.
// push() - appends one or more new elements *TO THE END* of an array and returns new length of array.
// pop() - does reverse: it deletes the last element of an array, decrement the array length
let stack = [];
stack.push(1,2); // [1,2]
stack.pop(); // [1]


// --- shift() and unshift()
// Methods behave mush like push() and pop(), 
// except that they insert and remove elements from the *BEGiNING* of the array.
let a66 = [];
a66.unshift(1); // [1]
a66.unshift(22); // [22, 1]
a.shift(1); // [1]


// --- .toString() and toLocaleString()
// .toLocalesString() - is localized version of toString();


// ------------------------------------- ES5 array methods: ----------------------

// -- .forEach()
let data11 = [1,2,3,4,5];
let sum = 0;
data.forEach(function(value){ sum += value; }); // result: 15
data.forEach(function(v, i ,a){ a[i] = v + 1; }) // result:  [2, 3, 4, 5, 6]

// !!! forEach() does NOT provide a way to terminate iteration 
// before all elements have been passed to the function.
// = there is NO EQUIVALENT to breat statement. 
// ! So to throw an acception you MUST place the call to forEach() within a try{} block.

// Example:
function foreach(a, f, t){
    try{
        a.forEach(f,t);
    }
    catch(e){
        if(e === foreach.break) return;
        else throw e;
    }
}
foreach.break = new Error("StopIteration");


// --- .map()
// The method passes each elements of the array on which it is invoked to the function you specify,
// and returns an array containing the values returned by that function.
let a77 = [1,2,3];
b = a.map(function x(){ return x*x; }); // b is [1, 4, 9]

// !!! RETURNS NEW ARRAY


// --- .filter()
// The method returns an array containing a subset of the elements of the array on which it is invoked.
let a88 = [5, 4, 3, 2, 1];
smallvalues = a.filter(function x(){ return x < 3 }); // [2, 1]


// --- every() and some()
// The methods are array predicates: they apply a predicate function
// you specify to the element of the array, and then RETURN TRUE OR FALSE
let a99 = [1, 2, 3, 4, 5];
a.every(function(x){ return x < 10; }); // true: all values < 10;
a.some(function(){ return x%2; }) // true: a has some even numbers


// --- reduce() and reduceRight()
// Methods combine the elements of an array, using the function you specify, to produce the single value.
let a1010 = [1, 2, 3, 4, 5];
let sum1 = a1010.reduce(function(x, y){ return x + y }, 0); // sum of values : 15
let product1 = a1010.reduce(function(x, y){ return x * y}, 1); // product of values : 120
let max = a1010.reduce(function(x, y){ return (x>y)?x:y }); // 5


// -- reduceRight() - works like reduce(), except that it processes the array 
// from highest index to lower(right-to-left), rather than from lowest to hight.
let a1111 = [2, 3, 4];
//Compute 2^(3^4). Exponention has right-to-left precedence
let big = a1111.reduceRight(function(accumulator, value){
    return Math.pow(value, accumulator);
});

// !! some() and every() methods differ from the reduce() method, however in the they 
// terminate early when possible and do not always visit every array object.

// ! The examples showns so far have been numeric for simplicity, but reduce() and reduceRight()
// are NOT intended solely for mathematical computation. Consider the union() function:

let objects = [{x: 1, a: 1}, {y: 2}, {z: 3}];
let leftunion = objects.reduce(union);
let rightunion = objects.reduceRight(union); // ?????? Got error: "Union is not definer" ?


// --- IndexOf(), lastIndexOf()
// Methods search an array for an element with a specific value, and return 
// the index of the first such element found, or -1 if NONE was found.
let a1212 = [0, 1, 2, 1, 0];
a1212.indexOf(1);
a1212.lastIndexOf(1);
a1212.indexOf(3); // -1: which means that none was found.

// indexOf() - search from begining to end
// lastIndexOf() - from end to begining


// Example: find all occurences of valuex in an array a and return an array of matching indexes
function findall(a, x){
    let result = [],
    len = a.length,
    pos = 0;
    while(pos < len){
        pos = a.indexOf(x, pos);
        if(pos === -1) break;
        result.push(pos);
        pos = pos + 1;
    }
    return result; // return array of index


// -- Array Type
Array.isArray([]); // true
Array.isArray({}); // false


// Array-Like Objects

// Example: the folowing code takes a regular object, adds properties to make it an array-like object,
// and then iterates through the 'elements' of the resulting pseudo-array.
let a = {};

// add a properties to make it array-like:
let i = 0;
while(i < 10){
    a[i] = i * i;
    i++;
}
a.length = i;
let total = 0;
for(var j = 0; j < a.length; j++)
    total += a[j]; // 285

// !!!!! So ARRAY have some specific features that other OBJECTS DO NOT HAVE:
// - The length property is automatically updated as new elements are added to the list.
// - Setting length to a smaller value truncates the array
// - Arrays inherit useful methods from Array.prototype
// - Array have a class attribute of "Array"

// Example:
function isArrayLike(o){
    if(o && typeof o === "object" &&
     isFinite(o.length)  &&
     o.length >= 0 &&
     o.length === Math.floor(o.length) &&
     o.length < 3294967295) // < 2^32 -1
    return true;
    else 
    return false;
}}

// Example:
let a1313 = {"0": "a", "1": "b", "2": "c", length: 3}; // Array-like object
Array.prototype.join.call(a, "+"); // -> [a, b, c]
Array.prototype.slice.call(a, 0); // -> ["a", "b", "c"]: true array copy
Array.prototype.map.call(a, function(x){ // see CALL() ?
    return x.toUpperCase();
}) // -> [A, B, C]


// Example
s = "JavaScript";
Array.prototype.join.call(s, " "); // => "J a v a S c r i p t"
Array.prototype.filter.call(s, function(x){
    return x.match(/^aeiou/); // Only match nonvowels
}).join("") // => "JvScrpt"