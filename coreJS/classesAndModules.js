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


// ______________________________________Example:  Set.js: an arbitrary set of values
function Set(){
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments); // all arguments are values to add
}

// Add each of the arguments to the set
Set.prototype.add = function(){
    for(let i = 0; i < arguments.length; i++){ // For each argument
        let val = arguments[i]; // the value to ddd to the set
        let str = Set._v2s(val); // transform it to a string
        if(!this.values.hasOwnProperty(str)){ // if not already in the set
            this.values[str] = val; // map string to value
            this.n++; // increase set size
        }
    }
    return this; // support chained method calls.

};
// remove each of the argments from the set
Set.prototype.remove = function(){
    for(let i = 0; i < arguments.length; i++){
        let str = Set._v2s(val);
        if(this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    }
    return this;
    };

// return true if set contains value, false otherwise;
Set.prototype.contains = function(value){
    return this.values.hasOwnProperty(Set._v2s(value));
};

// return the size of the set
Set.prototype.size = function(value){
    return this.n;
};

// Call function f on the specified context for each element of the set.
Set.prototype.forEach = function(f, context){
    for(let s in this.values)
        if(this.values.hasOwnProperty(s))
            f.call(context, this.values[s]);
};

Set._v2s = function(val){
    switch(val){
        case undefined: return 'u'; // Special primitive
        case null: return 'n'; // values get single-letter
        case true: return 't'; // codes.
        case false: return 'f';
        default: switch(typeof val){
            case 'number': return '#' + val;
            case 'string': return '"' + val;
            default: return '@' + objectId(val);
        }
    }
    function objectId(o){
        let prop = "|**objectId**|";
        if(!o.hasOwnProperty(prop))
            o[prop] = Set._v2s.next++;
        return o[prop];
    }
}

Set._v2s.next = 100; // Start assinging object ids at this value;

oks1 = new Set();
oks1.add("mark");
oks1.add("natali");
// oks1.values
// {"dfss: 'dfss', "natali: 'natali', "mark: 'mark'}


// Example: Enumerated types in js
function enumeration(namesToValues){
    let enumeration = function(){
        throw "Can't Instantiate Enumerations";
    };
    let proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function(){
            return this.name;
        },
        valueOf: function(){
            return this.value;
        },
        toJSON: function(){
            return this.name;
        }
    };

enumeration.values = []; // array of the enumerated value objects

for(let name in namesToValues){
    let e = inherit(proto);
    e.name = name;
    e.value = namesToValues[name];
    enumeration[name] = e;
    enumeration.values.push(e);
}

enumeration.foreach = function(f, c){
    for(let i = 0; i < this.values.length; i++) f.call(c, this.values[i]);
};
return enumeration;
}

// _______________________ Example:
// The 'hello word' of enumerated types is to use an enumerated type to represent the suits in a deck
// of card. Example uses enumeration() function in this way and also defines classes to representcards and decks of cards.
// Representing cards with enumerated types:
function Card(suits, rank){
    this.suits = suits;
    this.rank = rank;
}

Card.Suit = enumeration({
    Club: 1, Diamonds: 2, Heards: 3, Spades: 4
});
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5,
Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14});

Card.prototype.toString = function(){
    return this.rank.toString() + " of " + this.suit.toString();
};

Card.prototype.compareTo = function(that){
    if(this.rank < that.rank) return -1;
    if(this.rank < that.rank) return 1;
    return 0;
};

// the function for ordering cards as you would in poker
Card.orderByRank = function(a, b){
    return a.compareTo(b);
}

// a function for ordering cards as you would in bridge
Card.orderBySuit = function(a, b){
    if(a.suit < b.suit) return -1;
    if(a.suit > b.suit) return 1;
    if(a.rank < b.rank) return -1;
    if(a.rank > b.rank) return 1;
    return 0;
}

// Define class to represent a standart deck of cards:
function Deck(){
    let cards = this.cards = [];
    Card.Suit.foreach(function(s){
        Card.Rank.foreach(function(r){
            cards.push(new Card(s, r));
        });
    });
}

// Shuffle method: shuffles cards in place and returns the deck
Deck.prototype.shufle = function(){
    let deck = this.cards, len = deck.length;
    for(let i = len - 1; i > 0; i--){
        let r = Math.floor(Math.random() * (i + 1)), temp; // random number
        temp = deck[i], deck[i] = deck[r], deck[r] = temp;
    }
    return this;
};

// Deal method: returns an arrray of cards
Deck.prototype.deal = function(n){
    if(this.cards.length < n) throw "Out of cards";
    return this.cards.splice(this.cards.length - n, n);
};

// Create a new dekc of cards, shuffle it and deal a bridge hand
let deck = (new Deck()).shufle();
let hand = deck.deal(13).sort(Card.orderBySuit);

let oksDeck = new Deck();


// -- Standart Conversion Methods:
// __________________ Example, note that here we use extend() function

