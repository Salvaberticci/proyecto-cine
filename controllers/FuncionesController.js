class FuncionesController {
  // Propiedades clave: id_pelicula, id_sala, fecha_hora

  agregar(req, res) {
    // Lógica para agregar una función
    // TODO: Implementar lógica completa
    res.send('Agregar función');
  }

  listar(req, res) {
    // Lógica para listar funciones
    // TODO: Implementar lógica completa
    res.send('Listar funciones');
  }

  obtener(req, res) {
    // Lógica para obtener una función por ID
    // TODO: Implementar lógica completa
    res.send('Obtener función por ID');
  }

  modificar(req, res) {
    // Lógica para modificar una función
    // TODO: Implementar lógica completa
    res.send('Modificar función');
  }

  eliminar(req, res) {
    // Lógica para eliminar una función
    // TODO: Implementar lógica completa
    res.send('Eliminar función');
  }
}

module.exports = new FuncionesController();