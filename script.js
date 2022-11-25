let leftButton = document.querySelectorAll(".left button");
let rightButton = document.querySelectorAll(".right button");

let leftInput = document.querySelector(".left input");
let rightInput = document.querySelector(".right input");

let leftText = document.querySelector(".left .price p");
let rightText = document.querySelector(".right .price p");

let base = 'RUB';
let symbols = 'USD';
window.addEventListener('load', e => fetchRight (base, symbols));

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

leftInput.addEventListener('input', () => {
    fetchRight(base, symbols);
});

rightInput.addEventListener('input', () => {
    fetchLeft(base, symbols);
});

function api(buttonParent) {
    if (buttonParent == 'leftValueButtons') {
        fetchLeft(base, symbols);
    }
    if (buttonParent == 'rightValueButtons') {
        fetchRight(base, symbols)
    }
};

function fetchLeft(baseValue, symbolsValue) {
    if (baseValue != symbolsValue) {
        fetch(`https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`)
        .then((res) => {
            return res.json();
        }).then((data) => {
            if(rightInput.value==''){
                    leftInput.value='';
            }else{
                leftInput.value = rightInput.value.replace(/\s+/g, '') * data.rates[`${baseValue}`]
            }
            rightText.innerHTML = `1 ${data.base} = ${data.rates[`${baseValue}`]} ${baseValue}`;
            
            fetch(`https://api.exchangerate.host/latest?base=${baseValue}&symbols=${symbolsValue}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                leftText.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsValue}`]} ${symbolsValue}`;
            })
            })
        }else if (baseValue == symbolsValue) {
            fetch(`https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                if(rightInput.value==''){
                    leftInput.value='';
                }else{
                    leftInput.value = rightInput.value.replace(/\s+/g, '') * data.rates[`${baseValue}`]
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

function fetchRight(baseValue, symbolsValue) {
    if (baseValue != symbolsValue) {
        fetch(`https://api.exchangerate.host/latest?base=${baseValue}&symbols=${symbolsValue}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(leftInput.value==''){
                    rightInput.value='';
                }
                else{
                    rightInput.value = leftInput.value.replace(/\s+/g, '') * data.rates[`${symbolsValue}`];
                }
                leftText.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsValue}`]} ${symbolsValue}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        rightText.innerHTML = `1 ${data.base} = ${data.rates[`${baseValue}`]} ${baseValue}`;
                    });
            });
    }
    else if (baseValue == symbolsValue) {
        fetch(
            `https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(leftInput.value==''){
                    rightInput.value='';
                }
                else{
                    rightInput.value = leftInput.value.replace(/\s+/g, '') * data.rates[`${symbolsValue}`];
                }
                rightText.innerHTML = `1 ${data.base} = ${data.rates[`${baseValue}`]
                    } ${baseValue}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${symbolsValue}&symbols=${baseValue}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        leftText.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsValue}`]
                            } ${symbolsValue}`;
                    });
            })
    }
}

function maskInputFunction(inp){
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
maskInputFunction(leftInput)
maskInputFunction(rightInput)
