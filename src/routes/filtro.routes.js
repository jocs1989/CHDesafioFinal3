import  { Router } from'express';
import   express  from'express';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router(); 
router.all("*", (req, res) => {
    res
      .status(400)
      .json({
        error: `-2,descripcion:  ruta ${req.url} método ${req.method}  no implementada`,
      });
  });
  

export default router;