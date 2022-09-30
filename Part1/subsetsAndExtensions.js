// Example:
let [x, y] = [1, 2]; // same as let x = 1; y = 2;
[x, y] = [x+1, y+1];
[x, y] = [y, x];
console.log([x, y]); // Prints [3, 2]


// Example:
// Convert [x, y] coordinates to [r, theta] polar coordinates
function polar(x, y){
    return [Math.sqrt(x*x + y*y), Math.atan2(y, x)];
}
    
function cartesian(r, theta){
    return [r*Math.cos(theta), r*Math.sin(theta)];
}
let [r, theta] = polar(1.0, 1.0);
let [x, y] = cartesian(r, theta); // x = 1, y = 1

// Example:
let [x, y] = [1]; // x = 1, y = undefined
[x, y] = [1, 2, 3]; // x = 1, y = 2
[,x,,y] = [1, 2, 3, 4]; // x = 2, y = 4


// Example:
let first, second, all;
all = [first, second] = [1, 2, 3, 4]; // Result: [1, 2, 3, 4] BECAUSE: the value of destructuring assignment is
// the complete data structure on the right-hand side, NOT the individual value that are extracted from it.


// Example: destructuring in nested arrrays:
let [one, [twoA, twoB]] = [1, [2, 2.5], 3]; 


// Example:
// A nested data structure: an object that contains an array of objects:
let data = {
    name: "destructuring assignment",
    type: "extension",
    impl: [{
        engine: "spidermonkey", 
        version: 1.7
    },
{
    engine: "rhino",
    version: 1.7
}]
};

// Use destructuring assignment to extract four values from the data structure
let({
    name: featue, impl:[{engine: impl1, version: v1}, {
        engine: impl2
    }]} = data){
        console.log(feature);
        console.log(impl1);
        console.log(v1);
        console.log(impl2);
    }
// ??

// -- Iteration

// -- for/each loop: ????
let o = {one: 1, two: 2, three: 3};
for(let p in o) console.log(p);
for each(let v in o) console.log(v); // ? does it still exists????


// Example:
// Return iterable object that represents an inclusive range of numbers:
function range(min, max){
    return {
        get min(){
            return min;
        },
        get max(){
            return max;
        }, 
        includes: function(x){
            return min <= x && x <= max;
        },
         toString: function(){
            return "[" + min + "," + max + "]";
         },
         __iterator__: function(){
            let val = Math.ceil(min);
            return {
                next: function(){
                    if(val > max)
                    throw StopIteration;
                    return val++;
                }
            }
         }
    } };
    // Here is how we can iterate over range:
    for(let i in range(1, 10)) console.log(i); // prints numbers from 1 to 10


// -- Generators:
// Generators are  js feature that borrowed from Python. It use the -yield- keyword, which mean
// that code that uses them must explicitly opt in to ver..... The -yield- keyword is used in a function
// and functions something like -return-

// Generators are something called "generator iterator" to clearly distinguish them from the generator
// functions by which they are created. 

// Example:
// Generator functions need never return:
function fibonacci(){
    let x = 0, y = 1;
    while(true){
        yield y;
        [x, y] = [y, x + y];
    }
}
// invoke the generator function to obtain generator:
f = fibonacci();

// Use the generator as an iterator, printing the first 10 Fibonacci numbers.
for(let i = 0; i < 10; i++) console.log(f.next());


// Example: a pipeline of generators:
function eachline(s){
    let p;
    while((p = s.indexOf('\n')) != -1){
        yield s.substring(0, p);
        s = s.substring( p + 1);
    }
    if(s.length > 0) yield s;
}

function map(i, f){
    for(let x in i ) yield f(x);
}

function select(i, f){
    for(let x in i){
        if(f(x)) yield x;
    }
}

// Start with a string of text to process:
let text = " #comment \n \n hello \n world \n quit \n unreached \n";
let lines = eachline(text);
let trimmed = map(lines, function(line){
    return line.trim();
});
// finally ignore blank lines and comments
let nonblank = select(trimmed, function(line){
    return line.length > 0 && line[0] != "#";
})

for(let line in nonblank){
    if(line === "quit") break;
    console.log(line);
}


// -- Array comprehension:
let evensquares = [];
for(x in range(0, 10)){
    if(x % 2 === 0)
    evensquares.push(x*x);
}

// Example:
data = [2, 3, 4, -5];
squares = [x *x for each (x in data)] //?? for each?


// -- Shorthand functions
let succ = function(x) x+1, yes = function() true, no = function() false; // does not work????

// -- Multiple catch clauses:
try{
    throw 1;
}
catch(e if e instanceof ReferenceError){
    // handle reference error here
}
catch(e if e == "quit"){
    // handle the thrown string "quit"
} // ???? doesn't work?