import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port: http://localhost:${PORT}`);
});
