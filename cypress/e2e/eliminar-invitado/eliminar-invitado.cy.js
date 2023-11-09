import {
    anadirEventoPrueba,
    anadirEventoPruebaConInvitado,
    eliminarEvento,
} from "../aux-funciones";

describe("Eliminar un invitado", () => {
    const nombreEvento = "Test Invitado - Eliminar un invitado";
    var docReference;

    beforeEach(() => {
        docReference = anadirEventoPruebaConInvitado(nombreEvento).then(
            (result) => (docReference = result)
        );
        cy.visit("http://localhost:3000/eventos");
    });

    afterEach(async () => {
        await eliminarEvento(docReference.id);
    });

    it("Eliminar un invitado", () => {
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent();
        ultimoEvento.contains("button", "Invitados").click();
        // Comprobar que no aparece el mensaje de que hay invitados
        cy.contains("Aun no hay invitados para este evento").should(
            "not.exist"
        );

        // Comprobar que aparece el modal de eliminar invitado
        const listainvitados = cy.get("#modalListaInvitado");
        // Pulsar el boton de eliminar
        listainvitados.contains("button", "Eliminar").click();

        // Comprobar que aparece el modal de eliminar invitado
        const modal = cy.get("#modalConfirmarEliminacion");
        modal.contains("button", "Eliminar").click();

        // Comprobar que se ha eliminado
        cy.contains("Aun no hay invitados para este evento").should("exist");
    });

    it("Intentar eliminar un invitado pero cancelar en el modal", () => {
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent();
        ultimoEvento.contains("button", "Invitados").click();
        // Comprobar que no aparece el mensaje de que hay invitados
        cy.contains("Aun no hay invitados para este evento").should(
            "not.exist"
        );

        // Comprobar que aparece el modal de eliminar invitado
        const listainvitados = cy.get("#modalListaInvitado");
        // Pulsar el boton de eliminar
        listainvitados.contains("button", "Eliminar").click();

        // Comprobar que aparece el modal de eliminar invitado
        const modal = cy.get("#modalConfirmarEliminacion");

        // Comprobar que aparece el modal de eliminar invitado
        modal.contains("button", "Cancelar").click();

        // Comprobar que se ha eliminado
        cy.contains("Aun no hay invitados para este evento").should(
            "not.exist"
        );
    });
});
