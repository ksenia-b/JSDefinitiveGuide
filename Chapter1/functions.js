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
