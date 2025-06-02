document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registro-form");
  const triviaContainer = document.getElementById("trivia-container");
  const preguntaTexto = document.getElementById("pregunta-texto");
  const opcionesContainer = document.getElementById("opciones");
  const confirmacionRespuesta = document.getElementById("confirmacion-respuesta");
  const continuarRetirarse = document.getElementById("continuar-o-retirarse");
  const mensajeFinal = document.getElementById("mensaje-final");
  const puntajeElemento = document.getElementById("puntaje");
  const cuentaForm = document.getElementById("cuenta-form");
  const cuentaInput = document.getElementById("cuenta");
  const cuentaSubmit = document.getElementById("cuenta-submit");

  let usuario = {};
  let preguntas = [];
  let preguntaActual = 0;
  let puntaje = 0;
  let respuestaSeleccionada = null;

  const estado = JSON.parse(localStorage.getItem("estadoTrivia")) || {};

  if (estado.jugo && estado.motivo !== "perdio") {
    mostrarMensajeFinal("Ya has participado y no puedes volver a jugar.");
    return;
  } else if (estado.motivo === "perdio" && Date.now() - estado.timestamp < 24 * 60 * 60 * 1000) {
    mostrarMensajeFinal("Perdiste en el intento anterior. Intenta de nuevo en 24 horas.");
    return;
  }

  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    usuario.nombre = document.getElementById("nombre").value;
    usuario.fecha = document.getElementById("fecha").value;
    usuario.email = document.getElementById("email").value;

    localStorage.setItem("usuarioTrivia", JSON.stringify(usuario));
    registroForm.classList.add("oculto");
    triviaContainer.classList.remove("oculto");
    iniciarPreguntas();
  });

  function iniciarPreguntas() {
    preguntas = [
      { texto: "¿Cuánto es 2 + 2?", opciones: ["a) 5", "b) 4", "c) 7", "d) 3"], correcta: "b" },
      { texto: "¿Cuál es la capital de Francia?", opciones: ["a) Berlín", "b) Madrid", "c) París", "d) Roma"], correcta: "c" },
      { texto: "¿Qué planeta es conocido como el planeta rojo?", opciones: ["a) Marte", "b) Júpiter", "c) Venus", "d) Saturno"], correcta: "a" },
      { texto: "¿Cuánto es 5 x 6?", opciones: ["a) 11", "b) 30", "c) 56", "d) 25"], correcta: "b" },
      { texto: "¿Cuál es el océano más grande del mundo?", opciones: ["a) Atlántico", "b) Pacífico", "c) Índico", "d) Ártico"], correcta: "b" },
      { texto: "¿Cuál es el símbolo químico del oro?", opciones: ["a) Ag", "b) Au", "c) Fe", "d) Hg"], correcta: "b" },
      { texto: "¿En qué año llegó el hombre a la Luna?", opciones: ["a) 1965", "b) 1969", "c) 1971", "d) 1959"], correcta: "b" },
      { texto: "¿Cuál es el país más poblado del mundo?", opciones: ["a) India", "b) China", "c) EE.UU.", "d) Indonesia"], correcta: "a" },
      { texto: "¿Quién pintó la Mona Lisa?", opciones: ["a) Van Gogh", "b) Leonardo da Vinci", "c) Picasso", "d) Rembrandt"], correcta: "b" },
      { texto: "¿Cuál es la lengua más hablada por nativos?", opciones: ["a) Inglés", "b) Hindi", "c) Chino mandarín", "d) Español"], correcta: "c" }
    ];
    mostrarPregunta();
  }

  function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    preguntaTexto.textContent = `Pregunta ${preguntaActual + 1}: ${pregunta.texto}`;
    opcionesContainer.innerHTML = "";
    confirmacionRespuesta.classList.add("oculto");
    continuarRetirarse.classList.add("oculto");

    pregunta.opciones.forEach((opcion) => {
      const boton = document.createElement("button");
      boton.textContent = opcion;
      boton.addEventListener("click", () => confirmarRespuesta(opcion[0]));
      opcionesContainer.appendChild(boton);
    });
  }

  function confirmarRespuesta(letra) {
    respuestaSeleccionada = letra;
    confirmacionRespuesta.classList.remove("oculto");
    confirmacionRespuesta.innerHTML = `
      <p>¿Estás seguro de tu respuesta: <strong>${letra.toUpperCase()}</strong>?</p>
      <button id="btn-confirmar">Confirmar</button>
      <button id="btn-cancelar">Cambiar respuesta</button>
    `;
    document.getElementById("btn-confirmar").onclick = validarRespuesta;
    document.getElementById("btn-cancelar").onclick = () => confirmacionRespuesta.classList.add("oculto");
  }

  function validarRespuesta() {
    const correcta = preguntas[preguntaActual].correcta;
    confirmacionRespuesta.classList.add("oculto");
    if (respuestaSeleccionada === correcta) {
      puntaje += 100000;
      puntajeElemento.textContent = `Llevas acumulado: $${puntaje}`;
      mostrarContinuarRetirarse();
    } else {
      guardarEstado("perdio");
      mostrarMensajeFinal("¡INCORRECTO! Has perdido todo. Intenta de nuevo en 24 horas.");
    }
  }

  function mostrarContinuarRetirarse() {
    continuarRetirarse.classList.remove("oculto");
    continuarRetirarse.innerHTML = `
      <p>¿Deseas continuar o retirarte con $${puntaje}?</p>
      <button id="btn-continuar">Continuar</button>
      <button id="btn-retirarse">Retirarse</button>
    `;
    document.getElementById("btn-continuar").onclick = () => {
      continuarRetirarse.classList.add("oculto");
      preguntaActual++;
      if (preguntaActual < preguntas.length) {
        mostrarPregunta();
      } else {
        ganar();
      }
    };
    document.getElementById("btn-retirarse").onclick = () => mostrarFormularioCuenta("retirado");
  }

  function ganar() {
    mostrarFormularioCuenta("ganador");
  }

  function mostrarFormularioCuenta(motivo) {
    triviaContainer.classList.add("oculto");
    cuentaForm.classList.remove("oculto");
    cuentaSubmit.onclick = () => {
      const cuenta = cuentaInput.value;
      if (cuenta.trim() !== "") {
        guardarEstado(motivo);
        mostrarMensajeFinal(`Felicidades, recibirás $${puntaje} en la cuenta ${cuenta}`);
      }
    };
  }

  function mostrarMensajeFinal(mensaje) {
    cuentaForm.classList.add("oculto");
    triviaContainer.classList.add("oculto");
    mensajeFinal.textContent = mensaje;
    mensajeFinal.classList.remove("oculto");
  }

  function guardarEstado(motivo) {
    localStorage.setItem("estadoTrivia", JSON.stringify({
      jugo: true,
      motivo,
      timestamp: Date.now()
    }));
  }
});