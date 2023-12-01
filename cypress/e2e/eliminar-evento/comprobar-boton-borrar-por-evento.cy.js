import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones"

describe('Comprobar que aparece un boton de eliminar evento en cada evento', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })



    it('Prueba 1: Comprobar que me encuentro en la pantalla de eventos', () => {
        cy.get('h1').should('have.text', 'Mis Eventos')
    })

    it('Prueba 2: Crear 2 eventos', async () => {
      await anadirEventoPrueba("Test Eliminar Evento - Evento 1")
      await anadirEventoPrueba("Test Eliminar Evento - Evento 2")

  })

    it('Prueba 2: Comprobar que cada evento tiene un botón de borrar', () => {
        // Obtén todos los elementos <li> que representan eventos
        cy.get('li.list-group-item').each((evento) => {
          // Verifica que dentro de cada evento hay un botón de eliminar
          cy.wrap(evento).find('button.btn-danger').should('exist');
        });
    });

    
    it('Prueba 4: Eliminar todos los eventos creados', () => {
      eliminarEventoDom("Test Eliminar Evento - Evento 1")
      cy.wait(500)
      eliminarEventoDom("Test Eliminar Evento - Evento 2")
    });

})