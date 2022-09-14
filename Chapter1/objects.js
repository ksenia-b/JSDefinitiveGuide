// --------------- Property attributes -----------
let empty = {};
let point = {x: 0, y: 0};
let point2 = { x:point.x, y:point.y + 1}
let book = {
    "main title": "JavaScript",
    'sub-title': "The Definitive Guide",
    "for": "all audience",
    author: { // The value of this property is itself an object.
        firstname: "David", // Note that these property names are unquoted.
        surname: "Flanagan"
    } 
}

// deleting prototypes:
o = {x: 1}
delete o.x;
delete o.x;
delete o.String;
delete 1;



// Example1 :  to set new attribute of the property...:
let o = {}; // start with no properties at allo
// add a nonenumerable data property x with value 1:

Object.defineProperty(o, "x", {value: 1, writable: true, enumerable: false, configurable: true});

o.x; // 1
Object.keys(o); // []

// Now modify the property x so that it is read-only
Object.defineProperty(o, "x", {writable: false});

// Try to change the value of the properti
o.x = 2; // Fails silently or throws TypeError in strict mode
o.x

// The property is still configurable, so we can change its value like this:
Object.defineProperty(o, "x", {value: 2});

// Now change x from a data property th an accessor property
Object.defineProperty(o, "x", {get: function(){ return 0}});
o.x // => 0
 

// Example 2: Creating a new object that inherit from a prototype:

// inherit returns a newly created object that inherits properties from 
// the prototype object p. It uses the ECMA Script 5 function Object.create() if it is defined,
// and otherwise falls back to an old technique.

function inherit(p){
    if(p == null) throw TypeError(); // p must be non-null object
    if(Object.create) // if object.create() is defined...
        return Object.create(p); // then just use it.
    let t = typeof p; // Otherwise do some more time checking.
    if(t !== "object" && t !== "function") throw TypeError();
    function f(){ // Define a dummy constructor function.
        f.prototype = p; // Set its prototype property to p. 
        return new f(); // Use f() to create an "heir" of p.
    }
}


var o = {x: "don't change this value"};
library_function(inherit(o));


// Example: calculate the total value in portfolio:
function getvalue(portfolio){
    let total = 0.0;
    for(stock in portfolio){
        let shares = portfolio[stock];
        let price = getquote(stock);
        total += shares * price;
    }
    return total;
}


// --------------- Inheritance
// Example:
let o = {}; // o inherits object methods from Object.prototype
o.x = 1; // and has an own property x.
let p = inherit(o); // p inherits properties from o and Object.prototype
p.y = 2; // and has an own property y.
let q = inherit(p); // q inherits properties from p, o and Object.prototype
q.z = 3; // and has an own property z.
let s = q.toString(); // toString is inherited from Object.prototype
q.x + q.y; // 3: x and y are inherited from o and p.


// Example:
let unitcircle = { r:1};
let c = inherit(unitcircle);
c.x = 1; c.y = 1;
c.r = 2;
unitcircle.r; // 1 => so the prototype object is NOT affected.


// ----------------- Property access error

// Example:
book.subtitle // undefited - because property doesn't exists.
// let len = book.subtitle.length; // Raises a TypeError exception. undefined doesn't  have a length property


let len = undefined;
if(book){
    if("subtitle" in book) len = book.subtitle.length;
}

// A concise and ideomatic alternative ato get subtitle length or underfined;
len =  book && ("subtitle" in book) && book.subtitle.length; // true, false, false???
// Result:  -> false


// ------------ Deleting properties:
delete book.author;
delete book["main title"];

o = {x : 1};
delete o.x; // Delete x and return true;
delete o.x; // Do nothing, x doesn't exists, and return true
delete o.toString // Do nothing , return true
delete 1; // nonsense, but evaluates to true
// * delete does NOT remove a properties that have a configurable attribute of false.

// So Detete evaluate to -- false -- in those cases:
delete Object.prototype; // Can't delete; property is non-configurable
let x = 1;
delete this.x; // can't dlete this property
function f(){} // declare a global function
delete this.f;

// However in not-strict mode you can do this:
this.x = 1; 
delete this.x;


// Testing properties

let o = { x: 1};
"x" in o; // true: o has an own property "x"
"y" in o; // false: o doesn't have a property y
"toString" in o; // true: o inherits toString property


// -- hasOwnProperty() method tests whether that object has an own property with the given name.
// It returns false for the inherited properties.

