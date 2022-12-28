import ClassChat from "../presistencia/dao/chat/index.js";
import { Router } from "express";
import express from "express";
import { isAdmin } from "../middleware/permisos.js";
import { normalize,denormalize } from 'normalizr';
import NormalizarChat from '../utils/normalizer/normalizer.chat.models.js'
const router = Router();
const datosAgregados = {};
const chat = ClassChat;
router.get("/", async (req, res) => {
  try {
    const respuesta = await chat.getAll();
    
   
      
    res.status(200).json(respuesta );
    //res.status(200).render('partials/productos',{artuculos: respuesta});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let result = await chat.getById(id);
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
    const idChat = req.body.idChat;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const edad = req.body.edad;
    const alias = req.body.alias;
    const avatar = req.body.avatar;
    const msg = req.body.msg;
    const autor = { idChat, nombre, apellido, edad, alias, avatar };
    let registro= await chat.get({ autor: autor });
    if(registro ){
      
      await chat.setAddMsg(registro._id,{text: [{msg}]});
      res.status(200).json(registro._id);
    }else{
      
      const valores = await chat.save({ autor: autor, text: [{ msg: msg }] })
      let registro= await chat.get({ autor: autor });
      res.status(200).json(registro._id);
    }
    //;
   

    
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});



router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).json(await chat.deleteById(id));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});

export default router;
