

describe('Crear un evento con las mismas propiedades que otro existente', () => {
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

  it('Prueba 2: Crear un evento con nombre "Test - Crear Evento existente" ', () => {
    
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type('Test - Crear Evento existente');
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
    cy.contains('Test - Crear Evento existente').should('exist');

  })


  it('Prueba 3: Intentar crear otro evento con las mismas características y comprobar el error', () => {

    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type('Test - Crear Evento existente');
    // Rellenar la fecha
    cy.get('#fecha').type('2025-12-31');
    // Rellenar la hora
    cy.get('#hora').type('21:30');
    //Rellenar la ubicacion
    cy.get('#ubicacion').type('Calle León XII');
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    // Verificar que salta el error a la hora de crear el evento
    cy.contains('Ya existe un evento con esas propiedades').should('exist')
  })

})