// Add these methods to the Set prototype object.
extend(Set.prototype, {
    toString: function(){
        let s = "{", i = 0;
        this.foreach(function(v){
            s += ((i++ > 0)?", ":"") + v;
        });
        return s + "}";
    },
    toLocaleString: function(){
        let s = "{", i = 0;
        this.foreach(function(v){
            if(i++ > 0) s += v; // null 7 undefined
            else s += v.toLocaleString(); // all others;
        });
        return s + "}";
    },
    // Convert s set to an array of values
    toArray: function(){
        let a = [];
        this.foreach(function(v){
            a.push(v);
        });
        return a;
    }
});

// Treat sets like arrays for the purpose of JSON stringification.
Set.prototype.toJSON = Set.prototype.toArray;


// --- Comparison Methods:
// _____________________Examaple :
// The Range class overwrote its constructor property. So add it now.
Range.prototype.constructor = Range;

// A Range is not equal to any nonrange.
// Two ranges are equal if and only if their endpoings are equial.
Range.prototype.equals = function(that){
    if(that == null) return false;
    if(that.constructor !== Range) return false;
    // Now return true if and only if the two endpoints are equal.
    return this.from == that.from && this.to == that.to;
}
// We cannot  just compare the values property of two sets, but must perform a deeper comparison:
Set.prototype.equals = function(that){
    if(this === that) return true;
    
    // Note that instanceof property rejects null and undefined
    if(!(that instanceof Set)) return false;
    if(this.size() != that.size()) return false;

    // Now check whether every element in this is also in that.
    try{
        this.foreach(function(v){
            if(!that.contains(v)) throw false;
        });
        return true;
    }
    catch(x){
        if(x === false) return false;
        throw x;
    }
}

// --- Borrowing methods: 'borrowing' = informal term.
// There is nothing spetial about methods in js: they are simply functions as signed to object 
// properties and invoked "through" of "on" and object.
// !! It is only the array methods that can be borrowed.

// Example: Generic methods for borrowing:
let generic = {
    toString: function(){
        let s = '[';
        if(this.constructor && this.constructor.name)
        s += this.constructor.name + ": ";

        // Now enumerate all noninherited, nonfunction properties
        let n = 0;
        for(let name in this){
            if(!this.hasOwnProperty(name)) continue; // skip inherited props
            let value = this[name];
            if(typeof value === "function") continue; // skip methods
            if(n++) s+= ", ";
            s += name + "=" + value;
        }
        return s + ']';
    },

    equals: function(that){
        if(that == null) return false;
        if(this.constructor !== that.constructor) return false;
        for(let name in this){
            if(name === "|**objectid**|") continue; // skip special prop.
            if(!this.hasOwnProperty(name)) continue; // skop inherited
            if(this[name] !== that[name]) return false; // compare values
        }
        return true;
    }
};


// -- Constructor overloading and factory methods:
// Sometimes we want to allow objects to be initialized in more that one way.
// here is an overloaded version of the Set constructor, for example:

// One way to to this is to OVERLOAD the constructor and have it perform different kinds
// of initialization depending on the arguments it is passed.
// ___________________________________Example:
function Set(){
    this.values = {};
    this.n = 0;

    if(arguments.length == 1 && isArrayLike(arguments[0]))
        this.add.apply(this, arguments[0]);
        else if(arguments.length > 0)
        this.add.apply(this, arguments);
}

// and here is a factory method for initializing a Set form an array:
Set.fromArray = function(a){
    s = new Set();
    s.add.apply(s, a);
    return s;
}

// --- Defining subclass
// Example: Subclass definition utilities
function defineSubclass(superclass, // constructor of the Superclass
                        constructor, // The constructor for the new subclass
                        methods, // Instance methds: copied to prototype
                        statics){ // class properties: copied to constructor
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    // return the class
    return constructor;
}

// --- Constructor and Method Chaining:
// Example_____________________:
function NonNullSet(){
    Set.apply(this, arguments);
}

NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;

// To exclude null and undefined, we only have to override the add() method
NonNullSet.prototype.add = function(){
    for(let i = 0; i < arguments.length; i++)
    if(arguments[i] == null)
        throw new Error("Can't add null or undefined to a nonNullSet");

        // Chain to the sperclass to perform the actual insertion
        return Set.prototype.add.apply(this, arguments);
}
    
                        
 // -- Class hierarchies and Abstract Classes

 // ___________________________________ example:
 // A hierarchy of abstract and concrete Set classes
 function abstractmethod(){
    throw new Error("abstract method");
 }                   
 function AbstractSet(){
    throw new Error("Can't instantiate abstract classes");
 }
 AbstractSet.prototype.contains = abstractmethod;

 let NotSet = AbstractSet.extend(function NotSet(set){
    this.set = set;
 }, 
 {
    contains: function(x){
        return !this.set.constains(x);
    },
    toString: function(x){
        return "_" + this.set.equals(that.set);
    },
    equals: function(that){
        return that instanceof NotSet && this.set.equals(that.set);
    }
 });

 let AbstractEnumerableSet = AbstractSet.extend(
    function(){
        throw new Error("Can't instantiate abstract classes.")
    },
    {
        size: abstractmethod,
        foreach: abstractmethod,
        isEmpty: function(){ return this.size() == 0; },
        toString: function(){
            let s = "{", i = 0;
            this.foreach(function(v){
                if(i++ > 0) s+= ", ";
                s += v;
            });
            return s + "}";
        },
        toLocaleString: function(){
            let s = "{", i = 0;
            this.foreach(function(v){
                if(i++ > 0) s+= ", ";
                if(v == null) s += v; // null and undefined
                else s += v.toLocaleString(); // all others
            });
            return s + "}";
        },
        toArray: function(){
            let a = [];
            this.foreach(function(v){
                a.push(v);
            });
            return a;
        },
        equals: function(that){
            if(!(that instanceof AbstractEnumerableSet)) return false;
            if(this.size() != that.size()) return false;
            try{
                this.foreach(function(v){
                    if(!that.constains(v)) throw false;
                    return true;
                })
            }
            catch(x){
                if(x === false) return false;
                throw x;
            }
        }});

