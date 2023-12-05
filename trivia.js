const preguntas = [
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
  ];
  
  function jugarTrivia() {
    let puntaje = 0;
  
    for (let i = 0; i < preguntas.length; i++) {
      const preguntaActual = preguntas[i];
  
      let respuestaUsuario;
      do {
        respuestaUsuario = prompt(
          `${preguntaActual.pregunta}\nOpciones:\n${preguntaActual.opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join('\n')}\nIngresa el número de tu respuesta:`
        );
  
        if (!/^[1-4]$/.test(respuestaUsuario)) {
          console.log("Por favor, ingresa un número válido (1-4).");
        }
      } while (!/^[1-4]$/.test(respuestaUsuario));
  
      if (verificarRespuesta(respuestaUsuario, preguntaActual)) {
        puntaje++;
        console.log("¡Correcto!\n");
      } else {
        console.log(`Incorrecto. La respuesta correcta es: ${preguntaActual.respuestaCorrecta}\n`);
      }
    }
  
    console.log(`Tu puntaje final es: ${puntaje} de ${preguntas.length}`);
  
    if (puntaje < 2) {
      console.log("Parte del viaje es el final. (Tony Stark) No sabes mucho de Marvel. ¡Sigue intentándolo!");
    } else if (puntaje <= 4) {
      console.log("¡Buen intento! Conoces algo sobre Marvel ¡Wakanda Forever!");
    } else {
      console.log("¡Felicidades! Podrías hacer esto, todo el día. Eres un experto en Marvel.");
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
  
  jugarTrivia();
 