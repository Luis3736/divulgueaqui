const {EXCLUSIVIDADE, GENERAL, PROPOSTA, ENTRETENIMENTO} = imgs


function change_theme(){
    if (document.querySelector("body").style.backgroundColor == 'white'){
        //document.querySelector("main").style.backgroundColor = 'black'
        //document.querySelector("main").style.color = 'white'
        document.querySelector("body").style.backgroundColor = 'black'
        document.querySelector("body").style.color = 'white'
        document.querySelectorAll(".theme-img").forEach(function(span){
            span.src = 'static/imgs/icons/moon.png'
        })
        document.querySelectorAll("a").forEach(function(span){
            if (span.classList.contains('theme-white')){
                span.addEventListener('mouseover', function (){
                    span.classList.replace('theme-white', 'theme-black')
              })
            }
            else if (span.classList == 'ico-white'){
                span.classList = 'ico-black'
            }
        })
        document.querySelectorAll("tr").forEach(function(span){
            span.style.color = 'white'
        })
        localStorage.setItem('theme', 'black')
    }
    else{
        //document.querySelector("main").style.backgroundColor = 'white'
        //document.querySelector("main").style.color = 'black'
        document.querySelector("body").style.backgroundColor = 'white'
        document.querySelector("body").style.color = 'black'
        document.querySelectorAll(".theme-img").forEach(function(span){
            span.src = 'static/imgs/icons/sun.png'
        })
        document.querySelectorAll("a").forEach(function(span){
            if (span.classList.contains('theme-black')){
                span.addEventListener('mouseover', function (){
                    span.classList.replace('theme-black', 'theme-white')
              })
            }
            else if (span.classList == 'ico-black'){
                span.classList = 'ico-white'
            }
        })
        document.querySelectorAll("tr").forEach(function(span){
            span.style.color = 'black'
        })
        localStorage.setItem('theme', 'white')
    }
}

document.querySelectorAll(".theme").forEach(function(span){
    span.onclick = change_theme
})

document.addEventListener('DOMContentLoaded', function(){
    if (localStorage.getItem('theme') == 'black'){
        change_theme()
    }
})


function change_proposta_img(){
    if (document.location.pathname != '/'){return}
    (function myLoop(i){
        setTimeout(function(){
            document.querySelector('#proposta-img').src = 'static/imgs/channels/proposta/' + (i - 1) + '.png'
            if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 2000)
    })(PROPOSTA);
}

function change_general_img(){
    if (document.location.pathname != '/'){return}
    (function myLoop(i){
        setTimeout(function(){
            document.querySelector('#general-img').src = 'static/imgs/channels/general/' + (i - 1) + '.png'
            if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 2000)
    })(GENERAL);
}

function change_entretenimento_img(){
    if (document.location.pathname != '/'){return}
    (function myLoop(i){
        setTimeout(function(){
            document.querySelector('#entretenimento-img').src = 'static/imgs/channels/entretenimento/' + (i - 1) + '.png'
            if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 2000)
    })(ENTRETENIMENTO);
}

function change_exclusividade_img(){
    if (document.location.pathname != '/'){return}
    (function myLoop(i){
        setTimeout(function(){
            document.querySelector('#exclusividade-img').src = 'static/imgs/channels/exclusividade/' + (i - 1) + '.png'
            if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 2000)
    })(EXCLUSIVIDADE);
}

// Mudar layout para telas pequenas
function change_ss(){
    function load_divs(){
        let change = document.querySelectorAll('.change-for-ss')
        let importantes = []
        for (let i = 0; i < change.length; i++){
            let childs = change[i].childNodes
            for (let j = 0; j < childs.length; j++){
                //console.log(j, (typeof(childs[j].classList)), (typeof(childs[j].classList) !== typeof(undefined)))
                if ((typeof(childs[j].classList) !== typeof(undefined))){
                    importantes.push(j)
                }
            }
        }
        return [change, importantes]
    }

    if (document.querySelector('#btn-menu').checkVisibility()){
        let divs = document.querySelectorAll('.remove-for-ss')
        for (let i = 0; i < divs.length; i++){
            if (divs[i].classList.contains('d-flex')){
                divs[i].classList.remove('d-flex')
            }
        }

        let [change, importantes] = load_divs()
        for (let i = 0; i < change.length; i++){            
            if (change[i].childNodes[importantes[0]].classList.contains('changed') == false){
                right = change[i].childNodes[importantes[0]].cloneNode(true)
                left = change[i].childNodes[importantes[1]].cloneNode(true)

                change[i].childNodes[importantes[0]].remove()
                change[i].childNodes[importantes[1] - 1].remove()

                right.classList.add('changed')
                left.classList.add('changed')

                change[i].appendChild(left)
                change[i].appendChild(right)
            }
        }
    }
    else {
        let divs = document.querySelectorAll('.remove-for-ss')
        for (let i = 0; i < divs.length; i++){
            if (divs[i].classList.contains('d-flex') == false){
                divs[i].classList.add('d-flex')
            }
        }

        let [change, importantes] = load_divs()
        for (let i = 0; i < change.length; i++){            
            if (change[i].childNodes[importantes[0]].classList.contains('changed')){
                right = change[i].childNodes[importantes[0]].cloneNode(true)
                left = change[i].childNodes[importantes[1]].cloneNode(true)

                change[i].childNodes[importantes[0]].remove()
                change[i].childNodes[importantes[1] - 1].remove()

                right.classList.remove('changed')
                left.classList.remove('changed')

                change[i].appendChild(left)
                change[i].appendChild(right)
            }
        }
    }
}

change_proposta_img()
change_general_img()
change_entretenimento_img()
change_exclusividade_img()

window.setInterval(change_proposta_img, PROPOSTA * 2000)
window.setInterval(change_general_img, GENERAL * 2000)
window.setInterval(change_entretenimento_img, ENTRETENIMENTO * 2000)
window.setInterval(change_exclusividade_img, EXCLUSIVIDADE * 2000)
window.setInterval(change_ss, 500)
