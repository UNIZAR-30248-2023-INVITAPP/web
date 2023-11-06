

describe('Comprobar que después de borrar un evento aparece uno menos en el DOM', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/eventos');
      });
      
  
    it('Prueba 1: Verificar que no haya eventos', () => {
      cy.get('li').should('not.exist')
    })
  
  
    it('Prueba 2: Crear 2 eventos', () => {
        // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type('Evento de Prueba 1');
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

    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();
    // Rellenar el nombre del evento
    cy.get('#nombre').type('Evento de Prueba 2');
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
    })

    it('Prueba 3: Comprobar que hay dos eventos y borrar uno de ellos', () => {
        cy.get('.list-group-item').should('have.length', 2); // Verifica que haya 5 elementos con la clase "mi-clase"

        cy.contains('button', 'Borrar').click()

        cy.contains('button', 'Eliminar').click()

        cy.wait(500)

        cy.get('.list-group-item').should('have.length', 1)

    })
})