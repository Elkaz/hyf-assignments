import express from "express";
import snippetsRouter from "./api/src/routers/snippets.js";
import tagsRouter from "./api/src/routers/tags.js";
import searchRouter from "./api/src/routers/search.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/search", searchRouter);
app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