let o = {x: 1};
o.hasOwnProperty("x"); // true
o.hasOwnProperty("y"); // false
o.hasOwnProperty("toString"); // false


// -- propertyIsEnumerable() refines the hasOwnProperty() test. 
// It returns true ONLY if the named property is and own property and its enumerable attribute is true.
let o = inherit({y:2});
o.x = 1;
o.propertyIsEnumerable("x"); // true
o.propertyIsEnumerable("y"); // false
Object.prototype.propertyIsEnumerable("toString") // false


// !!! Instead of using the IN operator it is often sufficient to 
// simply query the property and use !== to make sure it is NOT undefined:
let o = {x: 1};
o.x !== undefined; // true: o has a property x

// * BUT there is one think that IN operator can do that the simple property access technique shown above cannot do.
// IN can distinguish between properties that do not existsa and properties that exists  but have been set to undefined.


// -- propertyIsEnumerable()

// Example:
function extend(o, p){
    for (let prop in p){
        o[prop] = p[prop];
    }
    return o;
}

function merge(o, p){
    for (let prop in p){
        if(o.hasOwnProperty(prop)) continue
        o[prop] = p[prop];
    }
}

function restrict(o, p){
    for(let prop in o){
        if(!(prop in p)) delete o[prop];
    }
    return o;
}

function subtract(o, p){
    for (let prop in p){
        delete o[prop];
    }
    return o;
}

function union(o, p) {return extend(extend({}, o), p)};

function intersection(o, p){ return restrict(extend({}, o), p)}

function keys(o){
    if(typeof o !== "object") throw TypeError();
    let result = [];
    for (let prop in o){
        if(o.hasOwnProperty(prop))
        result.push(prop);
    }
    return result;
}


// -- Property Getters and Setters
let o = {
    data_prop: value,
    get accessor_prop(){ /* function body is here */},
    set accessor_prop(value){ /* function body is here */ }
}

// Example2:
let p = {
    x: 1.0,
    y: 1.0,
    get r(){ return Math.sqrt(this.x*this.x + this.y*this.y); },
    set r(newvalue){
        let oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        let ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta(){ // theta is a read-only accessor property with getter only.
        return Math.atan2(this.y, this.x);
    }
}

let q = inherit(p);
q.x = 1; q.y = 1;
console.log(q.r);
console.log(q.theta);


// Example:
let serialnum = {
    $n: 0,
    get next(){ return this.$n++; },
    set next(n){
        if(n > this.$n) this.$n = n;
        else throw "serial number can only be set to a larger value";
    }
};

// Example:
let random = {
    get octet(){ return Math.floor(Math.random()* 256); },
    get uint16(){ return Math.floor(Math.random()*65536); },
    get int16(){ return Math.floor(Math.random()*65536) - 32768;}
}



// ---- Property attributes:

// -- getOwnPropertyDescriptor - works only for own properties.
Object.getOwnPropertyDescriptor({x: 1}, "x");


// -- Object.defineProperty() - to set the attributes of a property 
// or to create a new property with the specified attributes.

let o = {};
Object.defineProperty(o, "x", {
    value: 1, 
    writable: true,
    enumerable: false,
    configurable: false
});
o.x; // => 1
Object.keys(o); // => []

Object.defineProperty(o, "x", {writable: false});

o.x = 2;
o.x;

Object.defineProperty(o, "x", {value: 2});
o.x;

Object.defineProperty(o, "x", {get:function(){ return 0; }});
o.x;


// Example:
let p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: {
        get: function(){ return Math.sqrt(this.x*this.x + this.y*this.y) },
        enumerable: true,
        configurable: true
    }
});
// Return {x: 1, y: 1, r: ()}
// r = 1.4142135623730951, x = 1, y = 1


// Example: copying property attributes
Object.defineProperty(Object.prototype, "extend",{
    writable: true,
    enumerable: false,
    configurable:true,
    value: function(o){
        let names = Object.getOwnPropertyNames(o);
        for(let i = 0; i < names.length; i++){
            if(names[i] in this) continue;
            let desc = Object.getOwnPropertyDescriptors(o, names[i]);
            Object.defineProperty(this, names[i], desc);
        }
    }
});


// ----- Object attributes:
let p = {x:1};
let o = Object.create(p);
p.isPrototypeOf(o); // true: inherits from p
Object.prototype.isPrototypeOf(p); // true: inherits from Object.prototype


// ----- Class Attributes
function classOf(o){
    if(o === null) return "Null";
    if(o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

classOf(null); // -> 'Null'
classOf([]); // -> 'Array'
