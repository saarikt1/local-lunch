import express from "express"
import { logger } from "./logger"
import { createHttpTerminator } from "http-terminator"

function init() {
  const app = express()

  app.get("/", (_req, res) => {
    res.json("Hello Lunch World!")
  })

  const server = app.listen(3001, () => {
    logger.info(server.address(), "Server listening")
  })

  const httpTerminator = createHttpTerminator({ server })

  const shutdown = async (signal: string) => {
    logger.info({ signal }, "Starting graceful shutdown sequence")
    await httpTerminator.terminate()
    logger.info("Graceful shutdown sequence finished")
    process.exit(0)
  }

  // Nodemon sends `SIGUSR2` when restarting the server while sending ctrl-c to `npm run dev` sends `SIGINT`.
  for (const signal of ["SIGTERM", "SIGUSR2", "SIGINT"])
    process.on(signal, shutdown)

  return server
}

init()
