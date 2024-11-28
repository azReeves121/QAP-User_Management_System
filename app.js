const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const user = [];

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const user = req.session?.user || { name: "Guest" };
  res.render("home", { name: user.name });
});

// GET Route to render the login page
app.get("/login", (req, res) => {
  // send a messages object to avoid ReferenceError
  res.render("login", { messages: {} });
});

// POST Route to handle login logic
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate login credentials
  if (!email || !password) {
    // Render the page with an error message if inputs are missing
    return res.render("login", {
      messages: { error: "Email and Password are required!" },
    });
  }

  //  Incorrect email/password handling
  if (email !== "test@example.com" || password !== "123456") {
    return res.render("login", {
      messages: { error: "Invalid email or password!" },
    });
  }

  // On successful login
  res.redirect("/dashboard");
});
app.get("/register", (req, res) => {
  res.render("register", { messages: {} });
});

app.post("/register", async (req, res) => {
  // Handle validation
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.hashedPassword,
    });
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

app.listen(3000);
