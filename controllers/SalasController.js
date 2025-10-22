class SalasController {
  // Propiedades clave: nombre, capacidad

  agregar(req, res) {
    // Lógica para agregar una sala
    // TODO: Implementar lógica completa
    res.send('Agregar sala');
  }

  listar(req, res) {
    // Lógica para listar salas
    // TODO: Implementar lógica completa
    res.send('Listar salas');
  }

  obtener(req, res) {
    // Lógica para obtener una sala por ID
    // TODO: Implementar lógica completa
    res.send('Obtener sala por ID');
  }

  modificar(req, res) {
    // Lógica para modificar una sala
    // TODO: Implementar lógica completa
    res.send('Modificar sala');
  }

  eliminar(req, res) {
    // Lógica para eliminar una sala
    // TODO: Implementar lógica completa
    res.send('Eliminar sala');
  }
}

module.exports = new SalasController();