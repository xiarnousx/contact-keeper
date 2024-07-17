const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// connect db
connectDB();

// Init Middleware
app.use(express.json({ extended: true }));

app.get("/api/about", (req, res) => {
  res.json({ msg: "welcome to contact keeper API" });
});

//Define our routes:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

if (process.env.NOTE_ENV === "production") {
  // set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
