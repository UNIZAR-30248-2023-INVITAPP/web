import { doc, collection, deleteDoc, addDoc, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase";

export const anadirEventoPrueba = async (titulo) => {
    const fechaUnDiaDespues = new Date();
    fechaUnDiaDespues.setDate(fechaUnDiaDespues.getDate() + 1);

    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaUnDiaDespuesFormateada = `${fechaUnDiaDespues.getFullYear()}-${String(
        fechaUnDiaDespues.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaUnDiaDespues.getDate()).padStart(
        2,
        "0"
    )}`;
    var docReference = await addDoc(collection(db, "Eventos"), {
        nombre: titulo,
        fecha: fechaUnDiaDespuesFormateada,
        hora: "00:00",
        ubicacion: "Ubicacion de prueba",
        invitados: [],
    });

    return docReference;
};

export const anadirEventoPruebaConInvitado = async (titulo) => {
    const fechaUnDiaDespues = new Date();
    fechaUnDiaDespues.setDate(fechaUnDiaDespues.getDate() + 1);

    // Formatea la fecha en el formato YYYY-MM-DD
    const fechaUnDiaDespuesFormateada = `${fechaUnDiaDespues.getFullYear()}-${String(
        fechaUnDiaDespues.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaUnDiaDespues.getDate()).padStart(
        2,
        "0"
    )}`;
    var docReference = await addDoc(collection(db, "Eventos"), {
        nombre: titulo,
        fecha: fechaUnDiaDespuesFormateada,
        hora: "00:00",
        ubicacion: "Ubicacion de prueba",
        invitados: [
            {
                DNI: "12345678A",
                email: "prueba@email.com",
                nombre: "Nombre Prueba",
            },
        ],
    });

    return docReference;
};

export const eliminarEvento = async (docId) => {
    await deleteDoc(doc(db, "Eventos", docId));
};

export const eliminarEventoDom = (evento) => {
    // Eliminar el evento
    const etiqueta = cy.get('h5').contains(evento)
    const botones = etiqueta.parent().siblings()
    botones.find('.btn-danger').click()
    cy.get('#modalConfirmarEliminarEventoSimple')  // Selecciona el modal por su ID
    .find('Button')  // Encuentra todos los elementos tipo botón dentro del modal
    .last()  // Selecciona el último botón (asumiendo que "Eliminar" es el último)
    .click();  // Realiza clic en el botón
}

/**
 * Esta función devuelve un querySnapshot (que es un array de documentos) de los
 * invitados que hay en el Evento con eventiId.
 */
export const listaInvitadosDeEvento = async (eventoId) => {
    const querySnapshot = await getDocs(collection(db, "Eventos", eventoId, "Invitados"));
    return querySnapshot;
};
