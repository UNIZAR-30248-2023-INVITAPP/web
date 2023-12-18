import {
    anadirEventoPruebaDom,
    anadirEventoPruebaConInvitado,
    eliminarEvento,
} from "../aux-funciones";

describe("Eliminar un invitado", () => {
    const nombreEvento = "Test Invitado - Eliminar un invitado";

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

    it("Eliminar un invitado", () => {
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
        // Comprobar que no aparece el mensaje de que hay invitados
        cy.contains("Aun no hay invitados para este evento").should(
            "not.exist"
        );

        // Pulsar el boton de eliminar
        cy.get(':nth-child(2) > .my-2').click();

        // Comprobar que aparece el modal de eliminar invitado
        const modal = cy.get("#modalConfirmarEliminacion");
        modal.contains("button", "Eliminar").click();

        cy.get('.btn-close').eq(1).click()

        // Comprobar que se ha eliminado
        cy.contains("Aun no hay invitados para este evento").should("exist");
    });

    it("Añadir otro invitado", () => {
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

    it("Intentar eliminar un invitado pero cancelar en el modal", () => {
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
        // Comprobar que no aparece el mensaje de que hay invitados
        cy.contains("Aun no hay invitados para este evento").should(
            "not.exist"
        );

         // Pulsar el boton de eliminar
         cy.get(':nth-child(2) > .my-2').click();

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
