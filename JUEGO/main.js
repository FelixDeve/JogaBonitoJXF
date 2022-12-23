//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let Movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerInicial = timer;
let tiempoRegresivoId = null;

//Apuntado a documento html

//Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {return Math.random()-0.5});
console.log(numeros);

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            let loseAudio = new Audio('./sounds/lose.wav');
            loseAudio.play();
        }
    },1000);
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png"/>`;
        tarjetaBloqueada.disabled = true;
    }
}


//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png"/>`;
        let clickAudio = new Audio('./sounds/select.wav');
        clickAudio.play();
        //Desabilitar primer boton
        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png"/>`;
        
        //Desabilitar segundo boton
        tarjeta2.disabled = true;
        
        //incrementar movimientos
        Movimientos++;
        let mostrarMovimientos = document.getElementById('Movimientos');
        mostrarMovimientos.innerHTML = `Movimientos ${Movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerrar contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            let rigthAudio = new Audio('./sounds/rigth.wav');
            rigthAudio.play();

            if(aciertos == 8){
                let winAudio = new Audio('./sounds/win.wav');
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                let mostrarAciertos = document.getElementById('aciertos');
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😋`
                
                let mostrarTiempo = document.getElementById('t-restantes');
                mostrarTiempo.innerHTML = `Fantastico!! 🥳 solo demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${Movimientos}`;
            }
        }else{
            let wrongAudio = new Audio('./sounds/wrong.wav');
            wrongAudio.play();
            //Mostrar Momentaneament valores y volver a tapar
            setTimeout(() =>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}
