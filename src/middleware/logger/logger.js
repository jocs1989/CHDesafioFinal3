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
            format:winston.format.simple()}),
        new winston.transports.File({
            name: __dirname+'/info-file',
            filename: 'filelog-info.log',
            level: 'info'})
        ]
    , exceptionHandlers:[
        new winston.transports.File({
            filename:__dirname+'/error.log',
            level:'error'})],
    
}

const logger = winston.createLogger(configInfo)

export default logger;