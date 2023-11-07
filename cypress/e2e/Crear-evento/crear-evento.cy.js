

describe('Crear Evento', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/eventos')
  })


  it('Prueba 1: Verificar que al pinchar en el botón Crear Evento se abre un el modal', () => {
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();

    // Comprobar que se abre el modal de Crear Evento
    cy.get('#modalCrear').should('be.visible');
  })

  it('Prueba 2: Rellenar el modal y crear el evento', () => {

    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type('Evento de Prueba');
    // Rellenar la fecha
    cy.get('#fecha').type('2025-12-31');
    // Rellenar la hora
    cy.get('#hora').type('21:30');
    //Rellenar la ubicacion
    cy.get('#ubicacion').type('Calle León XII');
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    // Esperar a que se ejecute la función asíncrona
    cy.wait(500)
    // Verificar que existe el evento con ese título
    cy.contains('Evento de Prueba').should('exist');

    // Eliminar el evento
    const etiqueta = cy.get('h5').contains('Evento de Prueba')
    const botones = etiqueta.parent().siblings()
    botones.find('.btn-danger').click()

    cy.contains('button', 'Eliminar').click();
  })

})
