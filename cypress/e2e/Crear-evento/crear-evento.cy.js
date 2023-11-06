

describe('Crear Evento', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/eventos')
  })

  it('Prueba 1: Verificar que aparece la cabecera "Mis Eventos" ', () => {
    
    cy.get('h1').should('have.text', 'Mis Eventos')

  })


  it('Prueba 2: Verificar que al pinchar en el botón Crear Evento se abre un el modal', () => {
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();

    // Comprobar que se abre el modal de Crear Evento
    cy.get('#modalCrear').should('be.visible');
  })

  it('Prueba 3: Rellenar el modal y crear el evento', () => {

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

  })

})
