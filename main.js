alert("¡TRIVIA! Responde correctamente 10 preguntas y llévate 1 MILLÓN DE DÓLARES!!!");

let opcionesValidas = ["a", "b", "c", "d"];
let juegoTerminado = false;
let puntaje = 0

function sumarpuntaje(esCorrecto) {
    if (esCorrecto) {
      puntaje += 100000;
    } else {
      puntaje = 0;
    }
  }

while (!juegoTerminado) {
  let respuesta;
  let fallaste = false;
  

  const preguntas = [
    {
      texto: "¿Cuánto es 2 + 2?\nA) 5\nB) 4\nC) 7\nD) 3",
      correcta: "b"
    },
    {
      texto: "¿Cuál es la capital de Francia?\nA) Berlín\nB) Madrid\nC) París\nD) Roma",
      correcta: "c"
    },
    {
      texto: "¿Qué planeta es conocido como el planeta rojo?\nA) Marte\nB) Júpiter\nC) Venus\nD) Saturno",
      correcta: "a"
    },
    {
      texto: "¿Cuánto es 5 x 6?\nA) 11\nB) 30\nC) 56\nD) 25",
      correcta: "b"
    },
    {
      texto: "¿Cuál es el océano más grande del mundo?\nA) Atlántico\nB) Pacífico\nC) Índico\nD) Ártico",
      correcta: "b"
    },
    {
      texto: "¿Cuál es el símbolo químico del oro?\nA) Ag\nB) Au\nC) Fe\nD) Hg",
      correcta: "b"
    },
    {
      texto: "¿En qué año llegó el hombre a la Luna?\nA) 1965\nB) 1969\nC) 1971\nD) 1959",
      correcta: "b"
    },
    {
      texto: "¿Cuál es el país más poblado del mundo?\nA) India\nB) China\nC) EE.UU.\nD) Indonesia",
      correcta: "a" // India recientemente superó a China
    },
    {
      texto: "¿Quién pintó la Mona Lisa?\nA) Van Gogh\nB) Leonardo da Vinci\nC) Picasso\nD) Rembrandt",
      correcta: "b"
    },
    {
      texto: "¿Cuál es la lengua más hablada por nativos?\nA) Inglés\nB) Hindi\nC) Chino mandarín\nD) Español",
      correcta: "c"
    }
  ];

  for (let i = 0; i < preguntas.length; i++) {
    do {
      respuesta = prompt(`Pregunta ${i + 1}:\n${preguntas[i].texto}`).toLowerCase();
      if (!opcionesValidas.includes(respuesta)) {
        alert("Por favor, ingresa una opción válida (A, B, C o D).");
      }
    } while (!opcionesValidas.includes(respuesta));

    if (respuesta === preguntas[i].correcta) {
      alert("¡CORRECTO!");
      sumarpuntaje(true)
      if (confirm("Quieres continuar o te quedas y te vas con lo que tienes hasta ahora?")){
        alert("tienes acumulado un total de: $" + puntaje)
        alert("Siguiente pregunta!")
      } else {
        alert("Has decidido no continuar, tu premio es de: $" + puntaje)
        sumarpuntaje(false)
        fallaste = true
        break;
      }

    } else {
      alert("¡INCORRECTO! VUELVE A COMENZAR");
      alert("Has perdido $" + puntaje)
      sumarpuntaje(false)
      fallaste = true;
      break;
    }
  }

  if (!fallaste) {
    alert("¡FELICIDADES! RESPONDISTE CORRECTAMENTE A TODAS LAS PREGUNTAS.");
    juegoTerminado = true;
  }
}