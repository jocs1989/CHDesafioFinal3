import { Router } from "express";
import users from "../presistencia/dao/user/index.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { validateUser } from "../middleware/schemas/schema.user.js";
import { validateUserResponse } from "../middleware/schemas/schema.user.js";
import { ConnectionClosedEvent } from "mongodb";
import bcrypt from "bcrypt";
import config from "../config/index.js";
import Client from  'twilio';
import config from '../config/index.js'
import {createTransport} from 'nodemailer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
const accountSid = config.TWILIO.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO.TWILIO_AUTH_TOKEN;
const numberPhone =config.TWILIO.TWILIO_PHONE_NUMBER;
const client=Client(accountSid,authToken) 
router.get("/", async (req, res, next) => {
  try {
    res.status(200).render("partials/registrar", { acceso: "usuario creado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

function twilo(usuario){
  client.messages
  .create({
     from: `whatsapp:${numberPhone}`,
     body: `Solicito acceso el usuario :${usuario}`,
     to: 'whatsapp:+525541362155'
   })
  .then(message => {
    console.log("Mensaje enviado")
    console.log(message.sid);});
  res.status(200).render("partials/login", { acceso: "usuario creado" });
}

async function gmail(asunto,msg){
  try{
  const options= {
    host:'smtp.gmail.com',
    port:587,
    auth:{
      user:config.GMAIL.MAIL,
      pass:config.GMAIL.PASSWORD
    }
  }
  const trasporter =createTransport(options)
  const mailOptions ={
    from:'analistasin40@gmail.com',
    to:'analistasin40@gmail.com',
    subject:asunto,
    html:msg
  }
  const info = await trasporter.sendMail(mailOptions)
  console.log(info)
  }catch (err){
    console.log(err)

  }
}


router.post("/", validateUser(), async (req, res, next) => {
  try {
    
    const usuario = {
      nombre: req.body.nombre,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      direccion:req.body.direccion,
      edad:req.body.edad,
      phone:req.body.phone,
      role: req.body.role,
    };
    
    const existe = await users.getUsuario(usuario);
    console.log('Entro')
    if (existe) {
      res.status(400).render({ acceso: "El usuario ya existe" });
    } else {
      
      let pictureFile = req.files.file;
      usuario.urlImg =`${__dirname}/../file/${pictureFile.name}`

    pictureFile.mv(`${__dirname}/../file/${pictureFile.name}`, async (err) => {
      if (err) return res.status(500).send({ message: err });

      await users.saveUser(usuario);
      delete usuario.password;
      console.log("Enviando mensaje")
      twilo(usuario)

     
    });
      
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

//borrar todo derivado de que no se necesita
gmail('Prueba node','Hola')
export default router;
