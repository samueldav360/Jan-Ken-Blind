const imgRuleta = new Image();
imgRuleta.src = "assets/pixil-frame-0 (1).png"; 

const imgFlecha = new Image();
imgFlecha.src = "assets/pixil-frame-0 (5).png";

const imgPiedra = new Image();
imgPiedra.src = "assets/pixil-frame-0 (4).png";

const imgPapel = new Image();
imgPapel.src = "assets/pixil-frame-0 (3).png";

const imgTijera = new Image();
imgTijera.src = "assets/pixil-frame-0 (2).png";

const imagenesCarrusel = [imgPiedra, imgPapel, imgTijera];

const rCentroX = 400;
const rCentroY = 300;
let rAnguloActual = 0;
let rVelocidad = 0;
const rFriccion = 0.98;
let rGirando = false;
let ruletaOptions = [];

function Activar() {
    if (rGirando) return;

    estadoActual = 'RULETA'; 
    if (eleccionJugador === 'Piedra') {
        ruletaOptions = [
            "Fortificación (+Defensa)", "Producción Pesada (+HP)", "Asedio Absoluto", 
            "Fortificación (+Defensa)", "Producción Pesada (+HP)", "Asedio Absoluto"
        ];
    } else if (eleccionJugador === 'Tijera') {
        ruletaOptions = [
            "Daño Colateral", "Sacrificio Táctico", "Emboscada Posicional", 
            "Reutilización Inmediata", "Guerra de Desgaste"
        ];
    } else if (eleccionJugador === 'Papel') {
        ruletaOptions = [
            "Niebla/Espionaje", "Modificación de Costos", "Bloqueo de Zona", 
            "Control de Iniciativa", "Sifón Económico"
        ];
    }
    rVelocidad = Math.random() * 0.3 + 0.2; 
    rGirando = true;
    bucleRuleta();
}

function bucleRuleta() {
    ctx.clearRect(0, 0, 800, 600); 

    actualizarFisicaRuleta();
    dibujarRuleta();

    if (rGirando) {
        requestAnimationFrame(bucleRuleta);
    }
}

function dibujarRuleta() {
    ctx.save();
    ctx.translate(rCentroX, rCentroY);
    ctx.rotate(rAnguloActual);
    ctx.drawImage(imgRuleta, -200, -200, 400, 400); 
    ctx.restore();

    ctx.drawImage(imgFlecha, rCentroX - 25, rCentroY - 220, 50, 50);
}

function actualizarFisicaRuleta() {
    if (rGirando) {
        rAnguloActual += rVelocidad;
        rVelocidad *= rFriccion;

        if (rVelocidad < 0.001) {
            rVelocidad = 0;
            rGirando = false;
            calcularPremioRuleta();
        }
    }
}

function calcularPremioRuleta() {
    if (ruletaOptions.length === 0) return;

    const numOpciones = ruletaOptions.length;
    const arco = (2 * Math.PI) / numOpciones;

    const anguloNormalizado = (3 * Math.PI / 2 - rAnguloActual) % (2 * Math.PI);
    const anguloPositivo = anguloNormalizado < 0 ? anguloNormalizado + (2 * Math.PI) : anguloNormalizado;
    
    const indiceGanador = Math.floor(anguloPositivo / arco);
    const premio = ruletaOptions[indiceGanador];
    
    registroResultado = `¡Ruleta: ${premio}!`;
    console.log(registroResultado);

    setTimeout(() => {
        estadoActual = 'JUEGO';
        dibujar(); 
    }, 2000);
}
