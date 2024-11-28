const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const user = req.session?.user || { name: "Guest" };
  res.render("home", { name: user.name });
});

// GET Route to render the login page
app.get("/login", (req, res) => {
  // send a messages object (even empty) to avoid ReferenceError
  res.render("login", { messages: {} });
});

// POST Route to handle login logic
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Example: Validate login credentials
  if (!email || !password) {
    // Render the page with an error message if inputs are missing
    return res.render("login", {
      messages: { error: "Email and Password are required!" },
    });
  }

  // Example: Incorrect email/password handling
  if (email !== "test@example.com" || password !== "123456") {
    return res.render("login", {
      messages: { error: "Invalid email or password!" },
    });
  }

  // On successful login
  res.redirect("/dashboard");
});
app.get("/register", (req, res) => {
  res.render("register", { messages: {} }); // Send an empty messages object
});

app.post("/register", (req, res) => {
  // Handle validation
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.render("register", {
      messages: { error: "All fields are required!" },
    });
  }
  // Continue with registration logic
});

app.listen(3000);
