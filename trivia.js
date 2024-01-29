document.addEventListener("DOMContentLoaded", async function () {
  async function cargarPreguntasDesdeJSON() {
    try {
      const response = await fetch("preguntas.json");
      const preguntas = await response.json();
      return preguntas;
    } catch (error) {
      console.error("Error al cargar preguntas desde JSON:", error);
      return null;
    }
  }

  const preguntasDesdeJSON = await cargarPreguntasDesdeJSON();
  if (preguntasDesdeJSON) {
    localStorage.setItem("preguntas", JSON.stringify(preguntasDesdeJSON));
  }

  const categoriasConstantes = preguntasDesdeJSON;

  let puntaje = 0;
  const inicioTiempo = new Date();
  const resultadoContenedor = document.getElementById("resultado");
  const triviaContainer = document.getElementById("triviaContainer");
  const mostrarResultadoBtn = document.createElement("button");
  mostrarResultadoBtn.textContent = "Mostrar Resultado";
  mostrarResultadoBtn.addEventListener("click", mostrarResultados);
  document.body.appendChild(mostrarResultadoBtn);

  const preguntasMarvelAleatorias = obtenerPreguntasAleatorias(categoriasConstantes.marvel);
  const preguntasOtraCategoriaAleatorias = obtenerPreguntasAleatorias(categoriasConstantes.otraCategoria);
  const preguntasAleatorias = preguntasMarvelAleatorias.concat(preguntasOtraCategoriaAleatorias);

  preguntasAleatorias.forEach((pregunta, index) => {
    agregarPreguntaAlDOM(pregunta, index);
  });

  function agregarPreguntaAlDOM(pregunta, index) {
    const preguntaContenedor = document.createElement("div");
    preguntaContenedor.classList.add("pregunta-contenedor");
    preguntaContenedor.innerHTML = `
      <p>${pregunta.pregunta}</p>
      <ul id="opciones-${index}">
        ${pregunta.opciones.map((opcion, i) => `<li data-opcion="${i}">${opcion}</li>`).join("")}
      </ul>
    `;
    triviaContainer.appendChild(preguntaContenedor);

    const opciones = document.querySelectorAll(`#opciones-${index} li`);
    opciones.forEach((opcion) => {
      opcion.addEventListener("click", () => manejarRespuesta(opcion, index, opciones));
    });
  }

  function manejarRespuesta(opcionSeleccionada, index, opciones) {
    const respuestaCorrectaIndex = preguntasAleatorias[index].opciones.findIndex(
      (opcion) => opcion === preguntasAleatorias[index].respuestaCorrecta
    );

    opciones.forEach((opcion) => {
      opcion.removeEventListener("click", () => manejarRespuesta(opcion, index, opciones));

      if (opcion === opcionSeleccionada) {
        opcion.classList.add("seleccionado");

        if (opcion.getAttribute("data-opcion") === respuestaCorrectaIndex.toString()) {
          opcion.classList.add("respuesta-correcta");
          puntaje++;
        }
      } else {
        opcion.classList.remove("seleccionado");
      }

      opcion.classList.remove("respuesta-correcta");
    });

    const preguntasRespondidas = document.querySelectorAll(".pregunta-contenedor.seleccionado").length;
    if (preguntasRespondidas === preguntasAleatorias.length) {
      mostrarResultadoBtn.style.display = "block";
    }
  }

  function mostrarResultados() {
    const finTiempo = new Date();
    const tiempoTranscurrido = (finTiempo - inicioTiempo) / 1000;

    resultadoContenedor.innerHTML = `
      <p>Tu puntaje final es: ${puntaje} de ${preguntasAleatorias.length}.</p>
      <p>Tiempo transcurrido: ${tiempoTranscurrido.toFixed(2)} segundos.</p>
    `;

    const resultadoAnterior = localStorage.getItem("ultimoResultado");
    if (resultadoAnterior) {
      const ultimoResultado = JSON.parse(resultadoAnterior);
      resultadoContenedor.innerHTML += `
        <p>Resultados anteriores:</p>
        <p>Puntaje: ${ultimoResultado.puntaje} de ${preguntasAleatorias.length}.</p>
        <p>Tiempo transcurrido: ${ultimoResultado.tiempoTranscurrido} segundos.</p>
      `;
    }

    preguntasAleatorias.forEach((pregunta, index) => {
      const opciones = document.querySelectorAll(`#opciones-${index} li`);
      const respuestaCorrectaIndex = pregunta.opciones.findIndex((opcion) => opcion === pregunta.respuestaCorrecta);

      opciones.forEach((opcion, i) => {
        if (i === respuestaCorrectaIndex) {
          opcion.classList.add("respuesta-correcta");
        }
      });
    });

    if (puntaje < 2) {
      resultadoContenedor.innerHTML += "<p>Parte del viaje es el final. (Tony Stark) No sabes mucho de Marvel. ¡Sigue intentándolo!</p>";
    } else if (puntaje <= 7) {
      resultadoContenedor.innerHTML += "<p>¡Buen intento! Conoces algo sobre Marvel ¡Wakanda Forever!</p>";
    } else {
      resultadoContenedor.innerHTML += "<p>¡Felicidades! Podrías hacer esto todo el día. Eres un experto en Marvel.</p>";
    }

    localStorage.setItem("ultimoResultado", JSON.stringify({
      puntaje: puntaje,
      tiempoTranscurrido: tiempoTranscurrido.toFixed(2)
    }));
  }

  function obtenerPreguntasAleatorias(categoria) {
    if (Array.isArray(categoria) && categoria.length >= 5) {
      const preguntasAleatorias = categoria.slice().sort(() => Math.random() - 0.5);
      return preguntasAleatorias.slice(0, 5);
    } else {
      console.error("Error: La categoría no es un array válido o no tiene suficientes preguntas.");
      return [];
    }
  }
});
