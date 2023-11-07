import { anadirEventoPrueba, eliminarEvento } from "../aux-funciones";


describe('Comprobar que después de borrar un evento aparece uno menos en el DOM', () => {
    
      const nombreEvento = 'Test - Eliminar Evento'
      beforeEach(() => {
        cy.visit('http://localhost:3000/eventos');
      });
  
  
      it('Prueba 1: Eliminar el evento "Test - Eliminar Evento"', async () => {
        await anadirEventoPrueba(nombreEvento);

        cy.debug()


        const etiqueta = cy.get('h5').contains(nombreEvento)
        const botones = etiqueta.parent().siblings()
        botones.find('.btn-danger').click()
        
      })

      it('Prueba 2: Comprobar que ya no aparece dicho evento', () => {


      })
})