let SingletonSet = AbstractEnumerableSet.extend(function SingletonSet(member){
    this.member = member;
},
{
    contains: function(x){
        return x === this.member;
    },
    size: function(){
        return 1;
    },
    foreach: function(f, ctx){
        f.call(ctx, this.member);
    }
}
);

let AbstractWritableSet = AbstractEnumerableSet.extend(
    function(){
        throw new Error("Can't instantiate abstract class.")
    },
    {
        add: abstractmethod,
        remove: abstractmethod,
        union: function(that){
            let self = this;
            this.foreach(function(v){
                if(!that.contains(v)) self.remove(v);
            });
            return this;
        },
        intersection: function(that){
            let self = this;
            this.foreach(function(v){
                if(!that.contains(v)) self.remove(v);
            });
            return this;
        },
        differ: function(that){
            let self = this;
            that.foreach(function(v){
                self.remove(v);
            });
        }

    }
);


let ArraySet = AbstractWritableSet.extend(
    function ArraySet(){
        this.values = [];
        this.add.apply(this, arguments);
    },
    {
        constains: function(v){
            return this.values.indexOf(v) != -1;
        },
        size: function(){
            return this.values.length;
        },
        foreach: function(f, c){
            this.values.forEach(f, c);
        },
        add: function(){
            for(let i = 0; i < arguments.length; i++){
                let arg = arguments[i];
                if(!this.constains(arg)) this.values.push(arg);
            }
            return this;
        },
        remove: function(){
            for(let i = 0; i < arguments.length; i++){
                let p = this.values.indexOf(arguments[i]);
                if(p == -1) continue;
                this.values.splice(p, 1);
            }
            return this;
        }
    }
)

// -- Making properites nonenumerable
// _______ Example: defining nonenumerable properties
(
  function(){
    Object.defineProperty(Object.prototype, "objectId", {
        get: idGetter,
        enumerable: false,
        configurable: false
    });

function idGetter(){
    if(!(idprop in this)){
        if(!Object.isExtensible(this)) throw new Error("Can't define id for noneextensible objects");
        Object.defineProperty(this, 
        idprop,{
            value: nextid++,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
    return this[idprop];
};
let idprop = "|**objectId**|";
let lextid = 1;
  }());


// -- Encapsulating object state:
// A range class with strongly encapsulated endpoints
function Range(from, to){
    if(from > to) throw new Error("Range: from must be < = to");
    function getFrom(){ return from; }
    function getTo(){ return to; }
    function setFrom(f){
        if(f <= to) from = f;
        else throw new Error("Range: from must be >= from");
    }
    function setTo(t){
        if(t >= from) to = t;
        else throw new Error("Range: from must be <= to.");
    }
    Object.defineProperties(this, {
        from: {
            get: getFrom, set: setFrom, enumerable: true, configurable: false
        },
        to: {
            get: getTo, set: setTo, enumerable: true, configurable: false
        }
    });
}

Range.prototype = hideProps({
    constructor: Range,
    includes: function(x){
        return this.form <= x && x <= this.to;
    },
    foreach: function(f){
        for(let x=Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    toString: function(){
        return "(" + this.form + "..." + this.to + ")";
    }
});

// --- Subclasses and ECMAScript 5
// Example:
function StringSet(){
    this.set = Object.create(null);
    this.n = 0;
    this.add.apply(this, arguments);
}

StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
    constructor: { value: StringSet },
    contains: { value: function(x){
        return x in this.set;
    } },
    size: {
        value: function(){
            return this.n;
        }
    },
    foreach: {
        value: function(f, c){
            Object.keys(this.set).forEach(f, c)
        }
    },
    add: {
        value: function(){
            for(let i = 0; i < arguments.length; i++){
                if(!(arguments[i] in this.set)){
                    this.set[arguments[i]] = true;
                    this.n++;
                }
            }
            return this;
        }
    },
    remove: {
        value: function(){
            for(let i = 0; i < arguments.length; i++){
                delete this.set[arguments[i]];
                this.n--;
                return this;
            }
        }
    }
});