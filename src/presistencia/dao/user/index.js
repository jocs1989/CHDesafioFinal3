import config from "../../../config/index.js";
import { fileURLToPath } from "url";
import path from "path";

const MODO_BD = process.env.MODO_BD;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let usuario = null;
//depende del modo para 
if (config.MODO_BD.archivos === MODO_BD) {
  const Constructor = await import("./user.dao.archivo.js");
  usuario  = new Constructor.default(
    __dirname + "/../dao/productos/articulos.txt"
  );
}
if (config.MODO_BD.memoria == MODO_BD) {
  const Constructor = await import("./user.dao.memoria.js");
  usuario  = new Constructor.default();
}
if (config.MODO_BD.mongodb == MODO_BD) {
  const Constructor = await import("./user.dao.mongodb.js");
  usuario  = new Constructor.default();
}
if (config.MODO_BD.firebase == MODO_BD) {
  const Constructor = await import("./user.dao.firebase.js");
  usuario  = new Constructor.default();
}
export default usuario ; 