import fs from "node:fs/promises"

const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)

let data = await response.json();

data = data.reduce((accumulator, elt) => {
    const ID = elt.id
    accumulator[ID] = elt

    return accumulator
}, {})

fs.writeFile('mytodos.json', JSON.stringify(data, null, 2))

// console.log(data);
