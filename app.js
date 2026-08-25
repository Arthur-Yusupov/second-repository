let field = document.querySelector('.field')
let currentColor = '#9AD2CB'
let tools = document.querySelector('.tools')
let isDraw = false
let pict = document.querySelector('.picture')
let tempResult = getResultFromCookie()
let save = document.querySelector('.save')

const COLORS = [
    'black',
    'rgb(154, 210, 203)',
    'rgb(215, 235, 186)',
    'rgb(254, 255, 190)',
    'rgb(235, 212, 148)',
    'rgb(71, 40, 54)',
]
for (let i = 0; i < 450; i += 1){
    let cell = document.createElement('div')
    cell.style.backgroundColor = COLORS[parseInt(tempResult[i])]
    cell.classList.add('cell')
    field.append(cell)
}
field.addEventListener("mouseover", function(e){
    console.log(e.target)
    if(e.target.classList.contains('cell') && isDraw){
        e.target.style.backgroundColor = currentColor
    }
})
field.addEventListener("click", function(e){
    if(e.target.classList.contains('cell')){
        e.target.style.backgroundColor = currentColor
    }
})
save.addEventListener("click", function(){
    domtoimage.toJpeg(field, { quality: 2 })
    .then(function(dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
})
tools.addEventListener("click", function(e){
    if (e.target.classList.contains('square1')){
        currentColor = '#9AD2CB'
    }
    if (e.target.classList.contains('square2')){
        currentColor = '#D7EBBA'
    }
    if (e.target.classList.contains('square3')){
        currentColor = '#FEFFBE'
    }
    if (e.target.classList.contains('square4')){
        currentColor = '#EBD494'
    }
    if (e.target.classList.contains('square5')){
        currentColor = '#472836'
    }
    if (e.target.classList.contains('picture')){
        currentColor = 'black'
    }
    if (e.target.classList.contains('fill')){
        let cells = document.querySelectorAll('.cell')
        for (let cel of cells){
            cel.style.backgroundColor = currentColor
        }
    }
})
document.addEventListener('mousedown', function(){
    isDraw = true
})
document.addEventListener('mouseup', function(){
    isDraw = false 
})

setInterval(function(){
    let cells = document.querySelectorAll('.cell')
    let result = ""   
    for(let ce of cells){
        let color = ce.style.backgroundColor
        console.log(color)
        let colorIndex = COLORS.indexOf(color)
        result += colorIndex
    }
    document.cookie = `result-name=${result}; max-age=1000000`
}, 5000)
function getResultFromCookie(){
    let cookies = document.cookie.split('; ')
    for (let cookie of cookies){
        let [nameCookie, valueCookie] = cookie.split('=')
        if (nameCookie === 'result-name'){
            return valueCookie
        }
    }
    return '0'.repeat(450)
}