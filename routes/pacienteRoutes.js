import express from 'express';
const router = express.Router();
import {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}
    from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';


router
    .route("/")
    .post(checkAuth, agregarPacientes)
    .get(checkAuth, obtenerPacientes);
router
    .route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente) //Put es para actualizar
    .delete(checkAuth, eliminarPaciente); //Eliminar

export default router;