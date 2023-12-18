const { anadirEventoPruebaDom, eliminarEventoDom } = require("../aux-funciones");

describe("Intentar crear un sorteo de un evento sin invitados", () => {
    const nombreEvento = "Test Sorteo - Sin invitados";

    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");
    });

    it("Añadir un evento", () => {
        anadirEventoPruebaDom(nombreEvento)
    });

    it("Intentar crear un sorteo de un evento sin invitados", () => {
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent()
            .parent()
            .parent();
        ultimoEvento.contains("button", "Sorteo").click();

        cy.contains("No hay invitados en este evento");
    });

    it("Eliminar un evento", () => {
        eliminarEventoDom(nombreEvento)
    });
});
