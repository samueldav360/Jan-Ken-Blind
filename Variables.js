const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

let estadoActual = 'MENU';
let rol = '';

const jugador = {
    hp: 100,
    defensa: 0, 
    dañoBase: 15, 
    asedioAbsoluto: false,
    nieblaEspionaje: false,
    bloqueoZona: false,
    controlIniciativa: false,
    dañoColateral: false,
    sacrificioTactico: false,
    emboscadaPosicional: false,
    reutilizacionInmed: false
};

let vidaRival = 400;
let rondasGanadas = 0;
let ronda = 0;

let eleccionJugador = '';
let eleccionRival = '';
let indiceUltimo = 0;
let registroResultado = '¡Prepárate para combatir!';
let valor = 1;

const opciones = ['Piedra', 'Papel', 'Tijera'];
const HistorialJugador = [];

const botonInicio = { x: 300, y: 380, ancho: 200, alto: 50 };
const botonReiniciar = { x: 300, y: 420, ancho: 200, alto: 50 };
const botonAcciones = { x: 300, y: 520, ancho: 200, alto: 50 };

const botonesOpciones = {
    'izquierda': { x: 70, y: 300, ancho: 80, alto: 80 },
    'derecha': { x: 350, y: 300, ancho: 80, alto: 80 },
};

function verificarClicRec(x, y, boton) {
    return x >= boton.x && x <= boton.x + boton.ancho &&
           y >= boton.y && y <= boton.y + boton.alto;
}