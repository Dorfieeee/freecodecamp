function displayList(array) {
    if(array.length === 0){
      console.log('You have nothing in your to do list, add something')
    } else {
      console.log("Here's your to do list"); 
      for(var i=0; i<array.length;i++){
       if (array[i].age > 40 ){ 
         console.log('older than 40',array[i])
       } else { (console.log('younger than 40', array[i]))
    }
  }
}
}

let people = [
    {fName : 'David', sName : 'Rosendorf', age: 26}, 
    {fName : 'John', sName : 'Doe', age: 35},
     {fName : 'Simon', sName : 'Robinson', age: 56},
    {fName :  'Carl', sName : 'Gustavson', age: 51},
]

console.log(people);

displayList(people);

