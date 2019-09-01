const router = require("express").Router(),
  connection = require("../database");

// Seleccionar una lista de consultorios
router.get("/", async (req, res) => {
  await connection.query("SELECT * FROM consultorios ", (err, result) => {
    if (err) {
      res.status(403).send({
        succes: false,
        message: "Error al realizar la consulta",
        error: err.sqlMessage
      });
    } else if (result.length === 0) {
      res.status(400).send({
        succes: false,
        message: "Sin registros para listar"
      });
    } else if (result.length > 0) {
      res.status(200).send({
        succes: true,
        message: "Operacion Exitosa",
        items: result
      });
    } else {
      res.status(400).send({
        succes: false,
        message: "Error al tratar de obtener el listado"
      });
    }
  });
});

// Seleccionar un consultorio por su id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await connection.query(
    "SELECT * FROM consultorios WHERE ID = ? ", [id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al realizar la consulta",
          error: err.sqlMessage
        });
      } else if (result.length === 0) {
        res.status(400).send({
          succes: false,
          message: "No existe registro asociado al id"
        });
      } else if (result.length === 1) {
        res.status(200).send({
          succes: true,
          items: result
        });
      } else {
        res.status(400).send({
          succes: false,
          message: "Error al realizar la consulta"
        });
      }
    }
  );
});

//Registro de un consultorio
router.post("/", async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const consultorio = {
    nombre,
    direccion,
    telefono
  };
  await connection.query(
    "INSERT INTO consultorios set ?",
    [consultorio],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al realizar la consulta",
          error: err.sqlMessage
        });
      } else {
        res.status(200).send({
          succes: true,
          message: "Registro creado correctamente",
          items: consultorio
        });
      }
    }
  );
});

//Actualizar registro consultorio
router.put("/", async (req, res) => {
  const { id, nombre, direccion, telefono } = req.body;
  const consultorio = {
    nombre,
    direccion,
    telefono
  };
  await connection.query(
    "UPDATE consultorios SET ? WHERE ID = ?",
    [consultorio, id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al actualizarel registro",
          error: err.sqlMessage
        });
      } else if (result.affectedRows === 0) {
        res.status(400).send({
          succes: false,
          message: "El id no tiene un registro asociado"
        });
      } else if (result.affectedRows === 1) {
        res.status(200).send({
          succes: true,
          message: "Registro actualizado correctamente",
          items: consultorio
        });
      }
    }
  );
});

//Eliminar registro consultorio
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await connection.query(
    "DELETE FROM consultorios WHERE ID = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(400).send({
          succes: false,
          message: "Error al tratar de eliminar el registro",
          error: err.sqlMessage
        });
      } else if (result.affectedRows === 0) {
        res.status(400).send({
          succes: false,
          message: "El id no esta relacionado con ningun registro"
        });
      } else if (result.affectedRows === 1) {
        res.status(200).send({
          succes: true,
          message: "registro eliminada correctamente",
          result: result
        });
      } else {
        res.status(400).send({
          succes: false,
          message: "Error al tratar de eliminar el registro"
        });
      }
    }
  );
});

module.exports = router;
