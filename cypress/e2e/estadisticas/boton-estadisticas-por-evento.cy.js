import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones"
describe('Comprobar que aparece un boton de "Estadisticas" en cada evento', () => {
    
    const nombreEvento1 = "Test 1 - Botón estadistícas por evento"
    const nombreEvento2 = "Test 2 - Boton estadisticas por evento"

    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })


    it('Prueba 1: Comprobar que me encuentro en la pantalla de eventos', () => {
        cy.get('h1').should('have.text', 'Mis Eventos')
    })

    it('Prueba 2: Crear 2 eventos', async () => {
      await anadirEventoPrueba(nombreEvento1)
      await anadirEventoPrueba(nombreEvento2)
    })


    it('Prueba 3: Comprobar que cada evento tiene un botón de estadísticas', () => {
        // Obtén todos los elementos <li> que representan eventos
        cy.get('li.list-group-item').each((evento) => {
          // Verifica que dentro de cada evento hay un botón de "Estadísticas"
          cy.wrap(evento).find('button.btn-info').should('exist');
        });
    });

    it('Prueba 4: Comprobar que el botón lleva a la página de estadísticas y las muestra', () => {
      // Obtén todos los elementos <li> que representan eventos
      cy.get('li.list-group-item').first().find('button.btn-info').click()
      // Comprobar que se abre la pagina de estadísticas mirando la primera cabecera
      const etiqueta = cy.get('h1').should('contain', 'Estadísticas de ')

      const botones = etiqueta.siblings().contains("Sexo")
      //Mostramos estadísticas de "sexo"
      botones.click()

      //Comprobamos que muestra el contenido
      cy.get('h2').first().should('have.text', 'Diagrama de barras')
    });

    it('Prueba 5: Eliminar todos los eventos creados para prueba', () => {
      eliminarEventoDom(nombreEvento1)
      cy.wait(500)
      eliminarEventoDom(nombreEvento2)
      cy.wait(500)
  });
})