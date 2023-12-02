describe('Crear evento con una fecha anterior a la actual', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/eventos')
  })


  it('Prueba 1: Abrir el modal y rellenar los campos con un año anterior al año actual', () => {
      // Pinchar en el modal para crear Evento
      cy.contains('button', 'Crear Evento').click();

      // Comprobar que se abre el modal de Crear Evento
      cy.get('#modalCrearEvento').should('be.visible');

      // Rellenar el nombre del evento
      cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');
      // Rellenar la fecha
      cy.get('#fecha').type('2020-12-31');
      // Rellenar la hora
      cy.get('#hora').type('21:30');
      //Rellenar la ubicacion
      cy.get('#ubicacion').type('Calle Maria Moliner, 25');
      // Crear Evento
      cy.get('#boton-crear-evento').click()

      // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
      cy.contains('La fecha del evento tiene que ser posterior a la fecha actual').should('exist');

      
  })

  it('Prueba 2: Abrir modal y rellenar una fecha en el mismo año pero un mes anterior al actual', () => {
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();

    // Comprobar que se abre el modal de Crear Evento
    cy.get('#modalCrearEvento').should('be.visible');

    // Rellenar el nombre del evento
    cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');

    // Obtén la fecha actual
    const fechaActual = new Date();
    const primerDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1);
    const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
    const fechaMesAnterior = `${primerDiaMesAnterior.getFullYear()}-${String(primerDiaMesAnterior.getMonth() + 1).padStart(2, '0')}-${ultimoDiaMesAnterior.getDate()}`;

    // Ingresa la fecha en el campo de entrada
    cy.get('#fecha').type(fechaMesAnterior);
    // Rellenar la hora
    cy.get('#hora').type('21:30');
    //Rellenar la ubicacion
    cy.get('#ubicacion').type('Calle Maria Moliner, 25');
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
    cy.contains('La fecha del evento tiene que ser posterior a la fecha actual').should('exist');
  })


  it('Prueba 3: Abrir modal y rellenar una fecha en el mismo año y mes pero días anteriores al actual' , () => {
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();

    // Comprobar que se abre el modal de Crear Evento
    cy.get('#modalCrearEvento').should('be.visible');

    // Rellenar el nombre del evento
    cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');

    // Obtén la fecha actual
    const fechaActual = new Date();
    // Calcula la fecha un día antes
    const fechaUnDiaAntes = new Date(fechaActual);
    fechaUnDiaAntes.setDate(fechaActual.getDate() - 1);

    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaUnDiaAntesFormateada = `${fechaUnDiaAntes.getFullYear()}-${String(fechaUnDiaAntes.getMonth() + 1).padStart(2, '0')}-${String(fechaUnDiaAntes.getDate()).padStart(2, '0')}`;

    // Ingresa la fecha en el campo de entrada
    cy.get('#fecha').type(fechaUnDiaAntesFormateada);
    // Rellenar la hora
    cy.get('#hora').type('21:30');
    //Rellenar la ubicacion
    cy.get('#ubicacion').type('Calle Maria Moliner, 25');
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
    cy.contains('La fecha del evento tiene que ser posterior a la fecha actual').should('exist');

    fechaUnDiaAntes.setDate(fechaActual.getDate() - 2);
    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaDosDiasAntesFormateada = `${fechaUnDiaAntes.getFullYear()}-${String(fechaUnDiaAntes.getMonth() + 1).padStart(2, '0')}-${String(fechaUnDiaAntes.getDate()).padStart(2, '0')}`;
    // Ingresa la fecha en el campo de entrada
    cy.get('#fecha').type(fechaDosDiasAntesFormateada);
    cy.get('#boton-crear-evento').click()
    // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
    cy.contains('La fecha del evento tiene que ser posterior a la fecha actual').should('exist');

  })

  it('Prueba 4: Abrir modal y rellenar la fecha en el mismo día al día actual', () => {
    // Pinchar en el modal para crear Evento
    cy.contains('button', 'Crear Evento').click();

    // Comprobar que se abre el modal de Crear Evento
    cy.get('#modalCrearEvento').should('be.visible');

    // Rellenar el nombre del evento
    cy.get('#nombre').type('Evento de Prueba con Fecha No Valida');

    // Obtén la fecha actual
    const fechaActual = new Date();
    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaActualFormateada = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`;
    // Ingresa la fecha en el campo de entrada

    // Rellenar la fecha
    cy.get('#fecha').type(fechaActualFormateada);
    // Rellenar la hora
    cy.get('#hora').type('21:30');
    //Rellenar la ubicacion
    cy.get('#ubicacion').type('Calle Maria Moliner, 25');
    // Crear Evento
    cy.get('#boton-crear-evento').click()

    // Comprobar que aparece el mensaje de error cuando se intenta crear el evento con una fecha anterior a la actual
    cy.contains('No se pueden reservar eventos en el día actual, debe reservarlos como mínimo el día siguiente').should('exist');
  })


})