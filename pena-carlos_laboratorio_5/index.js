((Utils)=> {
    const App = {
        HTMLElement : {
            form : document.getElementById("formulario"),
            input : document.getElementById("numero"),
            cards : document.getElementById("cards"),
        },
        init : () => {
            App.HTMLElement.form.addEventListener("submit",App.handlers.onFormSubmit),
            App.HTMLElement.cards.addEventListener("click",App.handlers.onCardsClick)
        },
        utils: {
            ...Utils.methods
        },
        templates : {
            card: (item,index) =>{
                return `<div id="${index}" class="card">
                <div class="close"><p title="cerrar" class="close-item" >X</p></div>
                <div class="info"><p title="click para cerrar" class="card-item">${item}</p></div>
                </div>`
            }
        },
        handlers : {
            onFormSubmit : (e) => {
                e.preventDefault();
                App.HTMLElement.cards.innerHTML = '';
                let number = App.HTMLElement.input.value;
                App.utils.fibonacci(number).forEach((item, index) => {
                    App.HTMLElement.cards.innerHTML += App.templates.card(item,index);
                });
            },
            onCardsClick : (e) => {
                let card = document.getElementById(index)

                if(e.target.className == 'card-item'){
                    //ocultar icono de cerrar de tarjetas activadas            
                    card.children[0].style.visibility = 'hidden';
                    //asigno el id del nodo padre           
                    index = e.target.parentNode.parentNode.id
                    //busco tarjeta por su id, 
                    card = document.getElementById(index);
                    //y hago visible el icono para cerrar
                    card.children[0].style.visibility = 'visible';
                }

                if(e.target.className === 'close-item'){
                    //muestra mensaje de confirmacion
                    let response = window.confirm("Estas seguro de eliminar la tarjeta seleccionada?")
                    //comrpueba respuesta
                    if(response){
                        card.remove();
                    }                   
                    card.children[0].style.visibility = 'hidden';
                    index =0;
                }
            }      
        }
    };
    App.init();
    var index = 0;
})(document.Utils)