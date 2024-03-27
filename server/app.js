import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Importando dependencias webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import usersRouter from './routes/users';
import indexRouter from './routes/index';
// Importando la configuracion de webpack
import webpackConfig from '../webpack.dev.config';

import log from './config/winston';

import configTemplateEngine from './config/templateEngine';

const app = express();

// Obteniendo el modo de ejecucion de la app
const nodeEviroment = process.env.NODE_ENV || 'production';
// configurando el entorno de desarrollo
if (nodeEviroment === 'developement') {
  console.log('🛠️ Ejecutando en modo desarrollo');
  // Agregando el modo de ejecucion
  webpackConfig.mode = 'development';
  // Estableciendo el puerto
  webpackConfig.devServer.port = process.env.PORT;
  // Configurando el HMR
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Afrefar el plugin
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Generar el empaquetado
  const bundle = webpack(webpackConfig);
  // Agregando el middleware
  app.use(
    WebpackDevMiddleware(bundle, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  // Agregando el middleware de HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log('Ejecutando en modo de produccion');
}

// view egnime setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: log.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// servidor de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  log.info(`404 Pagina no encontrada 😒 ${req.originalUrl}`);
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
