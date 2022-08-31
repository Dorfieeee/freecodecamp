// JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter

// Convert the given number into a roman numeral.

// All roman numerals answers should be provided in upper-case.


const obj = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
}

// explanation
// function takes a number and gets reminder from modular divisions of 1000, 100, 10 and 1 on each loop
// then it checks wheter reminder leser or greater than 5 and wheter it is divisible by 4 or not

const converter = (num) => {
    // initialize empty array for final result, middle value, base and exponent
    const base = 10, mid = 5;
    let exp = 3, reminder, roman = []
    // push roman M for each reminder
    reminder = Math.floor(num / base ** exp)
    for(let i = 0; i < reminder; i++){
        roman.push(obj[(base ** exp)])
    }
    num = num - reminder * (base ** exp)
    exp--
    // push other < 1000
    while(exp >= 0){
        reminder = Math.floor(num / base ** exp)

        if(reminder < mid){
            if(reminder % mid === 4){
                roman.push(obj[mid / 5 * (base ** exp)],obj[mid * (base ** exp)])
            } else {
                for(let i = 0; i < reminder; i++){
                    roman.push(obj[mid * (base ** exp) / 5])
                }
            }
        } else if(reminder > mid) {
            if(reminder % mid === 4){
                roman.push(obj[mid / 5 * (base ** exp)],obj[mid * 2 * (base ** exp)])
            } else {
                roman.push(obj[mid * (base ** exp)])
                for(let i = 0; i < (reminder-mid); i++){
                    roman.push(obj[mid / 5 * (base ** exp)])
                }
            }
        } else {
            roman.push(obj[mid * (base ** exp)])
        }
        num = num - reminder * (base ** exp)
        exp--
    }
    console.log(roman.join(''))
    return roman.join('')
}

