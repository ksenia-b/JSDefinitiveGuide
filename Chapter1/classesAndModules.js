// Classes and prototypes

// A simple js class

// Example: example defines a prototype object for a class that represents a range of values and also defines
// a "factory" function that creates and initializes a new instance of the class.
function range(from, to){
    let r = inherit(range.methods);
    r.from = from;
    r.to = to;
    return r;
}

range.methods = {
    includes: function(x){ return this.from <= x && this.to; },
    foreach: function(f){
        for(let x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    toString: function(){
        return "(" + this.from + "..." + this.to + ")";
    }
};
let r = range(1, 3);
r.includes(2);
r.foreach(console.log);
console.log(r);
// * here the inherit() function is used from the object chapert
// here it is dublicated:
function inherit(p){
    if (p == null) throw TypeError();
    if(Object.create)
        return Object.create(p);

    let t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError;
    function f(){
        f.prototype = p;
        return new f();
    }
}


// -- Classes and Constructors
// Example: a range class using a constructor
function Range(from, to){
    this.from = from;
    this.to = to;
}

Range.prototype = {
    includes: function(x){ return this.from <= x && x <= this.to; },
    forEach: function(f){
        for(let x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    toString:  function(){ return "(" + this.from + "..." + this.to + ")"; }
};
let r11 = new Range(1, 3);
console.log("r11.includes(2); = ", r11.includes(2));
console.log("r11.forEach(f...= ", r11.forEach(function(x){ console.log(x); }));
console.log(r11);


//--  The constructor property
let F = function(){}; // this is a function object
let p = F.prototype; // this is a property object associated with it.
let c = constructor; // this is the function associated with the prototype.
c === F; // true: F.prototype.constructor === F for any function


let o = new F();
o.constructor === F; // true: the constructor property specifies the class


// Example:
Range.prototype = {
    constructor: Range,
    includes: function(x){ return this.from <= x && x <= this.to; },
    foreach: function(f){
        for(let x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    toString: function(){ return "(" + this.from + "..." + this.to + ")"; }
}

// Another common technique is to use the predefined prototype object with its constructor property,
// and add methods to it one at a time:
Range.prototype.includes = function(x){ return this.from <= x && x <= this.to; };
Range.prototype.foreach = function(f){
    for(let x = Math.ceil(this.from); x <= this.to; x++) f(x);
};
Range.prototype.toString = function(){
    return "(" + this.from + "..." + this.to + ")";
}

// -- Jave-style classes in JS
// We can reduce the process of class definition in JS to a three-step algorithm.
// First, write a constructor function that sets instance properties on new obects.
// Second, define instance methods on the prototype object of the constructor.
// Third, define class field and class properties on the constructor itself.
function defineClass(constructor, methods, statics){
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    return constructor;
}

let SimpleRange = defineClass(function(f, t){
    this.f = f;
    this.t = t;
},
{
    includes: function(x){ return this.f <= x && x <= this.t; },
    toString: function(){ return this.f + "..." + this.t; }
}, {
    upto: function(t){ return new SimpleRange(o, t); }
}
);
// *extend() function is from example 8-3


// Example: a complex number class:
function Complex(real, imaginary){
    if(isNaN(real) || isNaN(imaginary))
        throw new TypeError();
    this.r = real;
    this.i = imaginary;
}

Complex.prototype.add = function(that){
    return new Complex(this.r + that.r, this.i + that.i);
};
Complex.prototype.mul = function(that){
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
};

Complex.prototype.mag = function(){ return Math.sqrt(thi.r * this.r + this.i * this.i); };
Complex.prototype.neg = function(){ return new Complex(-this.r, -this.i); };
Complex.prototype.toString = function(){ return "{" + this.r + "," + this.i + "}" };

// Test whether this Complex object has the same value as another.
Complex.prototype.equals = function(that){
    return that != null && that.constructor === Complex &&
    this.r === that.r && this.i === that.i;
};

Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

Complex.parse = function(s){
    try{
        let m = Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
        
    }
    catch(x){
        throw new TypeError("Can't parse '"+ s + "' as a complex number.'");
    }
};
Complex._format = /^\{([^,]+),([^}]+)\}$/;

// With the example above we can use the constructor , instance fields, instance methods, class fields,
// and class methods with code like this:
let c111 = new Complex(2, 3);
let d111 = new Complex(c111.i, c111.r);
c111.add(d111).toString();
Complex.parse(c111.toString()).add(c111.neg()).equals(Complex.ZERO);


// -- Argumenting Classes:
// an object inherits properties from its prototype, even if the properties of the prototype change
// after object is created.

// Example:
// let n  = 3;
// n.times(function(n){
//     console.log("hello!");
// });
Number.prototype.times = function(f, context){
    let n = this.valueOf();
    for(let i = 0; i < n; i++) f.call(context, i);
};

String.prototype.trim = String.prototype.trim || function(){
    if(!this) return this;
    return this.replace(/^\s+|\s+$/g, "");
}

Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
}


// -- the constructor name
// Example: A type() function to determine the type of a value
function type(o){
    let t, c, n;
    if(o === null) return "null";
    if(o !== o) return "nan";

    if((t= typeof o) !== "object") return t;
    if((c = classOf(o)) !== "Object") return t;
    if(o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName())) return n;

    return "Object";
}

function classOf(o){
    return Object.prototype.toString.call(o).slice(8, -1);
};

Function.prototype.getName = function(){
    if("name" in this) return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1]; 
};


// -- Duck typing. Alternative way of determining the class of an object is. We need to sidestep
// and instead to ask "What is the class of this object?"  we ask "What can this object do?"
// This approach is common in languages like Python and Ruby and is called duck-typing after this expression
// ofter attributes by James Whitcomb Riley:
// ___ "When I see a bird that walks like a duck and swims like a duck and quacks like a duck,
// I call that bird a duck."

// Example:
// a function for duck-typing checking:
// Return true if o implements the methods specified by the remaining args.
function quacks(o, /*, ...*/){
    for (let i = 1; i < arguments.length; i++){ // for each argument after 1
    let arg = arguments[i];
    switch(typeof arg){
        case 'string':
            if(typeof o[arg] !== "function") return false;
            continue;
        case 'function': // use prototype object instead
            arg = arg.prototype;
        case 'object': // check for matching methods:
            for(let m in arg){
                if(typeof arg[m] !== "function") continue;
                if(typeof o[m] !== "function") return false;
            }
    }
}

return true;
}

