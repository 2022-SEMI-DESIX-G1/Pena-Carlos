var myFunc = function() {
    
    const form = document.getElementById("formulario");
    const input = document.getElementById("numero");
    const cards = document.getElementById("cards");
    var array = [];

    var numero = (e => {
        e.preventDefault();
        let num = parseInt(input.value)
        
        if(num = parseInt(input.value)){
            fibonacci(num)
        }
        else{
            input.value = "";
        }
    });

    function fibonacci(size){

        array = [0,1];
        for(let s = 0; s <size-2;s++){
            array.push(array[s]+array[s+1]);
        }
        
        print(array);
    }

    function print(array){

        let script = ``;
        array.forEach((item,index) => {
            script +=   `<div id="${index}" class="card">
            <div class="close"><p title="cerrar" class="close-item" >X</p></div>
            <div class="info"><p title="click para cerrar" class="card-item">${item}</p></div>
            </div>`
        });

        cards.innerHTML = script;
    }

    var card_delete = (item => {
        array.splice(item,1)
        print(array);
    });

    //variable que me permite controlar el id, de las tarjetas
    var index = 0;
    var eliminar = (e => {   
        let card = document.getElementById(index);
        //filtro elemento del evento
        if(e.originalTarget.className == 'card-item'){
            //ocultar icono de cerrar de tarjetas activadas            
            card.children[0].style.visibility = 'hidden';
            //asigno el id del nodo padre           
            index = e.target.parentNode.parentNode.id
            //busco tarjeta por su id, 
            card = document.getElementById(index);
            //y hago visible el icono para cerrar
            card.children[0].style.visibility = 'visible';
        }
        
        if(e.originalTarget.className === 'close-item'){
            //muestra mensaje de confirmacion
            let response = confirm("Estas seguro de eliminar la tarjeta seleccionada?")
            //comrpueba respuesta
            if(response){
                card_delete(index)
            }
            else{
                card.children[0].style.visibility = 'hidden';
            }
            //
            index =0;
        }
    });

    cards.addEventListener("click",eliminar);    
    form.addEventListener("submit",numero);
 }();