import { loggerErr, loggerInfo } from "../middleware/logger/logger.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const info = {
      WorkDirectory: process.cwd(),
      ID: process.pid,
      VesionNode: process.version,
      TitleProceso: process.titles,
      SO: process.platform,
      Memory: process.memoryUsage(),
    };

    res.status(200).json({ info: info });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});
export default router;
