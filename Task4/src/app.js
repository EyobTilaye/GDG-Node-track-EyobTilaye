import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";




const app = express();


//Middleware
app.use(express.json());

//Routes
app.use("/books",bookRoutes);

//error handling 
app.use(errorHandler);

export default app;







