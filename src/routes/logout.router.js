import { Router } from "express";
import passport from "passport";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { validateUserLogin } from "../middleware/schemas/schema.user.js";
import {configPassport,result} from "../middleware/loggin/passport.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

configPassport(passport)
router.get("/", async (req, res, next) => {
  try {
    res.status(200).render("partials/login", {});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});
router.post(
  "/",
  validateUserLogin(),
  passport.authenticate("local", {
    
    failureRedirect: "/api/login",
  }),async (req, res, next) => {

    if(result[0].role=="admin"){
      req.session.administrador=true;
     }else{
      req.session.administrador=false
     }
      
      req.session.email=result[0].email
      req.session.name=result[0].nombre
      res.status(200).render("partials/usuario", { usuario:result[0] });
  }
);

export default router;
