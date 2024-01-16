const array = [
    { 
    id: 1, name: "hello",
    id: 2, name: "hello",
    id: 3, name: "hello",
    id: 4, name: "hello",
    id: 5, name: "hello",
    id: 6, name: "hello",
    id: 7, name: "hello",
    id: 8, name: "hello",
    id: 9, name: "hello",
    id: 10, name: "hello",
    id: 12, name: "hello",
    id: 13, name: "hello",
    id: 14, name: "hello",
    id: 15, name: "hello",
    id: 16, name: "hello"  
    }
]

// Get every 3rd item:

for( let i=0; i,arr.length; i= i+3){

}

// This will filter out each one where the modulus equals is 0, this is every 3 starting with 0
const selectedItems = arr.filter( (item, idx) => idx%3=== 0 )
// should end up with an array of 5 items
console.log(selectedItems)