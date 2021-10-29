//variaveis de Started
//order array que armazena a ordem das cores
let order = [];
//clickedOrder array que armazena a ordem que foi clicado
let clickedOrder = [];
//score marca a pontuação de acerto
let score = 0;

/**
 * 0 -> verde
 * 1 -> vermelho
 * 2 -> amarelo
 * 3 -> azul
 */

//aqui seleciona a class no css através do uso do DOM, com o document.querySelector
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//função que faz a seleção aleatória das cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
//acena a próxima cor a ser selecionada
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 150);

    setTimeout(() => {
        element.classList.remove('selected');
    });
}
//verifica se a ordem que o jogador clicou está correta e indica a pontuação dele
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou ! Iniciando próximo nível`);
        nextLevel();
    }
}

//função para o click do jogador
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//criar função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}
//função para próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//função de jogo perdido, ela emite um alert e reinicia o jogo
gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo\nclique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//função de inicio de jogo
let playGame = () => {
    alert('Bem Vindo ao Genius, vamos iniciar o jogo')
    score = 0;
    nextLevel();
}

//evento de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// green.addEventListener('click', click(0));
// red.addEventListener('click', click(1));
// yellow.addEventListener('click', click(2));
// blue.addEventListener('click', click(3));

//inicio da partida
playGame();