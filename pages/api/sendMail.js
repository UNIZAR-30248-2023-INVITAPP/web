import nodemailer from 'nodemailer'

export default async function handler(req, res) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'jsanclementev@gmail.com',
          pass: 'vhed sfpy kmul ixid' // Contraseña de aplicación generada
        }
      });

      const nombreEvento = req.body.nombreEvento
      const fechaEvento = req.body.fechaEvento
      const listaInvitados = req.body.emails
      const mailOptions = {
        from: 'jsanclementev@gmail.com', 
        to: listaInvitados,
        subject: 'InvitApp - Evento cancelado',
        text: `El evento ${nombreEvento} programado para el día ${fechaEvento} ha sido cancelado`,
        html: `El evento ${nombreEvento} programado para el día ${fechaEvento} ha sido cancelado`
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        res.status(200).json({ message: 'Correo/s enviado/s exitosamente' });
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el/los correo/s' });
      }
    
  }