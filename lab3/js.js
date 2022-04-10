/*1- Escribir una función que, dada una cadena "t", 
retorne si un número es un palíndromo de doble base o no. 
(Palíndromo en base 10 y base 2) */

function  doublePalindrome() {

    let a = parseInt(document.getElementById('primero').value);    
    let res = document.getElementById('res1');

    const p1 = a.toString().split("").reverse().join("") === a.toString();
    const p2 = a.toString(2).split("").reverse().join("") === a.toString(2);
    res.textContent = (p1 == true && p2 == true) ? "Es palindromo de doble base":"No es Palindromo";
}

/*2- Escribir una función que, dada una cadena "t",
 retorne la cantidad de caracteres de la cadena. */

function count() {
    let str = document.getElementById('segundo').value;   
    let res = document.getElementById('res2');

    const array = {};

    for(let s in str){
        if(str[s] in array){
            array[str[s]]++;
        }
        else {
            array[str[s]] = 1;
        }
    }

    let resp = '';
    Object.keys(array).forEach(e => {
        resp = resp.concat(`${array[e]} ${e}, `)
    })

    
    res.textContent =  resp;
}

/*3- Escribir una función que, dado un año "a", retorne si ese año es bisiesto o no. */

function leap_year () {

    let year = parseInt(document.getElementById('tercero').value);   
    let res = document.getElementById('res3');

    res.textContent= year%4 === 0 ? "Año Bisiesto" : "No año bisiesto";
}


/*4- Escribir una función que, dado un número "n" ( 0 < n < 1000000), retorne la 
sumatoria de todos los número primos debajo de ese número. */

function add () {

    let x = document.getElementById('cuarto').value;
    let res = document.getElementById('res4');

    let total = 0;
   if(x <= 1000000){
       for(let i = 1 ; i<=x; i++){

            if(isCousin(i)){
                total+= i;
            }
       }
   }
   res.textContent = `Resultado : ${total}`;
}

function isCousin(num){
    
    for(let x = 2; x < num; x ++){
        
        if(num % x == 0) return false;
    }
    return true;
}