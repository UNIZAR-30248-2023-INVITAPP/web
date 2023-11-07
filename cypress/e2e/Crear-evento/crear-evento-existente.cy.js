import { anadirEventoPrueba, eliminarEvento } from "../aux-funciones";


describe('Crear un evento con las mismas propiedades que otro existente', () => {
  var docReference

  beforeEach(async () => {
    docReference = await anadirEventoPrueba('Test - Crear evento existente');
    cy.visit('http://localhost:3000/eventos');
    cy.wait(500)
  })

  afterEach(async () => {
    await eliminarEvento(docReference.id);
  })


  it('Prueba 1: Crear un evento con las mismas propiedades que uno creado', () => {

    const nombre = 'Test - Crear Evento existente'
    
    // Rellenar la fecha
    const fechaUnDiaDespues = new Date();
    fechaUnDiaDespues.setDate(fechaUnDiaDespues.getDate() + 1);

    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaUnDiaDespuesFormateada = `${fechaUnDiaDespues.getFullYear()}-${String(
        fechaUnDiaDespues.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaUnDiaDespues.getDate()).padStart(
        2,
        "0"
    )}`;

    const hora = '00:00'
    const ubicacion = 'Ubicacion de prueba'
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type(nombre);


    // Rellenar la fecha
    cy.get('#fecha').type(fechaUnDiaDespuesFormateada)
    // Rellenar la hora
    cy.get('#hora').type(hora);
    //Rellenar la ubicacion
    cy.get('#ubicacion').type(ubicacion);
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    // Verificar que salta el error a la hora de crear el evento
    cy.contains('Ya existe un evento con esas propiedades').should('exist')
  })

})
