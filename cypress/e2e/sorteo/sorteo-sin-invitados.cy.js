const { anadirEventoPrueba, eliminarEvento } = require("../aux-funciones");

describe("Intentar crear un sorteo de un evento sin invitados", () => {
    const nombreEvento = "Test Sorteo - Sin invitados";
    var docReference;

    beforeEach(() => {
        docReference = anadirEventoPrueba(nombreEvento).then(
            (result) => (docReference = result)
        );
        cy.visit("http://localhost:3000/eventos");
    });

    afterEach(() => {
        eliminarEvento(docReference.id);
    });

    it("Intentar crear un sorteo de un evento sin invitados", () => {
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent();
        ultimoEvento.contains("button", "Sorteo").click();

        cy.contains("No hay invitados en este evento");
    });
});
