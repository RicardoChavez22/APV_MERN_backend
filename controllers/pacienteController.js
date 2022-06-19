import e from "express";
import Paciente from "../models/Paciente.js";

const agregarPacientes = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};
const obtenerPacientes = async (req, res) => {
    const paciente = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(paciente);
};
const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'No encontrado'});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion No valida' });
    }
    res.json(paciente);
}
const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'No encontrado'});
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion No valida' });
    }
    //actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    try {
        const pacienteActaulizado = await paciente.save();
        res.json(pacienteActaulizado);
    } catch (error) {
        console.log(error);
    }
}
const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'No encontrado'});
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion No valida' });
    }

    try {
        await paciente.deleteOne();
        res.json({msg:"Paciente Eliminado"});
    } catch (error) {
        console.log(error);
    }
}
export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};