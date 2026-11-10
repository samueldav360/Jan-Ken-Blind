function Maxvalue(array) {
    const counts = {};
    let maxCount = 0;
    let mostFrequent = 'Piedra';

    for (const item of array) {
        counts[item] = (counts[item] || 0) + 1;
        if (counts[item] > maxCount) {
            maxCount = counts[item];
            mostFrequent = item;
        }
    }
    return mostFrequent;
}

function indiceBrorracho() {
    const indice = Math.floor(Math.random() * opciones.length);
    return opciones[indice];
}

function indiceIdiota() {
    const azar = Math.random() * 100;
    if (azar < 60) return 'Piedra';
    else if (azar < 80) return 'Papel';
    else return 'Tijera';
}

function indiceElectrico() {
    const azar = Math.random() * 100;
    let NewsOptions = opciones.filter((v) => v !== opciones[indiceUltimo]);
    if (azar < 45) return NewsOptions[0];
    else if (azar < 90) return NewsOptions[1];
    else return opciones[indiceUltimo];
}

function indiceCasador() {
    const tendenciaJugador = Maxvalue(HistorialJugador);
    if (tendenciaJugador === 'Piedra') return 'Papel';
    else if (tendenciaJugador === 'Papel') return 'Tijera';
    else return 'Piedra';
}

function obtenerEleccionRival() {
    const indiceRival = Math.floor(Math.random() * 4);
    if (indiceRival < 1) {
        return indiceBrorracho();
    } else if (indiceRival < 2) {
        return indiceIdiota();
    } else if (indiceRival < 3) {
        return indiceElectrico();
    } else {
        return indiceCasador();
    }
}

function DeterminarRol() {
    if (eleccionJugador === eleccionRival) {
        registroResultado = "¡Empate en selección! Elige otra vez.";
        return;
    } 
    else if (
        (eleccionJugador === 'Piedra' && eleccionRival === 'Tijera') ||
        (eleccionJugador === 'Papel' && eleccionRival === 'Piedra') ||
        (eleccionJugador === 'Tijera' && eleccionRival === 'Papel')
    ) {
        rol = 'Atacante';
    } 
    else {
        rol = 'Defensor';
    }
    registroResultado = `¡Eres el ${rol}!`;
}

function JugadorAtacante() {
    if (eleccionJugador === eleccionRival) {
        vidaRival -= 50;
        rondasGanadas++;
        Activar(); // Llama a la ruleta
        registroResultado = "¡Golpeaste al rival! (-50 HP)";
    } else {
        DeterminarRol();
    }
}

function JugadorDefensor() {
    if (eleccionJugador === eleccionRival) {
        jugador.hp -= 25;
        registroResultado = "¡El rival te golpeó! (-25 HP)";
    } else {
        DeterminarRol();
    }
}

function verificarFinDelJuego() {
    if (vidaRival <= 0) {
        estadoActual = 'VICTORIA';
        if (typeof dibujar === 'function') dibujar(); 
    } else if (jugador.hp <= 0) {
        estadoActual = 'DERROTA';
        if (typeof dibujar === 'function') dibujar(); 
    }
}

function ejecutarTurnoPvE(eleccionUsuario) {
    eleccionJugador = eleccionUsuario;
    HistorialJugador.push(eleccionJugador);
    eleccionRival = obtenerEleccionRival();
    indiceUltimo = opciones.indexOf(eleccionRival);
    ronda++; 

    if (rol === 'Atacante') {
        JugadorAtacante();
    } 
    else if (rol === 'Defensor') {
        JugadorDefensor();
    }
    else {
        DeterminarRol();
    }

    verificarFinDelJuego();
}

function iniciarNuevaPartida() {
    jugador.hp = 100;
    jugador.defensa = 0;
    jugador.dañoBase = 15;
    jugador.rol = '';
    jugador.asedioAbsoluto = false;
    jugador.nieblaEspionaje = false;
    jugador.bloqueoZona = false;
    jugador.controlIniciativa = false;
    jugador.dañoColateral = false;
    jugador.sacrificioTactico = false;
    jugador.emboscadaPosicional = false;
    jugador.reutilizacionInmed = false;
    
    vidaRival = 400;
    rondasGanadas = 0;
    ronda = 0;
    eleccionJugador = '';
    eleccionRival = '';
    HistorialJugador.length = 0;
    registroResultado = '¡Elige tu ataque!';
}