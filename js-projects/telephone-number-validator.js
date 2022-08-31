// US Number Validator
//

function telephoneCheck(str) {
    const regex = /^((1)[\s-]?)?((\d{3})[-\s]?|(\(\d{3}\)[\s]?))((\d{3})[\s-]?(\d{4}))$/
    if(!str.match(regex)){
      return false
    }
    return true;
  }