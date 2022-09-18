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