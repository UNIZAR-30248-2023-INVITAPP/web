import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: 'invitapp.unizar@gmail.com',
        pass: 'evkz cizc kvla ocie'
      }
    });

  
    try {
      const eventos = req.body;
      for (const evento of eventos) {
        const mailOptions = {
          from: 'invitapp.unizar@gmail.com',
          to: evento.email,
          subject: 'InvitApp - Evento cancelado',
          text: `El evento "${evento.nombre}" programado para el día ${evento.fecha} ha sido cancelado.`,
          html: `El evento "${evento.nombre}" programado para el día ${evento.fecha} ha sido cancelado.`
        };
        const info = await transporter.sendMail(mailOptions);
        //console.log('Correo enviado:', info.response);
      }
      res.status(200).json({ message: 'Correo/s enviado/s exitosamente' });
      } catch(error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el/los correo/s' });
      }
  } else if (req.method === 'PUT') {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'invitapp.unizar@gmail.com',
          pass: 'evkz cizc kvla ocie'
        }
      });

      try {
        const ganadores = req.body
        for (const ganador of ganadores) {
          const mailOptions = {
            from: 'invitapp.unizar@gmail.com',
            to: ganador.email,
            subject: `InvitApp - Premio obtenido para el evento "${ganador.nombreEvento}"`,
            text: `Enhorabuena! Has ganado "${ganador.premio}" para el evento ${ganador.nombreEvento}. Que lo disfrutes!`,
            html: `Enhorabuena! Has ganado "${ganador.premio}" para el evento ${ganador.nombreEvento}. Que lo disfrutes!`
          };
          const info = await transporter.sendMail(mailOptions);
          //console.log('Correo enviado:', info.response);
        }
        res.status(200).json({ message: 'Correo/s enviado/s exitosamente' });
        } catch(error) {
          console.error('Error al enviar el correo:', error);
          res.status(500).json({ error: 'Error al enviar el/los correo/s' });
        }
  }  
}
