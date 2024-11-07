

const db = require('../config/db.config.js');
const Juego = db.Juego;

exports.create = (req, res) => {
    let juego = {};

    try {
        // Construir el objeto Juego desde el cuerpo de la solicitud
        juego.nombre_juego = req.body.nombre_juego;
        juego.genero = req.body.genero;
        juego.plataforma = req.body.plataforma;
        juego.fecha_lanzamiento = req.body.fecha_lanzamiento;
        juego.precio_alquiler = req.body.precio_alquiler;
        juego.disponibilidad = req.body.disponibilidad;
        juego.fecha_alquiler = req.body.fecha_alquiler;
        juego.fecha_devolucion = req.body.fecha_devolucion;
        juego.Nombre_cliente = req.body.Nombre_cliente;
        juego.Comentarios = req.body.Comentarios;

        // Guardar en la base de datos MySQL
        Juego.create(juego).then(result => {
            res.status(200).json({
                message: "Juego creado exitosamente con id = " + result.id_juego,
                juego: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.retrieveAll = (req, res) => {
    Juego.findAll()
        .then(juegos => {
            res.status(200).json({
                message: "Obtención exitosa de todos los juegos!",
                juegos: juegos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getById = (req, res) => {
    let juegoId = req.params.id;
    Juego.findByPk(juegoId)
        .then(juego => {
            res.status(200).json({
                message: "Obtención exitosa del juego con id = " + juegoId,
                juego: juego
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No se encontró el juego para actualizar con id = " + juegoId,
                juego: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_juego: req.body.nombre_juego,
                genero: req.body.genero,
                plataforma: req.body.plataforma,
                fecha_lanzamiento: req.body.fecha_lanzamiento,
                precio_alquiler: req.body.precio_alquiler,
                disponibilidad: req.body.disponibilidad,
                fecha_alquiler: req.body.fecha_alquiler,
                fecha_devolucion: req.body.fecha_devolucion,
                Nombre_cliente: req.body.Nombre_cliente,
                Comentarios: req.body.Comentarios
            };
            let result = await Juego.update(updatedObject, { returning: true, where: { id_juego: juegoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el juego con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Juego actualizado exitosamente con id = " + juegoId,
                juego: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el juego con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No existe un juego con id = " + juegoId,
                error: "404",
            });
        } else {
            await juego.destroy();
            res.status(200).json({
                message: "Juego eliminado exitosamente con id = " + juegoId,
                juego: juego,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el juego con id = " + req.params.id,
            error: error.message,
        });
    }
}
