const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files
app.use(express.static(path.join(__dirname)));

// Serve specific folders for safety
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Other pages
app.get("/men", (req, res) => res.sendFile(path.join(__dirname, "men.html")));
app.get("/new-arrivals", (req, res) => res.sendFile(path.join(__dirname, "new-arrivals.html")));
app.get("/offers", (req, res) => res.sendFile(path.join(__dirname, "offers.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "contact.html")));

// 404 Fallback
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
