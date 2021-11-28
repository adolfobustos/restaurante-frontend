
let boton = document.getElementById("enviar");
let numeroCaptcha1 = 0;
let numeroCaptcha2 = 0;
boton.addEventListener("click", validarCaptcha);
generarCaptcha();

function generarCaptcha() {
  numeroCaptcha1 = Math.floor(Math.random() * 10);
  numeroCaptcha2 = Math.floor(Math.random() * 10);
  let captchaGenerado = document.getElementById("captchaGenerado");
  captchaGenerado.innerHTML = numeroCaptcha1 + "x" + numeroCaptcha2 + "=";
}

function validarCaptcha() {
  let inputCaptcha = document.getElementById("captchaInput");
  let resultado = document.getElementById("resultado");

  if (inputCaptcha.value == numeroCaptcha1 * numeroCaptcha2) {
    resultado.innerHTML = "¡Enviado!";
  } else {
    resultado.innerHTML = "¡Captcha Incorrecto! Ingreselo nuevamente";
    generarCaptcha();
  }
}
