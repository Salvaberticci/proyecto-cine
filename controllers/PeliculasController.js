class PeliculasController {
  // Propiedades clave: titulo, duracion, anio

  agregar(req, res) {
    // Lógica para agregar una película
    // TODO: Implementar lógica completa
    res.send('Agregar película');
  }

  listar(req, res) {
    // Lógica para listar películas
    // TODO: Implementar lógica completa
    res.send('Listar películas');
  }

  obtener(req, res) {
    // Lógica para obtener una película por ID
    // TODO: Implementar lógica completa
    res.send('Obtener película por ID');
  }

  modificar(req, res) {
    // Lógica para modificar una película
    // TODO: Implementar lógica completa
    res.send('Modificar película');
  }

  eliminar(req, res) {
    // Lógica para eliminar una película
    // TODO: Implementar lógica completa
    res.send('Eliminar película');
  }
}

module.exports = new PeliculasController();