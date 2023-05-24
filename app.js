import express from "express";
import { FileHandler } from "./template.js";


//             ==========  BASIC STUFF ==========

const app = express();
app.use(express.json())
const port = 3003;

app.get("/status", (req, res) => {
    res.status(200).send("OKAY");
});

app.listen(port, () => {
    console.log(`Hausnummer: ${port}`);
});




//             ==========  GET ALL TODOS ==========

const ToDoModel = await FileHandler("./mytodos.json");

app.get("/todos", async (req, res) => {
    const data = ToDoModel.getToDo();
    res.send(data);
});




//             ==========  GET SINGLE TODO ==========

app.get("/todos/:id", async (req, res) => {
    const id = req.params.id;
    const data = ToDoModel.getOneToDo(id);
    res.send(data);
});




//             ==========  POST NEW TODO ==========

app.post("/todos", async (req, res) => {
    const data = req.body;
    ToDoModel.addToDo(data)
    res.send(data)
})



//             ==========  UPDATE TODO ==========

app.patch('/todos/:id', async (req, res) => {
    const updateTodo = req.body;
    const id = req.params.id;
    const results = ToDoModel.updateToDo(id, updateTodo)
    res.send(results)

})



//             ==========  UPDATE TODO ==========

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    ToDoModel.deleteToDo(id);
    res.send("ToDo deleted");
});



