import app from "./app";
import * as path from "path";

const port = process.env.PORT || 4000;
// const staticDirPath = path.resolve(__dirname, "../client");
async function main(){
  try {
    app.listen(port);
    console.log('API listening on port', port)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main()