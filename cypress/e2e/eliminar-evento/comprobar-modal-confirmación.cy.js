describe("Comprobar que aparece modal confirmación en la eliminación del evento", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");
    });

    it('Prueba 1: Verificar que aparece la cabecera "Mis Eventos" ', () => {
        cy.get("h1").should("have.text", "Mis Eventos");
    });

    it("Prueba 2: Verificar que al pinchar en el botón de eliminar evento aparece un modal de confirmación", () => {
        // Pinchar en el boton 'Borrar' para eliminar el evento
        cy.contains("button", "Eliminar").click();

        // Comprobar que se abre el modal de Confirmacion
        cy.get("#modalConfirmar", { timeout: 10000 }).should("be.visible");
    });
});
