// A function - is a block of JS code that is defined once but may executed or invoked an number of times.
// Functions that designed to initialized a newly created objects are called 'constructors'.

// Defining functions

// -- Methods Chaining:
let o = {
    m: function(){
        let self = this;
        f();
        
        function f(){ // A nested function f
            console.log(this == o); // false
            console.log(self === o) // true
        }
    }
}
o.m; // invoke the method m on the object o.


// -- Using Object properties as arguments
function arraycopy(from, from_start, to, to_start, length){
    // code is here
}
function easycopy(args){
    arraycopy(args.from,
        args.from_start,
        args.to,
        args.to_start,
        args.length);
}
let a = [1, 2, 3, 4], b = [];
easycopy({from: a, to: b, length: 4});


// -- Arguments types
// Note that it uses the isArrayLike() function 
function sum(a){
    if(isArrayLike(a)){
        let total = 0;
        for(let i = 0; i < a.length; i++){
            let element = a[i];
            if(element == null) continue;
            if(isFinite(element)) total += element;
            else throw new Error("sum(): element must be array-like");
        }
        return total;
    }
    else throw new Error("sum(): argument must be array-like");
}


// -- function
// flexisum() - method 
function flexisum(){
    let total = 0;
    for(let i = 0; i < arguments.length; i++){
        let element = arguments[i], n;
        if(element == null) continue;
        if(isArray(element))
            n = flexisum.apply(this, element);
        else if(typeof element === "function")
            n = Number(element());
        else n = Number(element);

        if(isNaN(n))
            throw Error("flexisum(): can't convert "+ element+ " to number");
        total += n;
    }
    return total;
}


// -- Define your own function properties
uniqueInteger.counter = 0;
function uniqueInteger(){
    return uniqueInteger.counter++;
}

function factorial(n){
    if(isFinite(n) && n > 0 && n == n.Math.round(n)){
        if(!(n in factorial))
            factorial[n] = n * factorial(n - 1);
        return factorial[n];
    }
    else return NaN;
}
factorial[1] = 1; // Initialize the cache to hold this base case.
// result: 1


// function a Namespaces
// the extend() function, patched if necessary
let extend = (function(){
    for(let p in {toString: null}){
        return function extend(o){
            for(let i = 1; i < arguments.length; i++){
                let source = arguments[i];
                for(let prop in source) o[prop] = source[prop];
            }
            return o;
        }
    }
});

    let protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
"isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
return function patched_extend(o){
    for(let i = 1; i < arguments.length; i++){
        let source = arguments[i];
        for(let prop in source) o[prop] = source[prop];
        for(let j = 0; j < protoprops.length; j++){
            prop = protoprops[j];
            if(source.hasOwnProperty(prop)) o[prop] = source[prop];
        }
    }
    return o;
}
}());


// --- Closures!!!
// Like most modern programming languages , js uses lexical scoping. This means that
// functions are executed using the variable scope that was in effect when they were defined and 
// NOT the variable scope that is in effect when they are invoked!
let scope = "global scope";
function checkscope(){
    let scope = "local scope";
    function f(){ return scope; }
    return f(); 
    }
checkscope(); // -> "local scope"


// Slightly changed prev example:
let scope1 = "global scope";
function checkscope(){
    let scope1 = "local scope";
    function f() { return scope1;}
    return f;
}
checkscope()(); // "local scope"

// Example
let uniqueInteger = (function(){
    let counter = 0;
    return function(){
        return counter++;
    }
}())


// Example:
function counter(){
    let n = 0;
    return { count: function(){ return n++; },
            reset: function(){ return n = 0; }
    };
}

let c = counter(), d = counter();
c.count();
d.count();
c.reset();
d.reset();
c.count();
d.count();



// Example: combine closure technique with getters and setters:
function counter(n){
    return{
        get count(){ return n++; },
        set count(m){ 
            if(m > n) n = m;
            else throw Error("Count can only be set to al larger value.");
        }
    }
}

let c11 = counter(100);
c11.count
c11.count
c11.count = 2000;
c11.count
c11.count = 2000; // Error: "Count can only be set to al larger value."


// Private property accessor methods using closures
function addPrivateProperty(o111, name, predicate){
    let value;
    o111["get" + name] = function(){ return value; }
    o111["set" + name] = function(v){
        if(predicate && !predicate(v))
            throw Error("set" + name + ": invalid value"+ v);
        else 
            value = v;
    }
}
let o111 = {}
addPrivateProperty(o111, "Name", function(x){ return typeof x == "string"; });

o111.setName("Frank");
o111.setName(o111);


