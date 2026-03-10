import app from "./app.js";
import {PORT} from "./config/env.js";
import connectDataBase from "./database/database.js";



connectDataBase();

app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}/`);
});