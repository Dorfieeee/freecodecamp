// One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

// A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

// Write a function which takes a ROT13 encoded string as input and returns a decoded string.

// All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

// ASCII characters in case you'd like to change the size and initial char e.g. ROT47 num = 47, start = 33
const ASCII_MIN = 33
const ASCII_MAX = 127

function rot13(str = '',num = 13,start = 65){
    // generate array
    const gen = (arr = []) => {
        return arr = new Array(num).fill(null).map(e => {
            if(start > ASCII_MAX){
                start = ASCII_MIN
            }
            return String.fromCharCode(start++)})
        }
    // populate array   
    const A = gen()
    const B = gen()
    // 1. split into word array, then each word into letters array and map through each letter
    // 2. if letter not found in either of A or B, then don't change it
    // 3. if letter NOT found in A then pick letter from A with index from B and vice versa
    // 4. join back together
    return str = (() =>
        str
        .split(' ')
        .map(word => word
            .split('')
            .map(letter => A.indexOf(letter) < 0 && B.indexOf(letter) < 0 
            ? letter
            : A.indexOf(letter) < 0
            ? A[B.indexOf(letter)]
            : B[A.indexOf(letter)]) 
            .join('')) 
        .join(' ')
    )()
}

console.log(rot13('FREE CODE CAMP',47,33))
console.log(rot13('SERR CVMMN!'))
console.log(rot13('SERR YBIR?'))
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."))