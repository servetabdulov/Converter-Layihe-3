let leftButton = document.querySelectorAll(".left button");
let rightButton = document.querySelectorAll(".right button");

let leftInput = document.querySelector(".left input");
let rightInput = document.querySelector(".right input");

let leftText = document.querySelector(".left .price p");
let rightText = document.querySelector(".right .price p");

let base = 'RUB';
let symbols = 'USD';
window.addEventListener('load', e => FetchR (base, symbols));

function showButton() {
    leftButton.forEach(elements => {
        elements.addEventListener('click', () => {
            leftButton.forEach(x => x.classList.remove('actived'));
            elements.classList.add('actived');
            base = elements.value;
            api(elements.parentElement.classList[0])
        })
    })
    rightButton.forEach(elements => {
        elements.addEventListener("click", () => {
            rightButton.forEach(x => x.classList.remove('actived'));
            elements.classList.add('actived');
            symbols = elements.value;
            api(elements.parentElement.classList[0])
        })
    })
};
showButton();

leftInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.split(',').join('.');
    FetchR(base, symbols);
});

rightInput.addEventListener('input', () => {
    FetchL(base, symbols);
});

function api(buttonParent) {
    if (buttonParent == 'leftValueButtons') {

        FetchL(base, symbols);
    }
    if (buttonParent == 'rightValueButtons') {
        FetchR(base, symbols)
    }
};

function leftInput(inp){
    var numberMask = IMask(inp,{
      mask: Number, 
      scale: 6,  
      signed: false,  
      thousandsSeparator:' ',  
      padFractionalZeros: false,  
      normalizeZeros: true,  
      radix: '.',  
      mapToRadix: ['.'],  
    })
}
leftInput(leftInput);

function rightInput(inp){
  var numberMask = IMask(inp,{
    mask: Number, 
    scale: 6,  
    signed: false,  
    thousandsSeparator:' ',  
    padFractionalZeros: false,  
    normalizeZeros: true,  
    radix: '.',  
    mapToRadix: ['.'],  
  })
}
rightInput(rightInput);

function FetchL(baseValue, symbolsValue) {
    if (baseValue != symbolsValue) {
        fetch(`https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`)
        .then((res) => {
            return res.json();
        }).then((data) => {
            if(rightInput.value==''){
                    leftInput.value='';
            }else{
                leftInput.value = rightInput.value.replace(/\s+/g, '') * data.rates[`${baseValue}`]
                leftInput(leftInput)
            }
            rightText.innerHTML = `1 ${data.base} = ${data.rates[`${baseValue}`]} ${baseValue}`;
            
            fetch(`https://api.exchangerate.host/latest?base=${baseValue}&symbols=${symbolsValue}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                leftText.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsValue}`]} ${symbolsValue}`;
            })
            });
        }else if (baseValue == symbolsValue) {
            fetch(`https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                if(rightInput.value==''){
                    leftInput.value='';
                }else{
                    leftInput.value = rightInput.value.replace(/\s+/g, '') * data.rates[`${baseValue}`]
                    leftInput(leftInput);
                }
                leftText.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsValue}`]} ${symbolsValue}`;
                fetch(`https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`)
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    rightText.innerHTML = `1 ${data.base} = ${data.rates[`${baseValue}`]} ${baseValue}`;
                });
            })
    }
}