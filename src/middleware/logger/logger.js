import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configInfo = {
    level:'error',
    format:winston.format.json(),
    defoultMeta:{
        service:'user-service'
    },trasports:[
        
        new winston.transports.Console({
            level:'error',
            format:winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple())})
        ]
    , exceptionHandlers:[
        new winston.transports.File({
            filename:__dirname+'../../logs/error.log',
            level:'error'})],
    
}




export const loggerErr = winston.createLogger(configInfo)


export const loggerInfo = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      ),
    transports: [
      new winston.transports.File({
        filename: __dirname+ '../../logs/info.log',
        
        level: 'info',
        maxsize: 500
      })
    ]
  });
  


