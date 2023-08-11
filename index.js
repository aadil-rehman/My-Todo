import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { count } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDB pwd  : password - QhbZPSMqxYnesH9w
mongoose.connect("mongodb+srv://aadilrehmandevelopment:QhbZPSMqxYnesH9w@mytodo.sezxnbe.mongodb.net/todosDB?retryWrites=true&w=majority", {useNewUrlParser : true}).then(() => console.log("connected to MongoDB"));


const todoSchema = new mongoose.Schema ({
	name : String
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", async (req, res) => {
	// console.log(todos);
	const todos = await Todo.find({});
	res.render("index.ejs", { todos });
});

app.post("/", async (req, res) => {
	// todos.push(req.body.task);
	const newTodo = new Todo({
		name: req.body.task
	});
    
	//Adding data to newTodo
	await newTodo.save();
	res.redirect("/");
});

// api to delete a todo (to be called from client side)
app.delete('/todos/:id', async (req, res) => {
	const todoId = req.params.id;
	console.log(todoId);

	try {
		const deleted = await Todo.findOneAndDelete({
			_id: todoId
		});

		res.json(deleted);
	} catch (error) {
		res.json({
			error: "Could not delelte the todo"
		});
	}
});

app.listen(port, () => {
	console.log("Server started on " + port);
});
