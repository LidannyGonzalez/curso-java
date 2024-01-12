document.addEventListener("DOMContentLoaded", function () {
  const categorias = {
      marvel: [
          {
              pregunta: "¿Cuál es el nombre real de Iron Man?",
              opciones: ["Tony Stark", "Bruce Banner", "Steve Rogers", "Peter Parker"],
              respuestaCorrecta: "Tony Stark"
          },
          {
              pregunta: "¿Quién es conocido como el Dios del Trueno en el universo Marvel?",
              opciones: ["Iron Man", "Hulk", "Thor", "Black Widow"],
              respuestaCorrecta: "Thor"
          },
          {
              pregunta: "¿Cuál es el nombre del alter ego de Spider-Man?",
              opciones: ["Bruce Wayne", "Clark Kent", "Peter Parker", "Wade Wilson"],
              respuestaCorrecta: "Peter Parker"
          },
          {
              pregunta: "¿Cuál es el metal utilizado para hacer el escudo del Capitán América?",
              opciones: ["Hierro", "Titanio", "Vibranium", "Aluminio"],
              respuestaCorrecta: "Vibranium"
          },
          {
              pregunta: "¿Qué científico se transforma en Hulk?",
              opciones: ["Bruce Banner", "Tony Stark", "Peter Parker", "Scott Lang"],
              respuestaCorrecta: "Bruce Banner"
          }
      ],
      otraCategoria: [
          {
              pregunta: "¿En qué año se lanzó el primer cómic de Spider-Man?",
              opciones: ["1962", "1975", "1989", "2001"],
              respuestaCorrecta: "1962"
          },
          {
              pregunta: "¿Cuál es el planeta natal de Gamora en Guardianes de la Galaxia?",
              opciones: ["Tatooine", "Mars", "Zen-Whoberi", "Alderaan"],
              respuestaCorrecta: "Zen-Whoberi"
          },
          {
              pregunta: "¿Cuál es el nombre real de Black Widow?",
              opciones: ["Natasha Romanoff", "Wanda Maximoff", "Maria Hill", "Carol Danvers"],
              respuestaCorrecta: "Natasha Romanoff"
          },
          {
              pregunta: "¿Qué actor interpreta a Deadpool en las películas?",
              opciones: ["Chris Hemsworth", "Ryan Reynolds", "Robert Downey Jr.", "Chris Evans"],
              respuestaCorrecta: "Ryan Reynolds"
          },
          {
              pregunta: "¿Cuál es el villano principal en la película 'Avengers: Infinity War'?",
              opciones: ["Loki", "Thanos", "Ultron", "Red Skull"],
              respuestaCorrecta: "Thanos"
          }
      ]
  };

  let puntaje = 0;
  const inicioTiempo = new Date();
  const resultadoContainer = document.getElementById("resultado");

  const preguntasMarvelAleatorias = obtenerPreguntasAleatorias(categorias.marvel);
  const preguntasOtraCategoriaAleatorias = obtenerPreguntasAleatorias(categorias.otraCategoria);

  const preguntasAleatorias = preguntasMarvelAleatorias.concat(preguntasOtraCategoriaAleatorias);

  preguntasAleatorias.forEach((pregunta, index) => {
      agregarPreguntaAlDOM(pregunta, index);
  });

  function agregarPreguntaAlDOM(pregunta, index) {
      const triviaContainer = document.getElementById("triviaContainer");
      const preguntaContainer = document.createElement("div");
      preguntaContainer.classList.add("pregunta-container");

      preguntaContainer.innerHTML = `
          <p>${pregunta.pregunta}</p>
          <ul id="opciones-${index}">
              ${pregunta.opciones.map((opcion, i) => `<li data-opcion="${i}">${opcion}</li>`).join("")}
          </ul>
      `;

      triviaContainer.appendChild(preguntaContainer);

      const opciones = document.querySelectorAll(`#opciones-${index} li`);
      opciones.forEach(opcion => {
          opcion.addEventListener("click", () => manejarRespuesta(opcion, index, opciones));
      });
  }

  function manejarRespuesta(opcionSeleccionada, index, opciones) {
      const respuestaCorrectaIndex = preguntasAleatorias[index].opciones.findIndex(
          (opcion) => opcion === preguntasAleatorias[index].respuestaCorrecta
      );

      opciones.forEach(opcion => {
          opcion.removeEventListener("click", () => manejarRespuesta(opcion, index, opciones));

          if (opcion === opcionSeleccionada) {
              opcion.classList.add("selected");

              if (opcion.getAttribute("data-opcion") === respuestaCorrectaIndex.toString()) {
                  opcion.classList.add("correct-answer");
                  puntaje++;
              }
          }
      });

      // Comprobamos si hemos llegado al final de la trivia
      const preguntasRespondidas = document.querySelectorAll(".pregunta-container .selected").length;
      if (preguntasRespondidas === preguntasAleatorias.length) {
          mostrarResultados();
      }
  }

  function mostrarResultados() {
      const finTiempo = new Date();
      const tiempoTranscurrido = (finTiempo - inicioTiempo) / 1000;

      resultadoContainer.innerHTML = `
          <p>Tu puntaje final es: ${puntaje} de ${preguntasAleatorias.length}.</p>
          <p>Tiempo transcurrido: ${tiempoTranscurrido.toFixed(2)} segundos.</p>
      `;

      preguntasAleatorias.forEach((pregunta, index) => {
          const opciones = document.querySelectorAll(`#opciones-${index} li`);
          const respuestaCorrectaIndex = pregunta.opciones.findIndex(
              (opcion) => opcion === pregunta.respuestaCorrecta
          );

          opciones.forEach((opcion, i) => {
              if (i === respuestaCorrectaIndex) {
                  opcion.classList.add("correct-answer");
              }
          });
      });

      if (puntaje < 2) {
          resultadoContainer.innerHTML += "<p>Parte del viaje es el final. (Tony Stark) No sabes mucho de Marvel. ¡Sigue intentándolo!</p>";
      } else if (puntaje <= 7) {
          resultadoContainer.innerHTML += "<p>¡Buen intento! Conoces algo sobre Marvel ¡Wakanda Forever!</p>";
      } else {
          resultadoContainer.innerHTML += "<p>¡Felicidades! Podrías hacer esto, todo el día. Eres un experto en Marvel.</p>";
      }
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
