
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let blogs = [
    {
        id: uuidv4(),
        username: "Zoya",
        title:"fitness",
        content: "I worked out for 1 hour",
    },
    {
        id: uuidv4(),
        username: "Angadh",
        title:"fitness",
        content: "I bought gym equipment",
    },
    {
        id: uuidv4(),
        username: "Steven",
        title:"fitness",
        content: "I go to the gym every day",
    },
];

app.get("/blogs", (req, res) => {
    res.render("index.ejs", { blogs: blogs });
});

app.post("/blogs", (req, res) => {
    let { username,title, content } = req.body;
    let id = uuidv4();
    blogs.push({ id, username, title,content });
    res.redirect("/blogs");
});

app.get("/blogs/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/blogs/:id", (req, res) => {
    let { id } = req.params;
    let blog = blogs.find((p) => id === p.id);
    res.render("details.ejs", { blog });
});
 
app.patch("/blogs/:id",(req,res)=>{
let {id}=req.params;
let newtitle=req.body.title;
let newContent=req.body.content;
let blog = blogs.find((p) => id === p.id);
blog.title=newtitle;
blog.content=newContent;
res.redirect("/blogs");
});

app.get("/blogs/:id/edit", (req, res) => {
    let { id } = req.params;
    let blog = blogs.find((p) => id === p.id);
    res.render("edit.ejs", { blog });
    res.redirect("/blogs");
});

app.delete("/blogs/:id",(req,res)=>{
    let { id } = req.params;
    blogs= blogs.filter((p) => id !== p.id);
    res.redirect("/blogs");
  
});
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
