const opcionSchema=
   {
        nombre: { type: String, required: true, minlength: 2, maxlength: 15 },
        email: { type: String, required: true, minlength: 2, maxlength: 100 },
        password: { type: String, required: true, maxlength: 100 },
        role: { type: String, required: true, maxlength: 100 },
        timestamp: { type: Date, default: Date.now },
      }  

const Collection='Usuarios'

export  {opcionSchema,Collection}