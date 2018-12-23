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
        arrayFourCards.push(valueCard);
        flag = 0;
      }
      else {
        flag = 1;
      }
    }
    while (flag === 1);
  }
  return arrayFourCards;
}

 generateCards();