
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

let estadoActual = 'MENU';

let rol = '';
let vidaJugador = 150;
let vidaRival = 400;
let rondasGanadas = 0;
let ronda = 0;

let eleccionJugador = '';
let eleccionRival = '';
let indiceUltimo = 0;
let registroResultado = '¡Prepárate para combatir!';
const opciones = ['Piedra', 'Papel', 'Tijera'];
const HistorialJugador = [];

const botonInicio = { x: 300, y: 380, ancho: 200, alto: 50 };
const botonReiniciar = { x: 300, y: 420, ancho: 200, alto: 50 };

const botonesOpciones = {
    'Piedra': { x: 150, y: 460, ancho: 120, alto: 60 },
    'Papel':  { x: 340, y: 460, ancho: 120, alto: 60 },
    'Tijera': { x: 530, y: 460, ancho: 120, alto: 60 }
};

function verificarClicRec(x, y, boton) {
    return x >= boton.x && x <= boton.x + boton.ancho &&
           y >= boton.y && y <= boton.y + boton.alto;
}
