// Importando el router de express
import { Router } from 'express';

// Importando el controlador de la Home
import homeController from './home.controller';

// Creando una instancia del enroutador
const router = new Router();

// Agregando las rutas

// Get "/"
// Get "/index"
// Get "/home"
router.get(['/', '/home', '/index'], homeController.home);

// GET '/about
router.get('/about', homeController.about);

// Exportando el router
export default router;
