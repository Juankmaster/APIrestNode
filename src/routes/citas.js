const router = require("express").Router(),
  connection = require("../database");

//Seleccionar todas las citas
router.get("/", (req, res) => {
  connection.query("SELECT * FROM citas", (err, result, fields) => {
    if (err) {
      res.status(400).send({
        succes: false,
        message: "Error al realizar la consulta",
        error: err.sqlMessage
      });
    } else if (result.length === 0) {
      res.status(400).send({
        succes: false,
        message: "Sin registros para listar",
        result: result
      });
    } else if (result.length > 0) {
      res.status(200).send({
        succes: true,
        items: result
      });
    } else {
      res.status(400).send({
        succes: false,
        message: "Error al intentar obtener el listado"
      });
    }
  });
});

// Seleccionar cita por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await connection.query(
    "SELECT * FROM citas WHERE ID = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al comprobar el registro",
          error: err.sqlMessage
        });
      } else if (result.length === 0) {
        res.status(400).send({
          succes: false,
          message: "No existe registro asociado al ID"
        });
      } else if (result.length === 1) {
        res.status(200).send({
          succes: true,
          items: result
        });
      } else {
        res.status(400).send({
          succes: false,
          message: "Error al intentar consultar el registro"
        });
      }
    }
  );
});

//Registrar cita
router.post("/", async (req, res) => {
  const { medico_id, paciente_id, consultorio_id, fecha } = req.body;
  const cita = {
    medico_id,
    paciente_id,
    consultorio_id,
    fecha
  };
  await connection.query("INSERT INTO citas SET ?", [cita], (err, result) => {
    if (err) {
      res.status(400).send({
        succes: false,
        message: "Error al guardar el registro",
        error: err.sqlMessage
      });
    } else {
      res.status(200).send({
        succes: true,
        message: "Registro guardado correctamente",
        items: cita
      });
    }
  });
});

// Actualizar registro citas
router.put("/", async (req, res) => {
  const { id, medico_id, paciente_id, consultorio_id, fecha } = req.body;
  const cita = {
    medico_id,
    paciente_id,
    consultorio_id,
    fecha
  };
  await connection.query(
    "UPDATE citas SET ? WHERE ID = ?",
    [cita, id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al tratar de actualizar el registro",
          error: err.sqlMessage
        });
      } else if (result.affectedRows === 0) {
        res.status(400).send({
          succes: false,
          message: "El id del registro no es valido",
          result: result
        });
      } else if (result.affectedRows === 1) {
        res.status(200).send({
          succes: true,
          message: "registro actualizado correctamente",
          items: cita
        });
      }
    }
  );
});

// Eliminar regisro cita

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await connection.query(
    "DELETE FROM citas WHERE ID = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al tratar de actualizar el registro",
          error: err.sqlMessage
        });
      } else if (result.affectedRows === 0) {
        res.status(400).send({
          succes: false,
          message: "No hay registro asociado al ID"
        });
      } else if (result.affectedRows === 1) {
        res.status(400).send({
          succes: true,
          message: "registro eleiminado correctamente",
          result: result
        });
      } else {
        res.status(400).send({
          succes: false,
          message: "Error al intentar eliminar el registro"
        });
      }
    }
  );
});

module.exports = router;
