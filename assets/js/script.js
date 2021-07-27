const mlHora = 3600000
const mlMinutos = 60000

// Eventos
document.querySelector('.btn-calcular').addEventListener('click', calcular)
document.querySelector('.btn-copiar').addEventListener('click', copiar)
document.querySelector('.btn-calcular-novamente').addEventListener('click', novoCalculo)

// Funções
function calcular(e){
    e.preventDefault()
    const inicioAtend = document.querySelector('#hInicial').value.replace(':', '.').split('.')
    const finalAtend = document.querySelector('#hTermino').value.replace(':', '.').split('.')
    const hAlmoco = document.querySelector('#hAlmoco').value.replace(':', '.').split('.')
    const intervalo = parseInt(document.querySelector('#intervalo').value) * mlMinutos
    const qtAtendentes = parseInt(document.querySelector('#atendente').value)
    let calcMinutos = null
    let resultado = null
    let calcHora = ((parseInt(finalAtend[0]) - parseInt(inicioAtend[0])) - parseInt(hAlmoco[0])) * mlHora

        if(inicioAtend[1] === '00' && finalAtend[1] === '00' && hAlmoco[1]  === '00' ){
            resultado = calcHora / intervalo

        } else if(inicioAtend[1] !== '00' && finalAtend[1] === '00' && hAlmoco[1] === '00'){
            resultado = (calcHora - parseInt(inicioAtend[1] * mlMinutos)) / intervalo

        } else if(inicioAtend[1] !== '00' && finalAtend[1] === '00' && hAlmoco[1] !== '00'){
            calcMinutos = (parseInt(hAlmoco[1]) + parseInt(inicioAtend[1])) * mlMinutos
            resultado = (calcHora - calcMinutos) / intervalo 

        } else if(inicioAtend[1] !== '00' && finalAtend[1] !== '00' && hAlmoco[1] === '00') {
            calcMinutos = parseInt(finalAtend[1])  * mlMinutos
            resultado = ((calcHora + calcMinutos) - parseInt(inicioAtend[1]) * mlMinutos) / intervalo

        } else {
            let subtracao = (parseInt(inicioAtend[1]) + parseInt(hAlmoco[1])) * mlMinutos
            calcMinutos = parseInt(finalAtend[1])  * mlMinutos
            resultado = ((calcHora + calcMinutos) - subtracao ) / intervalo
        }    
    mostrarResultado(resultado, finalAtend[1], qtAtendentes, inicioAtend, finalAtend, hAlmoco, intervalo)
    ocultarTelas()
}

function mostrarResultado(resultado, horaFinal, atendentes, inicioAtend, finalAtend, hAlmoco, intervalo){
    let d = new Date()
    let data = `${checkData(d.getDate())}/${checkData(d.getMonth())}/${d.getFullYear()}`
    let hora = `${checkData(d.getHours())}:${checkData(d.getMinutes())}:${checkData(d.getSeconds())}`

if(horaFinal !== '00'){
    document.querySelector('#resultado').innerHTML =    
`Início de atendimento: ${inicioAtend} hrs.
Fim do atendimento: ${finalAtend} hrs.
Hora de almoço: ${hAlmoco} hrs.
Intervalo de atendimento: ${document.querySelector('#intervalo').value} minutos.
Quantidade de atendentes: ${atendentes}.
Atendimento por atendente: ${resultado + 1}.
Atendimento total por dia: ${(resultado * atendentes)  + 1}.
Data do cálculo: ${data}.
Hora do cálculo: ${hora}.





Desenvolvido por @julinhodev :)`                                   
    } else {
    document.querySelector('#resultado').innerHTML =    
`Início de atendimento: ${inicioAtend} hrs.
Fim do atendimento: ${finalAtend} hrs.
Hora de almoço: ${hAlmoco} hrs.
Intervalo de atendimento: ${document.querySelector('#intervalo').value} minutos.
Quantidade de atendentes: ${atendentes}.
Atendimento por atendente: ${resultado}.
Atendimento total por dia: ${resultado * atendentes}.
Data do cálculo: ${data}.
Hora do cálculo: ${hora}.





Desenvolvido por @julinhodev :)`     
    }
}

function copiar(e){
    e.preventDefault()
    document.querySelector('#resultado').select()
    document.execCommand('copy')
}

function checkData(data){
    return data < 10 ? `0${data}` : data
}

function ocultarTelas(){
    document.querySelectorAll('fieldset').forEach(item => {
        item.style.display = 'none'
    })
    document.querySelector('.btn-calcular').style.display = 'none'
    document.querySelector('.textArea').style.display = 'block'
    document.querySelector('.btn-copiar').style.display = 'block'
    document.querySelector('.btn-calcular-novamente').style.display = 'block'
}

function novoCalculo(e){
    e.preventDefault()
    document.querySelectorAll('fieldset').forEach(item => {
        item.style.display = 'block'
    })
    document.querySelector('.btn-calcular').style.display = 'block'
    document.querySelector('.textArea').style.display = 'none'
    document.querySelector('.btn-copiar').style.display = 'none'
    document.querySelector('.btn-calcular-novamente').style.display = 'none'
}
