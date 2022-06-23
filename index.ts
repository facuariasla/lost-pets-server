import app from "./app";

const port = process.env.PORT || 4000;

async function main(){
  try {

    app.listen(port);
    console.log('API listening on port', port)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main()