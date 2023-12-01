import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones"
describe('Comprobar que aparece un boton de modificar evento en cada evento', () => {
    
    const nombreEvento1 = "Test 1 - Boton modificar por evento"
    const nombreEvento2 = "Test 2 - Boton modificar por evento"
    const nombreEvento3 = "Test 3 - Boton modificar por evento"

    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })


    it('Prueba 1: Comprobar que me encuentro en la pantalla de eventos', () => {
        cy.get('h1').should('have.text', 'Mis Eventos')
    })

    it('Prueba 2: Crear 3 eventos', async () => {
      await anadirEventoPrueba(nombreEvento1)
      await anadirEventoPrueba(nombreEvento2)
      await anadirEventoPrueba(nombreEvento3)
    })


    it('Prueba 3: Comprobar que cada evento tiene un botón de modificar', () => {
        // Obtén todos los elementos <li> que representan eventos
        cy.get('li.list-group-item').each((evento) => {
          // Verifica que dentro de cada evento hay un botón de eliminar
          cy.wrap(evento).find('button.btn-warning').should('exist');
        });
    });

    it('Prueba 4: Eliminar todos los eventos', () => {
      eliminarEventoDom(nombreEvento1)
      cy.wait(500)
      eliminarEventoDom(nombreEvento2)
      cy.wait(500)
      eliminarEventoDom(nombreEvento3)
      cy.wait(500)
  });


})