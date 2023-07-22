import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { count } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [];
app.get("/", (req, res) => {
	console.log(todos);
	res.render("index.ejs", { todos });
});

app.post("/", (req, res) => {
	todos.push(req.body.task);
	res.redirect("/");
});

app.listen(port, () => {
	console.log("Server started on " + port);
});
