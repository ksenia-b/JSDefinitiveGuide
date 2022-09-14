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