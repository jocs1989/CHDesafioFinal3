
import {createTransport} from 'nodemailer';

async function gmail(asunto,msg){
  try{
  const options= {
    host:'smtp.gmail.com',
    port:587,
    auth:{
      user:"analistasin40@gmail.com",
      pass:"saeeyufwwcdqwsux"
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


//borrar todo derivado de que no se necesita
gmail('Prueba node','Hola')
