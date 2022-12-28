import apiRouter from './routes/index.js';
import express from 'express';
import { fileURLToPath } from "url";
import path from "path";
import managerViews from "./views/config.js"
import managerSession from "./config/session.js"

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

app.use('/static', express.static(__dirname + '/static')); //agrega metodos estaticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session
managerSession(app)

//views
managerViews(app)
//manager routes
apiRouter(app)





const PORT = process.env.PORT ||8080;
app.listen(PORT,()=>{
    
    console.log(`http://localhost:${PORT}/`)
})