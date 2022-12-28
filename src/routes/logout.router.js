import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import express from "express";
import users from "../presistencia/dao/user/index.js";
import { fileURLToPath } from "url";
import path from "path";
import { validateUserLogin } from "../middleware/schemas/schema.user.js";
import bcrypt from "bcrypt";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    
    const usuario = { email: username, password };
    const result = [await users.getUsuario(usuario)].map((item) => {
      return { hash: item.password, role: item.role, nombre: item.nombre };
    });
    
    if (result) {
      const acceso = await bcrypt.compare(
        usuario.password,
        String(result[0].hash)
      );
      if (acceso) {
        
       
        return cb (null,result)
      } else {
        return cb(null, false);
      }
    }
  })
);

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, {  username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

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
    successRedirect: "/api/usuario",
    failureRedirect: "/api/login",
  })
);

export default router;
