import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos;

    //Enviar el email
    const info = await transporter.sendMail({
        from:"APV- Administrador de Pacientes de Veterinaria",
        to:email,
        subject: 'Restablece Tu Password',
        text: "Reestablece Tu Password",
        html: `<p> Hola: ${nombre} , has solicitado restablecer tu password.</p>
                <p>Sigue el siguiente enlace para reestablecer tu password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a></p>
                <p>Si tu no solicitaste esta accion, puedes hacer caso omiso de este mensaje</p>
                `
    });
    // console.log("Mensaje enviado : %s", info.messageId);
}
export default emailOlvidePassword;