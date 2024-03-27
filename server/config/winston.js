// Importando el core de winston
// y la funcion format de winston
import winston, { format } from 'winston';
import appRoot from 'app-root-path';

// Se desestructura funciones para realizar
// composicion del formato
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Se define un esquema de colores
// segun el gardo de severidad
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'mageta',
  debug: 'blue',
};

// Agregando el esquema de colosres winston
winston.addColors(colors);

// === Se crean las plantillas para los formatos ====
// Formato para consola
const myConsoleFormat = combine(
  // Agregando colores la formato
  colorize({ all: true }),
  // Agregando una etiqueta al log
  label({ label: '📣' }),
  // Agregando Fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Funcion de impreson
  printf(
    (info) =>
      `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`,
  ),
);

// Formato para los archivos
const myFileFormat = combine(
  // Quitando todo tipo de colorizacion
  format.uncolorize(),
  // Agregando fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Estableciendo la salida en formato Json
  prettyPrint(),
);

// Creando el objeto de opciones para cada transporte
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot.toString()}/server/logs/info.log`,
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'info',
    filename: `${appRoot.toString()}/server/logs/warn.log`,
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot.toString()}/server/logs/error.log`,
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
};

// Se crea instancia de logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // No finalizar en excepciones no manejadas
});

// Estableciendo un flujo de entrada que servira
// para interceptar el log de morgan
logger.stream = {
  write(message) {
    logger.info(message);
  },
};
// Exportando el objeto logger
export default logger;