// Example:
// this function returns a function that always return v
function constfunc(v){
    return function(){ return v;};
}
let funcs = [];
for(let i = 0; i < 10; i++) funcs[i] = constfunc(i);
funcs[5](); // -> 5


// The length property
function check(args){
    let actual = args.length;
    let expected = args.callee.length;
    if(actual !== expected)
        throw Error("Expected " + expected + " args; got " + actual);
}

function f(x, y, z){
    check(arguments);
    return x + y + z;
}


// -- The .call() and .apply() methods
function trace(o, m){
    let ordinal = o[m];
    o[m] = function(){
        console.log(new Date(), "Entering:", m);
        let result = ordinal.apply(this, arguments);
        console.log(new Date(), "Existing:", m);
        return result;
    }
}

// -- The .bind() method, ES5 - to bind a function to an object
function f(){
    return this.x + y;
}
let o1212 = {x: 1};
let g1111 = f.bind(o1212);
g1111(2); // -> 3


function  bind(f, o) {
    if(f.bind) return f.bind(o);
    else return function(){
        return f.apply(o, arguments);
    }
}

// !!! In ES6 .bind() do more than just bind function to an object. It also performs partial
// application: any arguments you pass to bind() after the first are bound along with the _this_ value.
let sum1 = function(x, y){
    return x + y;
}
let succ = sum1.bind(null, 1);
succ(2); // 3

function f(y, z){
    return this.x + y + z;
}
let g = f.bind({x: 1}, 2);
g(3); // -> 6


// -- Processing array with functions
let data = [1, 1, 3, 5, 5];
let total = 0;
for(let i = 0; i < data.length; i++) total += data[i]
let mean = total / data.length;

total = 0;
for(let i = 0; i < data.length; i++){
    let deviation = data[i] - mean;
    total += deviation * deviation;
}
let stddev = Math.sqrt(total / data.length-1); //-> 16


// Hovewer, we can perform these same computation in concise functional style using the array
// methods map() and reduce():
let sum1112 = function(x, y){ return x + y; }
let square = function(x){ return x * x; }

let data1112 = [1, 1, 3, 5, 5];
let mean1 = data1112.reduce(sum1112) / data1112.length;
let deviations = data1112.map(function(x){ return x-mean1; });
let stddev1 = Math.sqrt(deviations.map(square).reduce(sum1112)/ (data1112.length - 1));


// Higher-Order functions
// A higher-order functions is a function that operates on functions,
//  taking one or more functions as argument and returning new functions.
function not(f){
    return function(){
        let result = f.apply(this, arguments);
        return ! result;
    }
} 
let even = function(x){
    return x % 2 === 0;
}
let odd = not(even);
[1, 1, 3, 5, 5].every(odd); // true: every element of the array is odd

// !So not() function is highter-order function because it takes a function argument and returns a new 
// function.

// .apply() examples(not from the book):
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max);
// expected output: 7
const min = Math.min.apply(null, numbers);
console.log(min);
// expected output: 2


function mapper(f){
    return function(a){
        return map(a, f);
    }
}
let increment = function(x){ return x + 1; }
let incrementer = mapper(increment);
increment([1, 2, 3]); // => '1,2,31'


// Example:
function compose(f, g){
    return function(){
        return f.call(this, g.apply(this, arguments));
    }
}

let square1 = function(x){
    return x * x;
}
let sum = function(x, y){
    x + y;
}
let squareSum = compose(square, sum);


// -- Partial application of functions
function array(a, n){
    return Array.prototype.slice.call(a, n || 0);
}

function partialLeft(f /*, ...*/){
    let args = arguments;
    return function() {
        let a = array(args, 1);
        a = a.concat(array(arguments));
        return f.apply(this, a);
    }
}

function partialRight(f /*, ...*/){
    let args = arguments;
    return function(){
        let a = array(arguments);
        a = a.concat(array(args, 1));
        return f.apply(this, a);
    }
}

function partial(f /*, ...*/){
    let args = arguments;
    return function(){
        let a  = array(args, 1);
        let i = 0; j = 0;
        for(; i < a.length; i++)
            if(a[i] === undefined) a[i] = arguments[j++];
        a = a.concat(array(arguments, j))
        return f.apply(this, a);
    }
}

let f11 = function(x, y, z){
    return x * (y - z);
}
partialLeft(f11, 2)(3, 4);
partialRight(f11, 2)(3, 4);
partial(f11, undefined, 2)(3, 4);
// result: -6


// -- Memoization
// In functional programming this kind of caching is called memoization(the function that cached its
// previous results).
function memoize(){
    let cache = {};
    return function(){
        let key = arguments.length;
        if(key in cache) return cache[key];
    }
}