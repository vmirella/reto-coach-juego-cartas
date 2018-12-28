/*
Cartas del 1 al 13
Palos: D = diamantes, C = corazones, E = espadas y T = treboles
Ejemplo de carta: 4D - 4T - 13E - 5C 
 */

 const generateNumCard = () => {
  numCard = Math.round(Math.random() * (13 - 1) + 1);
  return numCard;
 }

 const generateStickCard = () => {
  //Donde c = 1, D = 2, E = 3 y T = 4
  numStickCard = Math.round(Math.random() * (4 - 1) + 1);
  let stickCard;
  switch(numStickCard) {
    case 1: stickCard = 'C'; break;
    case 2: stickCard = 'D'; break;
    case 3: stickCard = 'E'; break;
    case 4: stickCard = 'T'; break;
  }
  return stickCard;  
}

//Devuelve un arreglo con 4 cartas no repetidas
const generateCards = () => {
  const arrayFourCards = [];
  
  for (let i = 0; i < 4; i++){
    let flag = 0; //0- no encontrado, 1 - es encontrado
    do {
      let numCard = generateNumCard();
      let stickCard = generateStickCard();
      let valueCard = numCard + stickCard;
      if(arrayFourCards.indexOf(valueCard) === -1) {
        //pusheamos 2 veces la misma carta para tener su pareja
        arrayFourCards.push(valueCard);
        arrayFourCards.push(valueCard);
        flag = 0;
      }
      else {
        flag = 1;
      }
    }
    while (flag === 1);
  }
  //Ordenando aleatoriamente el array
  for(let i = 0; i < 20; i++) {
    arrayFourCards.sort(() => Math.random() - 0.5);
  } 

  return arrayFourCards;
}

const generateImages = () => {
  const cards = generateCards();
  const arrayCards = [];

  for(let i = 0; i < cards.length; i++) {
    let card = {
      id: i,
      image: 'img/' + cards[i] + '.jpg',
      rotate: false,
      hidden: false
    };

    arrayCards.push(card);
  }

  return arrayCards;
}


let table = new Vue({
  el: '#table',
  data: {
    title: 'Vamos a jugar!',
    cards: generateImages(),
    count: 0,
    lastId: '',
    finishGame: false,
    resetGame: false,
    points: 50
  },
  methods: {
    reset: function() {
      this.resetGame = true;
      this.title = 'Vamos a jugar!';
      this.cards = generateImages();
      this.count = 0;
      this.lastId = '';
      this.finishGame = false; 
      this.points = 50;
      
      //resetGame oculta el tablero por un segundo para evitar que se vean las nuevas cartas generadas
      let vm = this;
      setTimeout(function(){
        vm.resetGame = false;
      }, 1000);
    },
    rotateCard: function(id) {
      if (this.cards[id].rotate === true || this.points <= 0) {
        return;
      }      
      
      if (this.count < 2) { 
        this.count++;
        this.cards[id].rotate = true;
        if (this.count === 1) {
          this.lastId =  id;
        }
        else if (this.count === 2) {
          //vm = vue model
          let vm = this;
          setTimeout(function(){
            if (vm.cards[id].image === vm.cards[vm.lastId].image) {
              vm.cards[id].hidden = true;
              vm.cards[vm.lastId].hidden = true;
              console.log('iguales');
              //Añadir 20 puntos
              vm.points += 20;
              //Verificando si todas las cartas estan ocultas
              vm.finishGame = true;
              for (let i= 0; i < vm.cards.length; i++) {
                if (vm.cards[i].hidden  === false) {
                  vm.finishGame = false;
                }
              }

              if (vm.finishGame === true) {
                vm.title = 'Ganaste';
              }
            }
            else {
              vm.cards[id].rotate = false;
              vm.cards[vm.lastId].rotate = false;
              console.log('diferentes');
              //Reducir 10 puntos 
              vm.points -= 10;
              if (vm.points <= 0) {
                vm.title = 'Te quedaste sin puntos';
              }
            }
  
            vm.count = 0;
          }, 1200);
          
        }
      }
    }
  }
})