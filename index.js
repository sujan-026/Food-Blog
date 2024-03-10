import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    foodName: "Samosa",
    foodType: "Appetizer",
    description: "A popular Indian snack consisting of a triangular pastry shell filled with spiced potatoes, peas, and sometimes meat, which is then deep-fried until crispy.",
    author: "Spice Delight",
    date: "2023-08-01T15:30:00Z"
  },
  {
    id: 2,
    foodName: "Butter Chicken",
    foodType: "Main Course",
    description: "A classic North Indian dish made with marinated chicken cooked in a creamy tomato-based sauce, often flavored with butter, cream, and various spices.",
    author: "Spice Delight",
    date: "2023-08-01T15:30:00Z"
  },
  {
    id: 3,
    foodName: "Palak Paneer",
    foodType: "Vegetarian Dish",
    description: "A nutritious vegetarian curry made from pureed spinach (palak) and paneer (Indian cottage cheese), seasoned with garlic, ginger, and spices like garam masala.",
    author: "Spice Delight",
    date: "2023-08-01T15:30:00Z"
  },
  {
    id: 4,
    foodName: "Dosa",
    foodType: "South Indian Dish",
    description: "A thin, crispy crepe made from fermented rice and lentil batter, typically served with coconut chutney, sambar (a spicy lentil-based stew), and various fillings such as potatoes or paneer.",
    author: "Spice Delight",
    date: "2023-08-01T15:30:00Z"
  },
  {
    id: 5,
    foodName: "Gulab Jamun",
    foodType: "Dessert",
    description: "A popular Indian sweet made from milk solids (khoya) or condensed milk, shaped into round balls, deep-fried until golden brown, and then soaked in sugar syrup flavored with rose water, saffron, and cardamom.",
    author: "Spice Delight",
    date: "2023-08-01T15:30:00Z"
  }
];

let lastId = 5;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts)
})

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if(!post) return res.status(404).json({message: "No post found"});
  res.json(post);
})

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    foodName: req.body.foodName,
    foodType: req.body.foodType,
    description: req.body.description,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.foodName) post.foodName = req.body.foodName;
  if (req.body.foodType) post.foodType = req.body.foodType;
  if (req.body.description) post.description = req.body.description;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
