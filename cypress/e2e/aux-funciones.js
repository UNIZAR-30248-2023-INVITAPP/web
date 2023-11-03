import { doc, collection, deleteDoc, addDoc } from "firebase/firestore";
import db from "../../firebase";

export const anadirEventoPrueba = async () => {
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
        nombre: "Test - Añadir un invitado",
        fecha: fechaUnDiaDespuesFormateada,
        hora: "00:00",
        ubicacion: "Ubicacion de prueba",
        invitados: [],
    });

    return docReference;
};

export const anadirEventoPruebaConInvitado = async () => {
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
        nombre: "Test - Evento de prueba",
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
