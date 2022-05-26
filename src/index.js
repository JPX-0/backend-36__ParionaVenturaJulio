import mainServer from "./main.js";
import minimist from "minimist";
import env from "../utils/config/env.config.js";
import { errorLogger } from "../utils/config/logger.config.js";

const args = minimist(process.argv.slice(2), {
  default: {
    PORT: env.PORT,
    mode: "fork",
    compression: true
  },
  alias: {
    p: "PORT",
    m: "mode",
    c: "compression"
  }
});
args.compression = args.compression === "false" ? false : args.compression === "true" ? true : args.compression;
if(env.MODE_CLUSTER) args.mode = "cluster";

if(args.compression === true || args.compression === false) {
  if(args.mode == "cluster") { // el servidor se inicia en modo CLUSTER.
    const { default: cluster } = await import("cluster");
    const { default: os } = await import("os");
    if(cluster.isPrimary) {
      for (let i = 0; i < os.cpus().length; i++) { cluster.fork(); }
      cluster.on("exit", (worker, code) => cluster.fork());
    } else mainServer(args);
  } else if(args.mode == "fork") mainServer(args); // el servidor se inicia en modo FORK.
  else {
    errorLogger.error(`The modality entered [${args.mode}] is not supported.`);
    throw new Error(`The modality entered [${args.mode}] is not supported.`);
  }
} else {
  errorLogger.error(`The modality entered [${args.compression}] is not supported.`);
  throw new Error(`The modality entered [${args.compression}] is not supported.`);
}

export { args };