import { json, Router } from "express";
import {fork} from "child_process";

const router = Router();

router.get("/",async (req, res) => {
    const computo = fork("./src/utils/random.js")
    computo.send('Inicio el calculo')
    computo.on('message',resultadoJson=>{
        console.log(resultadoJson)
        res.end(resultadoJson)
    })
   
    
})

export default router;