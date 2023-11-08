const {
    anadirEventoPrueba,
    eliminarEvento,
    anadirEventoPruebaConInvitado,
} = require("../aux-funciones");

describe("Realizar un sorteo para un evento con un unico invitado", () => {
    const nombreEvento = "Test Sorteo - Un invitado";
    const premio = "Batidora";
    var docReference;

    beforeEach(() => {
        docReference = anadirEventoPruebaConInvitado(nombreEvento).then(
            (result) => (docReference = result)
        );
        cy.visit("http://localhost:3000/eventos");
    });

    afterEach(() => {
        eliminarEvento(docReference.id);
    });

    it("Crear un sorteo para un evento con un unico invitado", () => {
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent();
        ultimoEvento.contains("button", "Sorteo").click();

        cy.contains("No hay invitados en este evento").should("not.exist");
        cy.contains("Número de candidatos: 1");
        cy.contains("Número de ganadores: 0");
        cy.contains("button", "Mostrar candidatos").click();

        // Rellenar el formulario
        // Rellenar el premio
        cy.get("#formPremio").type(premio);
        cy.contains("button", "Generar ganador").click();

        cy.wait(1000);

        cy.contains("button", "Mostrar ganadores").click();
        cy.get("#formPremio").clear();
        cy.contains(premio);
        cy.contains("No hay invitados en este evento").should("not.exist");
        cy.contains("Número de candidatos: 0");
        cy.contains("Número de ganadores: 1");
    });
});
