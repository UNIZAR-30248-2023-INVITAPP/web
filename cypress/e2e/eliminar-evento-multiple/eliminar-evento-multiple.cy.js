import { anadirEventoPrueba, eliminarEventoDom } from "../aux-funciones";


describe("Testing del borrado múltiple de eventos", () => {

    const eventoPrueba1 = "Test borrado multiple - Evento 1"
    const eventoPrueba2 = "Test borrado multiple - Evento 2"

    var docReference1
    var docReference2

    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");
    });

    it('Prueba 1: Se crean dos eventos', async () => {
        docReference1 = await anadirEventoPrueba(eventoPrueba1);
        docReference2 = await anadirEventoPrueba(eventoPrueba2)
    })

    it('Prueba 2: Se selecciona el primer evento creado y se elimina', () => {
        // Comprobar que el checkbox del evento creado aparece y lo chekeo
        cy.get(`#checkbox-${docReference1.id}`).should('exist').check();

        // Comprobar que el checkbox del evento creado aparece y lo chekeo
        cy.get(`#checkbox-${docReference2.id}`).should('exist').check();

        // Comprobar que ahora aparece un boton de borrado multiple en el DOM
        cy.get('#boton-borrado-multiple').should('exist').click();

        // Comprobar que se abre el modal de Crear Evento
        cy.get('#modalConfirmacionEliminarEventoMultiple').should('be.visible');

        // Seleccionar y hacer clic en el botón rojo de eliminar dentro del modal
        cy.get('#modalConfirmacionEliminarEventoMultiple button.btn-danger').click();

        cy.wait(1000)

    })

    it('Prueba 3: Verificar que no existe ninguno de los dos eventos eliminados', () => {
        cy.wait(500)
        // Comprobar que ya no existe ninguno de los eventos anteriores
        cy.get('.list-group-item').contains(eventoPrueba1).should('not.exist');
        cy.get('.list-group-item').contains(eventoPrueba2).should('not.exist');
    })

})