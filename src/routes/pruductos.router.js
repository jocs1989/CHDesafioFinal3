import Productos from "../presistencia/dao/productos/index.js"
import { Router } from "express";
import express from "express";
import {isAdmin} from "../middleware/permisos.js"
import { faker } from "@faker-js/faker/locale/es_MX";
const router = Router();
const datosAgregados = {};
const articulos=Productos
router.get("/", async (req, res) => {
  try {
    const respuesta = await articulos.getAll();
    const getArticulos=respuesta.map(items=>{
      return {
      nombre:items.nombre,
      precio:items.precio,
      url:items.url
  }})
  
    //res.status(200).json(respuesta);
    //res.status(200).render('partials/productos',{artuculos: respuesta});
    
    res.status(200).render('partials/registro',{artuculos: getArticulos});
  } catch (err) {
    console.error(err);
    //res.status(400).json({ error: err.toString() });
    res.status(400).render('partials/error',{error: err.toString()});
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
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const codigo = req.body.codigo;
    const url = req.body.url;
    const precio = req.body.precio;
    const stock = Number(req.body.stock);
    const producto = { nombre, descripcion, codigo, url, precio, stock };

   

    //const valores = await articulos.save(producto);
    const valores = await articulos.save(generaProducto());
    res.status(200).json(valores);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const producto = req.body;
    producto.id = req.params.id;
    res.status(200).json(await articulos.updateById(producto));
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

function generaProducto(){
  let nombre = faker.commerce.product();
  const producto = {
    _id: faker.database.mongodbObjectId(),
    nombre,
    descripcion: faker.commerce.productDescription(),
    codigo: faker.commerce.price(1000, 5000, 0),
    url: faker.image.imageUrl(1234, 2345, nombre, true),
    precio: faker.commerce.price(100, 1000, 0),
    stock: faker.commerce.price(0, 100, 0),
    timestamp: Date.now(),
  };
  return producto
}
export default router;
