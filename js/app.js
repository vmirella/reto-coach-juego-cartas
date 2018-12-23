/*
Cartas del 1 al 13
Palos: D = diamantes, C = corazones, E = espadas y T = treboles
Ejemplo de carta: 4D - 4T - 13E - 5C 
 */

 const generateNumCard = () => {
  numCard = console.log(Math.round(Math.random() * (13 - 1) + 1));
  return numCard;
 }

 const generateStickCard = () => {
  //Donde c = 1, D = 2, E = 3 y T = 4
  numStickCard = console.log(Math.round(Math.random() * (4 - 1) + 1));

  switch(stickCard) {
    case 1: stickCard = 'C'; break;
    case 2: stickCard = 'D'; break;
    case 3: stickCard = 'E'; break;
    case 4: stickCard = 'T'; break;
  }
  return stickCard;  
}
 //Devuelve un arreglo con 4 cartas no repetidas
 const generateCards = () => {
  
}

 generateCards();