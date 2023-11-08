import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones";


describe('Comprobar que se borra un evento correctamente', () => {
    
      const nombreEvento = 'Test - Eliminar Evento'
      beforeEach(() => {
        cy.visit('http://localhost:3000/eventos');
      });
  
  
      it('Prueba 1: Crear un evento', () => {
          anadirEventoPrueba(nombreEvento);
          cy.wait(1000)
      })

      it('Prueba 2: Eliminar el evento', () => {
          eliminarEventoDom(nombreEvento)
          cy.wait(500)
      })

      it('Prueba 3: Comprobar que dicho evento no aparece en el DOM', () => {
        // Verifica que no haya un evento con el nombre 'Evento'
        cy.get('.list-group-item').contains('h5', nombreEvento).should('not.exist');
      })
})