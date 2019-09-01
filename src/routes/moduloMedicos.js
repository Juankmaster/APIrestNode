const router = require('express').Router(),
    connection = require('../database');


//Seleccionar todos los medicos (Consultar todo)

router.get('/', async (req, res) => {
    await connection.query('SELECT * FROM medicos', (err, result, filds) => {
        if (err) {
            //console.log(err);Basico
            res.status(400).send({
                succes: false,
                message: 'Error al realizar la consulta',
                error: err.sqlMessage

            });
        } else if (result.length === 0) {
            res.status(400).send({
                succes: false,
                message: 'Sin registros para listar',
                result: result
            });
        } else if (result.length > 0) {
            //res.json(result);Basica
            res.status(200).send({
                succes: true,
                items: result
            });
        } else {
            res.status(400).send({
                succes: false,
                message: 'Error al intentar obtener el listado'
            });
        }
    });
})

//Selecciona un medico por su id (Consultar por id)

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await connection.query('SELECT * FROM medicos WHERE id = ?', [id], (err, result, filds) => {
        if (err) {
            //console.log(err);Basica
            res.status(400).send({
                succes: false,
                message: 'Error al comprobar el registro',
                error: err.sqlMessage
            });
        } else if (result.length === 0) {
            res.status(400).send({
                succes: false,
                message: 'No existe registro asociado al id enviado',
                result: result
            });
            //res.json(result[0]);
        } else if (result.length === 1) {
            res.status(200).send({
                succes: true,
                items: result
            });
            
        } else {
            res.status(400).send({
                succes: false,
                message: 'Error al intentar consultar el registro'
           });
        }
    });
});

//Registro de medico (crear)

router.post('/', async (req, res) => {
    const { identificacion, nombres, apellidos } = req.body;
    medico = {
        identificacion,
        nombres,
        apellidos
    }
    await connection.query('INSERT INTO  medicos set ?', [medico], (err, results, filds) => {
        if (err) {
            // res.json({ Status: 'Medico guardado' });Basica
            res.status(400).send({
                succes: false,
                message: 'Error al guardar el registro',
                error: err.sqlMessage
            });
        } else {
            // console.log(err);basico
            res.status(200).send({
                succes: true,
                message: 'Registro guardado correctamente',
                items: medico
            });
        }
    });
})

//Actualizar registro de Medico (Actualizar)

router.put('/', async (req, res) => {
    // const {  } = req.params;
    const { id, identificacion, nombres, apellidos } = req.body;

    medico = {
        identificacion,
        nombres,
        apellidos
    }
    await connection.query('UPDATE medicos SET ? WHERE ID = ? ', [medico, id], (err, result, filds) => {

        if (err) {
            res.sendStatus(400).send({
                succes: false,
                message: "Error al tartar de actualizar el registro",
                error: err.sqlMessage
            });

            //res.json({ Status: 'Medico Actualizado' });basico
        } else if (result.affectedRows === 0) {
            res.status(400).send({
                succes: false,
                message: "El id del registro no existe",
                result: result
            });

        } else if (result.affectedRows === 1) {
            res.status(200).send({
                succes: true,
                message: "Registro actualizado correctamente",
                items: medico
            })
        }
    });
});

//Eliminar medico (Eliminar)

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM medicos WHERE ID = ?', [id], (err, result, filds) => {
        if (err) {
            res.status(400).send({
                succes: false,
                message: "Error al realizar la consulta",
                error: err.sqlMessage
            })
        } else if (result.affectedRows === 1) {
            res.status(200).send({
                succes: true,
                message: "Registro eliminado con exito",
                result: result
            })
        } else if (result.affectedRows === 0) {
            res.status(400).send({
                succes: false,
                message: "No existe registro asociado al id:" + id
            });
        } else {
            res.status(400).send({
                succes: false,
                message: "Error al intentar borrar el registro"
            })

        }
    });
});


module.exports = router;