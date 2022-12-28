
import session  from "express-session";
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import config from "./index.js"
import passport from "passport";
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
    app.use(passport.initialize());
    app.use(passport.session());    
}

export default   managerSession;