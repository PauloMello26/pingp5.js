//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variaveis de velocidade
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;   
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar
let meusPontos = 0;
let pontosOponente = 0;

let colidiu = false;

let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  desenhaBolinha();
  movimentaBolinha();
  limiteDaBorda();
  desenhaRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoBiblioteca(xRaquete, yRaquete);
  desenhaRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function desenhaBolinha(){
   circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha(){ 
  xBolinha += velocidadeXBolinha;
  yBolinha+= velocidadeYBolinha;
} 

function limiteDaBorda(){
  
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;  
   }
}

function desenhaRaquete(x,y){
  rect(x, y, comprimentoRaquete, alturaRaquete)
} 


function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
}
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
 }
  
  
}

function colisaoRaquete(){
  if(xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
  }
}

function colisaoBiblioteca(x, y){
  colidiu =
  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha,raio);
  if(colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

/*função para movimentar a raquete do oponente com 1 jogador
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete /2 -30
  yRaqueteOponente += velocidadeYOponente + chanceDeErra
calculaChanceDeErrar()
}*/

function movimentaRaqueteOponente(){
    if(keyIsDown(87)){
    yRaqueteOponente -= 10;
}
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
 }
  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect (150, 10, 40, 20);
  fill(255);
  text (meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill (255);
  text (pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
  
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
