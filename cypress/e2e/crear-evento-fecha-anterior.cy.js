describe('Crear evento con una fecha anterior a la actual', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/eventos')
  })

  it('Prueba 1: Verificar que estoy en la pantalla de Mis Eventos', () => {
    cy.get('h1').should('have.text', 'Mis Eventos')
  })

  it('Prueba 2: Abrir el modal y rellenar los campos con una fecha anterior', () => {
      // Pinchar en el modal para crear Evento
      cy.contains('button', 'Crear Evento').click();

      // Comprobar que se abre el modal de Crear Evento
      cy.get('#modalCrear').should('be.visible');

      // Rellenar el nombre del evento
      cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');
      // Rellenar la fecha
      cy.get('#fecha').type('2020-12-31');
      // Rellenar la hora
      cy.get('#hora').type('21:30');
      //Rellenar la ubicacion
      cy.get('#ubicacion').type('Calle Maria Moliner, 25');
      // Crear Evento
      cy.get('#boton-crear-evento').click()

      // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
      cy.contains('La fecha del evento tiene que ser posterior a la fecha actual').should('exist');

      
  })
})