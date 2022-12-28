import Mocks from "../utils/mocks/productos.mocks.js"
import { Router } from "express";
import express from "express";
import {isAdmin} from "../middleware/permisos.js"
const router = Router();
const datosAgregados = {};
const articulos =new Mocks()

router.get("/", async (req, res) => {
  try {
    const respuesta = await articulos.getAll();
    res.status(200).json(respuesta);
    //res.status(200).render('partials/productos',{artuculos: respuesta});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let result = await articulos.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {
      res.status(200).json({ articulo: await result });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
});

router.post("/", isAdmin, async (req, res) => {
  try {
   
 
    const valores = await articulos.save(producto);
    res.status(200).json(valores);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
   

    res.status(200).json(await articulos.updateById(req.params.id));
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).json(await articulos.deleteById(id));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});

export default router;
