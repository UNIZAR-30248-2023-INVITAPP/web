describe('En esta prueba se modifican las propiedades con las mismas que otro ya existente', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/eventos')
    })


    it('Prueba 1: Crear un evento "Evento de Prueba 1" ', () => {
        // Pinchar en el modal para crear Evento
        cy.contains('button', 'Crear Evento').click();
        // Rellenar el nombre del evento
        cy.get('#nombre').type('Evento de Prueba 1');
        // Rellenar la fecha
        cy.get('#fecha').type('2025-12-31');
        // Rellenar la hora
        cy.get('#hora').type('21:30');
        //Rellenar la ubicacion
        cy.get('#ubicacion').type('Calle León XII');
        // Crear Evento
        cy.get('#boton-crear-evento').click()
        cy.wait(1000)
    })

    it('Prueba 2: Crear un evento "Evento de Prueba 2" ', () => {
        // Pinchar en el modal para crear Evento
        cy.contains('button', 'Crear Evento').click();
        // Rellenar el nombre del evento
        cy.get('#nombre').type('Evento de Prueba 2');
        // Rellenar la fecha
        cy.get('#fecha').type('2025-12-31');
        // Rellenar la hora
        cy.get('#hora').type('21:30');
        //Rellenar la ubicacion
        cy.get('#ubicacion').type('Calle León XII');
        // Crear Evento
        cy.get('#boton-crear-evento').click()
        cy.wait(1000)
    })

    it('Prueba 3: Seleccionar el segundo evento creado y ponerle el nombre del primero y comprobar el mensaje de error', () => {
        // Seleccionar el evento con nombre "Evento de Prueba 2"
        cy.get('li') // Selecciona todos los elementos <li> que representan eventos
        .contains('h5', 'Evento de Prueba 2') // Busca el elemento <h5> con el texto "Evento de Prueba 2"
        .parent() // Selecciona el padre del elemento h5
        .next() // Selecciona el siguiente elemento (que sería el div hermano del padre del h5)
        .within(() => {
            cy.get('button:contains("Editar")') // Busca el botón con el texto "Editar"
            .click(); // Realiza clic en el botón "Editar"
        });

        //Cambiar el nombre a 'Evento de Prueba 1'
        cy.get('#nombre').clear().type('Evento de Prueba 1')
        // Rellenar fecha
        cy.get('#fecha').type('2025-12-31');
        // Rellenar la hora
        cy.get('#hora').type('21:30');
        // Rellenar hora
        // Pinchar el botón de modificar evento
        cy.contains('button', 'Modificar evento').click()
        // Verificar que aparece el error
        cy.contains('Ya existe un evento con esas propiedades').should('exist')
    })
})
