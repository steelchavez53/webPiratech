<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(true); // Se crea una nueva instancia de PHPMailer

try {
    // Configuración del servidor SMTP local
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = false; // Puede ser verdadero o falso dependiendo de la configuración de tu servidor SMTP local
    $mail->Usernamer = $email;
    $mail->Password = $pswd;
    $mail->Port = 587; // El puerto SMTP de tu servidor local

    // Destinatario, asunto y contenido del correo
    $mail->setFrom($email, 'Tu Nombre');
    $mail->addAddress($to, 'Nombre del Destinatario');
    $mail->isHTML(true)
    $mail->Subject = 'Asunto del Correo';
    $mail->Body = 'Contenido del Correo';
    $mail->AltBody = 'Contenido del Correo con el texto plano ';

    // Envío del correo
    $mail->send();
    echo 'El correo ha sido enviado correctamente.';
} catch (Exception $e) {
    echo "este mesnaje no pudo ser enviar. Error de mailer: {$mail->ErrorInfo}";
}
?>
