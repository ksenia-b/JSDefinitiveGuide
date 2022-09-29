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
