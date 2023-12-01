import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones";


describe('Comprobar que se borra un evento correctamente', () => {
    
      const nombreEvento = 'Test - Eliminar Evento Se elimina Evento'
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
})