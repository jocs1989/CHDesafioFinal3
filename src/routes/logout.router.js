import { Router } from "express";
import users from "../presistencia/dao/user/index.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { validateUserLogin } from "../middleware/schemas/schema.user.js";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
router.get("/", async (req, res, next) => {
  try {
    res.status(200).render("partials/login", {});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});
router.post("/", validateUserLogin(), async (req, res, next) => {
  try {
    const usuario = {
      email: req.body.email,
      password: req.body.password,
    };
    const existe = [await users.getUsuario(usuario)];

    if (existe) {
      //map
      const resultado = existe.map((item) => {
        return {hash:item.password,role:item.role,nombre:item.nombre}
      });
     
      bcrypt.compare(usuario.password, String(resultado[0].hash), function (err, result) {
        
        if (err) {
          res
            .status(400)
            .render("partials/error", { error: "Revisa tus datos" });
        }
        //si existe
        if (result) { // valid password
          
         if(resultado[0].role=="admin"){
          req.session.administrador=true;
         }else{
          req.session.administrador=false
         }
          
          req.session.email=usuario.email
          req.session.name=resultado[0].nombre
          res.status(200).render("partials/usuario", { usuario:resultado[0] });
        } else {
          // not valid to password 
          res
            .status(400)
            .render("partials/error", { error: "Revisa tus datos" });
        }

        
      });
    } else {// no existe
      res.status(400).render("partials/error", { error: "Revisa tus datos" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).render("partials/error", { error: err });
  }
});

export default router;
