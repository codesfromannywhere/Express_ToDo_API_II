import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";


export const FileHandler = async (path) => {

    let data;

    // const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    // data = await response.json();
    // await fs.writeFile(path, JSON.stringify(data, null, 2))
    const newData = await fs.readFile(path)
    data = JSON.parse(newData)



    // get all Todos as an array
    const getToDo = () => {
        return Object.values(data);
    };

    // get Single Todo 
    const getOneToDo = (id) => {
        return data[id];
    };

    // add Todo
    const addToDo = async (todoentry) => {
        const newID = uuidv4();
        todoentry.id = newID;
        data[newID] = todoentry;
        fs.writeFile(path, JSON.stringify(data))
    }

    // update Todo
    const updateToDo = (id, updateTodo) => {
        const updateTask = data[id];
        const updatedTask = { ...updateTask, ...updateTodo }
        data[id] = updatedTask;

        fs.writeFile(path, JSON.stringify(data));
        // gives back the new data
        return updatedTask;
    }


    // delete Todo
    const deleteToDo = (id) => {
        delete data[id];
        fs.writeFile(path, JSON.stringify(data));
    }

    return {
        getToDo,
        getOneToDo,
        addToDo,
        updateToDo,
        deleteToDo,
    }

}

console.log(FileHandler('./mytodos.json'));