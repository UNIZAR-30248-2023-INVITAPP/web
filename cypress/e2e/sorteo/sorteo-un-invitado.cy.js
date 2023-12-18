const {
    anadirEventoPruebaDom,
    eliminarEventoDom,
    anadirEventoPruebaConInvitado,
} = require("../aux-funciones");

describe("Realizar un sorteo para un evento con un unico invitado", () => {
    const nombreEvento = "Test Sorteo - Un invitado";
    const premio = "Batidora";

    beforeEach(() => {
        cy.visit("http://localhost:3000/eventos");
    });

    it("Añadir un invitado", () => {
        anadirEventoPruebaDom(nombreEvento)

        const nombreInvitado = "Nombre invitado";
        const DNIInvitado = "12345678Z";
        const emailInvitado = "prueba@correo.es";
        const genero = "Femenino";
        // Comprobar que no hay invitados
        const ultimoEvento = cy
            .get(".list-group")
            .children()
            .contains(nombreEvento)
            .parent()
            .parent()
            .parent()
            .parent();
        ultimoEvento.contains("button", "Invitados").click();
        // Comprobar que no hay invitados
        cy.contains("Aun no hay invitados para este evento");

        // Rellenar el formulario
        // Rellenar el nombre del invitado
        cy.get("#formNombre").type(nombreInvitado);
        // Rellenar el DNI
        cy.get("#formDNI").type(DNIInvitado);
        // Rellenar el email
        cy.get("#formEmail").type(emailInvitado);
        // Rellenar el genero
        cy.get("#formGenero").select(genero)
        // Pulsar el boton
        cy.contains("button", "Añadir").click();

        cy.wait(1000)
    })


    it("Crear un sorteo para un evento con un unico invitado", () => {
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

    it("Eliminar un evento", () => {
        eliminarEventoDom(nombreEvento)
    });
});
