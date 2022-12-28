
import session  from "express-session";
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import config from "./index.js"
const advancedOptions= {useNewUrlParser: true,
    useUnifiedTopology:true
}

const option = {
    store:MongoStore.create({
        mongoUrl:config.MONGO_DB.usiSession,
        mongoOptions:advancedOptions
    }),
    secret:"supersecreto",
    resave:false,
    saveUninitialized:false,
    
}
//config.SECRET
function managerSession(app){
    app.use(cookieParser())
    app.use(session(option))
}

export default   managerSession;