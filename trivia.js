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

function jugarTrivia() {
  let puntaje = 0;
  const inicioTiempo = new Date();

  const preguntasMarvelAleatorias = obtenerPreguntasAleatorias(categorias.marvel);
  const preguntasOtraCategoriaAleatorias = obtenerPreguntasAleatorias(categorias.otraCategoria);

  const preguntasAleatorias = preguntasMarvelAleatorias.concat(preguntasOtraCategoriaAleatorias);

  for (let i = 0; i < preguntasAleatorias.length; i++) {
    const preguntaActual = preguntasAleatorias[i];

    let respuestaUsuario;
    do {
      respuestaUsuario = prompt(
        `${preguntaActual.pregunta}\nOpciones:\n${preguntaActual.opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join('\n')}\nIngresa el número de tu respuesta:`
      );

      if (!/^[1-4]$/.test(respuestaUsuario)) {
        alert("Por favor, ingresa un número válido (1-4).");
      }
    } while (!/^[1-4]$/.test(respuestaUsuario));

    if (verificarRespuesta(respuestaUsuario, preguntaActual)) {
      puntaje++;
      alert("¡Correcto!");
    } else {
      alert(`Incorrecto. La respuesta correcta es: ${preguntaActual.respuestaCorrecta}`);
    }
  }

  const finTiempo = new Date();
  const tiempoTranscurrido = (finTiempo - inicioTiempo) / 1000;

  alert(`Tu puntaje final es: ${puntaje} de ${preguntasAleatorias.length}.`);
  alert(`Tiempo transcurrido: ${tiempoTranscurrido.toFixed(2)} segundos.`);

  if (puntaje < 2) {
    alert("Parte del viaje es el final. (Tony Stark) No sabes mucho de Marvel. ¡Sigue intentándolo!");
  } else if (puntaje <= 4) {
    alert("¡Buen intento! Conoces algo sobre Marvel ¡Wakanda Forever!");
  } else {
    alert("¡Felicidades! Podrías hacer esto, todo el día. Eres un experto en Marvel.");
  }
}

function verificarRespuesta(respuestaUsuario, pregunta) {
  const respuestaCorrecta = pregunta.respuestaCorrecta;
  const indiceRespuestaUsuario = parseInt(respuestaUsuario) - 1;

  return (
    indiceRespuestaUsuario >= 0 &&
    indiceRespuestaUsuario < pregunta.opciones.length &&
    pregunta.opciones[indiceRespuestaUsuario] === respuestaCorrecta
  );
}

function obtenerPreguntasAleatorias(categoria) {
  const preguntasAleatorias = categoria.sort(() => Math.random() - 0.5);
  return preguntasAleatorias.slice(0, 5); 
}

jugarTrivia();