import { Router } from "express";
import users from "../presistencia/dao/user/index.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { validateUser } from "../middleware/schemas/schema.user.js";
import { validateUserResponse } from "../middleware/schemas/schema.user.js";
import { ConnectionClosedEvent } from "mongodb";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
router.get("/", async (req, res, next) => {
  try {
    res.status(200).render("partials/registrar", { acceso: "usuario creado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

router.post("/", validateUser(), async (req, res, next) => {
  try {
    const usuario = {
      nombre: req.body.nombre,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      role: req.body.role,
    };
    const existe = await users.getUsuario(usuario);
    if (existe) {
      res.status(400).render({ acceso: "El usuario ya existe" });
    } else {
      await users.saveUser(usuario);
      res.status(200).render("partials/login", { acceso: "usuario creado" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

//borrar todo derivado de que no se necesita

export default router;
