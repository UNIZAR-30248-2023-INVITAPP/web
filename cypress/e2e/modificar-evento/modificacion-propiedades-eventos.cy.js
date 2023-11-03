describe('En esta prueba se modifican el nombre, fecha, hora y ubicacion de un evento', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })


    it('Prueba 1: Modificar el campo nombre del evento y comprobar que se ha cambiado', () => {
        cy.contains('button', 'Editar').first().click()

        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalModificar').should('contain', 'Modificar un evento');

        // Rellenar el nombre del evento
        cy.get('#nombre').clear().type('Evento modificado')
        cy.get('#fecha').type('2025-01-01');
        cy.get('#hora').type('22:30');

        cy.contains('button', 'Modificar evento').click()

        cy.wait(1000)

        cy.get('h5').filter((index, element) => {
          return element.textContent.trim() === 'Evento modificado';
        });

    })

    it('Prueba 2: Modificar la fecha y que se vea actualizada', () => {
        cy.contains('button', 'Editar').first().click()

        // Comprobar que se abre el modal de Modificar Evento
        cy.get('#modalModificar').should('contain', 'Modificar un evento');

        // Rellenar el nombre del evento
        cy.get('#fecha').type('2025-01-15');
        cy.get('#hora').type('22:30');

        cy.contains('button', 'Modificar evento').click()

        cy.wait(1000)

        cy.get('span.fw-light').filter((index, element) => {
          return element.textContent.trim() === '15 de enero de 2025';
        });
    })


    it('Prueba 3: Modificar la hora y comprobar que se ha cambiado', () => {
      cy.contains('button', 'Editar').first().click()

      // Comprobar que se abre el modal de Modificar Evento
      cy.get('#modalModificar').should('contain', 'Modificar un evento');

      // Rellenar fecha y nombre
      cy.get('#fecha').type('2025-01-01');
      cy.get('#hora').type('23:00');

      cy.contains('button', 'Modificar evento').click()

      cy.wait(1000)

      // Comprobar que se ha cambiado la hora
      cy.get('span.fw-light').filter((index, element) => {
        return element.textContent.trim() === '23:00';
      });
  })


  it('Prueba 4: Modificar la ubicacion y que se vea actualizada', () => {
    cy.contains('button', 'Editar').first().click()

    // Comprobar que se abre el modal de Modificar Evento
    cy.get('#modalModificar').should('contain', 'Modificar un evento');

    // Rellenar el nombre del evento
    cy.get('#fecha').type('2025-01-15');
    cy.get('#hora').type('22:30');
    cy.get('#ubicacion').clear().type('Calle Francisco Federico')

    cy.contains('button', 'Modificar evento').click()

    cy.wait(1000)

    // Comprobar que se ha modificado la ubicación
    cy.get('span.fw-light').filter((index, element) => {
      return element.textContent.trim() === 'Calle Francisco Federico';
    });
})


})