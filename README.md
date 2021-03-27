PersianUtils by Typescript [Persian.js](https://github.com/HamedFathi/persian.js) and [Rial.js](https://github.com/HamedFathi/rial.js) and [Check Iranian National Code Validity](https://gist.github.com/ebraminio/5292017) and [Iranian postal code validation](https://stackoverflow.com/questions/48719799/iranian-postal-code-validation) and [NumToPersian](https://github.com/HamedFathi/NumToPersian) 
        
```js
Iranian postal code val
this is some rules about this regex:
It's all numeric
10 digit count
don't use 0 in first 5 digit
don't use 2 in postal code
First 4 digit is not the same
The 5th digit cannot be 5
all digits aren't t
The following regex satisifes your conditions:
\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b

Explanation:
\b - a word boundary
(?!(\d)\1{3}) - negative lookahead to make sure that the first 4 digits are not the same.
[13-9]{4} - matches 4 occurrences of all the digits except 0 and 2
[1346-9] - matches a single digit that is not a 0,2 or 5
[013-9]{5} - matches 5 occurrences of all the digits except 2
\b - a word boundary
```

=> I made this project.
