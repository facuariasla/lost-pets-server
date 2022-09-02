import * as express from "express";
import usersRoutes from "./routes/users.routes";
import petsRoutes from "./routes/pets.routes";
import * as cors from "cors";

const app = express();
app.use(express.static("dist"));
app.use(cors());
//midlewares

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(usersRoutes);
app.use(petsRoutes);

app.use('*', (req,res)=>{
  res.send('404 Not Found u.u')
})

export default app;
