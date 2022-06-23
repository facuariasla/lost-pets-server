import * as express from "express";
import usersRoutes from "./routes/users.routes";
import petsRoutes from "./routes/pets.routes";
import * as cors from "cors";
import * as path from "path";

const app = express();
app.use(express.static("dist"));
app.use(cors());
//midlewares

// Handlear el 404 visualmente en otro html
app.use('*', (req,res)=>{
  res.send('404 Not Found u.u')
})

// const rutaRelativa = path.resolve(__dirname, "../../dist/", "index.html");
// app.get("*", (req, res) => {
//   res.sendFile(`${rutaRelativa}`);
// });

// Images limited to 5mb
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(usersRoutes);
app.use(petsRoutes);



export default app;
