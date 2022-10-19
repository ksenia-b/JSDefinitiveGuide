// A regular expression is an object that describes a pattern of characters. The JS regular expresion class RegExp 
// represents regular expresions, and both String and RegExp define methods thst use regular expresions to perform
// powerful pattern-matching and search-and-replace functions on text.hhh

// ---Literal characters:
// Alphabetic character = itself
// \0 = the NUL character(\u0000)
// \t = tab (\u0009)
// \n = newLine (\u000A)
// \v = vertical tab (\u000B)
// \f = Form feed(\u000C)
// \r = Carriage return (\u000D)
// \x nn = the latic character specified by the hexadecimal number nn; for example, \xoA is the same as 'n
// \u xxx = the unicode character specified by the hexadecimal number xxx; for example, 'u0009 is the same as \t
// \cX = the control character ^X; for example, 'cJ is equivalent to hte newline character \n

// A number of punctuation have special meaning in regular expressions. They are:
//^ $ = { . * + ? = ! : \ | / ( ) [ ] { }

// --- Regular expression character classes:
// [...] = any one character between the brackets.
// ^[...] = any one character NOT between the brackets.
// . = any character expect newline or another Unicode line terminator.
// \w = any ASCII word character. Equivalent to [a-zA-Zo-9_].
// \W = any character that is NOT an ASCII word character equivalent to [a-zA-Zo-9_].
// \s = any unicode whitespace character.
// \S = any character that is not Unicode whitespace. Note that \W and \S are not the same thing.
// \d = any ASCII digit. Equivalent to [0-9].
// \D = any character other thatn an ASCII digit. Equivalent to [^0-9].
// [\b] = any literal backspace (special case).

// --- Repetition:
// {n, m} = match the previous item at least n  times by tno more than m times.
// {n, } = match the previous item n or more times.
// {n} = match exactly n occurences of the previous item.
// ? = match zero or one occurences of the previous item. That is the previous item is optional. Equivalent to {0, 1}
// + = match one or more occurences of the previous item. Equivalent to {1, }.
// * = match zero or more occurences of the previous item. Equivalent to {0, }.


// Examples:
/\d{2,4/ // match between two and four digits
/\w{3}\d?/ // match exactly three word characters and an optional digit
/\s+java\s+/ // match "java" with one or more spaces before and after
/[^(]*/ // match zero or more characters that are NOT open parenthesis

// --- Regular expresion alternaiton, grouping and reference characters
// | = alternation. Match either the subexpression to the left or subexpression to the right.
// (...) = grouping. Group items into a single unit that can be used with *, +, ?, | and so on.
// Also remember the characters that match this group for use the later reference.
// (?:...) = grouping only. Group items into a single init, but do not remember the characters that
// match this group.
// \n = thech the same character that were match ed when group number n was first matched. Groups are 
// subexpressions within (possibly nested) parentheses. Group numbers are assigned by counting left parenthesis
// Group numbers are assinged by counting left parentheses form left to right. Groups formed with (?: are NOT numbered.

// --- Regular expression anchor characters
// ^ = match the beginning of the string and in multiline searches, the begining of a line.
// $ = match the end of the string and in multiline sarches the and of a line.
// \b = match a word boundary. That is, match the position between a \w character and a \W character 
// or between a \w character and the bebinning or end of a string. (Note hovewer [\b] = matches backspaces).
// \B = mathc a position that is not a word boundary.
// (?=p) = a positive lookhead assertion. Require that hte following characters match the pattern p, but do not include
// those characters in the match.
// (?!p) = a negative lookhead assertion. Require that the following characters do not match the pattern p.


// --- Regular expression flags:
// i = perform case-insensitive mathcing.
// g = perform a global mathc - that is, find all matches rather than stopping afrer the first match.
// m = multiline mode. ^ matches beginning of line or beginning of string, and $ matches end of line or end of string.


// Example:
let text = "dasf javascript 'fadsf' df as $1 .";
text.replace(/javascript/gi, "JavaScript"); // no matter how it is capitalized, replace it with correct capitalization


// Example:
// Replace the straight quotation marks with curly quotes, leaving the quoted text (stored in $1) unchanged.
let quote = /"([^"]*)"/g;
text.replace(quote, '"$1');

// Example:
// No matter how it is capitalized, replace it with the correct capitalization
text.replace(/javascript/gi, "JavaScript");

// Example:
// A quote is a quotation mark, followed by any number of
// nonquotation-mark characters (which we remember), followed
// by any quotation mark.
let quote1 = /"([^"]*)"/g;
// Replace the straight quotation marks with curly qootes,
// leaving the quoted text(stored in $1) unchanged.
text.replace(quote, '"1$"');

// Example:
let url = /(\w+):\/\/([\w.]+)\/(\S*)/;
let text1 = "Visit my lbot at https://example.com/±david";
let result1 = text1.match(url);
if(result1 != null){
    let fullurl = result1[0];
    let protocol = result1[1];
    let host = result1[2];
    let path = result1[3];
}