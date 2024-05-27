import createError from 'http-errors';
// Importing winston logger
import log from './config/winston';
// Importando el enrutador Home
import homeRouter from './domains/home/home.router';
// Importando enrutador user
import userRouter from './domains/user/user.router';
// Imporntado enrutador project
import projectRouter from './domains/project/project.router';

// Funcion que agrega las rutas
const addRoutes = (app) => {
  // Agregando las rutas Home
  app.use('/', homeRouter);
   // Agregar el enrutado de user
   app.use('/user', userRouter);   
   // Agregado el enrutado de project
   app.use('/project', projectRouter);
  
   // 🚨Errores
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
  return app;
};

// Exportando la funcion de enrutado
export default { addRoutes };
