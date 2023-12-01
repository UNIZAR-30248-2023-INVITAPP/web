import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones"

describe('En esta prueba se modifican el nombre, fecha, hora y ubicacion de un evento', () => {

    const nombreEvento = 'Test - Evento a modificar'
    const nombreEventoModificado = 'Test - Evento modificado'

    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })


    it('Prueba 1: Crear evento', async () => {
      await anadirEventoPrueba(nombreEvento)
    })

    it('Prueba 2: Modificar el campo nombre del evento y comprobar que se ha cambiado', () => {

        const etiqueta = cy.get('h5').contains(nombreEvento)
        const botones = etiqueta.parent().siblings()
        botones.find('.btn-warning').click()
      
        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalModificar').should('contain', 'Modificar un evento');

        // Rellenar el nombre del evento
        cy.get('#nombre').clear().type(nombreEventoModificado)
        cy.get('#fecha').type('2025-01-01');
        cy.get('#hora').type('22:30');

        cy.get('button.btn-dark').contains('Modificar Evento').click()

        cy.wait(1000)

        cy.get('h5').contains(nombreEventoModificado)
        
    })

    it('Prueba 3: Modificar la fecha y que se vea actualizada', () => {
        
        const etiqueta = cy.get('h5').contains(nombreEventoModificado)
        const botones = etiqueta.parent().siblings()
        botones.find('.btn-warning').click()

        // Comprobar que se abre el modal de Modificar Evento
        cy.get('#modalModificar').should('contain', 'Modificar un evento');

        // Rellenar el nombre del evento
        cy.get('#fecha').type('2025-01-15');
        cy.get('#hora').type('22:30');

        cy.get('button.btn-dark').contains('Modificar Evento').click()

        cy.wait(1000)

        cy.get('span.fw-light').filter((index, element) => {
          return element.textContent.trim() === '15 de enero de 2025';
        });
    })


    it('Prueba 4: Modificar la hora y comprobar que se ha cambiado', () => {
      const etiqueta = cy.get('h5').contains(nombreEventoModificado)
      const botones = etiqueta.parent().siblings()
      botones.find('.btn-warning').click()

      // Comprobar que se abre el modal de Modificar Evento
      cy.get('#modalModificar').should('contain', 'Modificar un evento');

      // Rellenar fecha y nombre
      cy.get('#fecha').type('2025-01-01');
      cy.get('#hora').type('23:00');

      cy.get('button.btn-dark').contains('Modificar Evento').click()

      cy.wait(1000)

      // Comprobar que se ha cambiado la hora
      cy.get('span.fw-light').filter((index, element) => {
        return element.textContent.trim() === '23:00';
      });
  })


  it('Prueba 5: Modificar la ubicacion y que se vea actualizada', () => {
    const etiqueta = cy.get('h5').contains(nombreEventoModificado)
    const botones = etiqueta.parent().siblings()
    botones.find('.btn-warning').click()

    // Comprobar que se abre el modal de Modificar Evento
    cy.get('#modalModificar').should('contain', 'Modificar un evento');

    // Rellenar el nombre del evento
    cy.get('#fecha').type('2025-01-15');
    cy.get('#hora').type('22:30');
    cy.get('#ubicacion').clear().type('Calle Francisco Federico')

    cy.get('button.btn-dark').contains('Modificar Evento').click()

    cy.wait(1000)

    // Comprobar que se ha modificado la ubicación
    cy.get('span.fw-light').filter((index, element) => {
      return element.textContent.trim() === 'Calle Francisco Federico';
    })
  })

  it('Eliminar el evento de prueba', () => {
      eliminarEventoDom(nombreEventoModificado)
      cy.wait(500)
  })
})