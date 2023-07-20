const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.json({ message: `server listening on port ${port}` });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});