'use strict'

// Seleciona os elementos do html
const form = document.querySelector("form");
const fieldset = document.querySelector("fieldset");
const result = document.querySelector(".numbers-wrapper");

// Seleciona os conteúdos do botão
const button = document.querySelector("button")
const buttonImg = document.querySelector("button img");
const buttonText = document.querySelector("button p");

// Seleciona o os textos
const textWrapper = document.querySelector(".text-wrapper")
const h3 = document.querySelector(".text-wrapper h3")
const paragraph = document.querySelector(".text-wrapper p")

// Seleciona os inputs
const inputs = document.querySelectorAll(".input-wrapper input");

const quantity = document.querySelector("#quantity");
const initial = document.querySelector("#initial");
const final = document.querySelector("#final");
const checkbox = document.getElementById("dont");

// formata os inputs
inputs.forEach((input) => {
  input.oninput = () => {
    input.value = input.value.replace(/[^0-9]/g, "") // Substitui tudo que não for número
  }
})

quantity.oninput = () =>{
  // garante que o número não seja maior que 10
  if(parseInt(quantity.value) > 10){
    quantity.value = 10
  }
}

initial.oninput = () =>{
  // garante que o número não seja maior que 100
  if(parseInt(initial.value) > 99){
    initial.value = 99
  }
}

final.oninput = () =>{
  // garante que o número não seja maior que 100
  if(parseInt(final.value) > 100){
    final.value = 100
  }
}

// conta quantas vezes o usuário enviou o form
  let submitCount = 0;

form.onsubmit = (e) =>{
  // não deixa a página recarregar
  e.preventDefault();
  submitCount++;

  textWrapper.classList.add("align-items")
  h3.textContent = "RESULTADO DO SORTEIO";
  paragraph.textContent = `${submitCount}º RESULTADO`;

  // pega os valores do input
  const initialValue = parseInt(initial.value);
  const finalValue = parseInt(final.value);

  //garante que o valor do primeiro seja menor
  const min = Math.min(initialValue, finalValue);
  const max = Math.max(initialValue, finalValue);

  // remove o fieldset após dar submit
  fieldset.remove();

  // Cria a section e adiciona uma classe
  const section = document.createElement("section");
  section.classList.add("numbers-inner");

  // Cria a div
  function newDiv(){
    const qtd = parseInt(quantity.value)


    const generatedNumbers = [] // armazena as divs para não se repetirem
    const divsToAppend = [] // Armazena as divs antes de adicioná-las

    let delay = 0 // Controla o tempo de delay entre as divs
    let timeouts = [] // Armazena os timeouts ativos para cancelá-los

    for (let i = 0; i < qtd; i++) {
      let randomNumber

      // Se o checkbox estiver checado, garante que o número não seja repetido
      if (checkbox.checked) {
        do {
          randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
        } while (generatedNumbers.includes(randomNumber)) // Verifica se o número já foi gerado
      } else {
        // Caso contrário, gera um número aleatório normalmente
        randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
      }

      // Adiciona o número ao array para controle
      generatedNumbers.push(randomNumber)

      // Cria a div
      const createDiv = document.createElement("div")
      const span = document.createElement("span")
      const resultado = document.createElement("p")
      resultado.textContent = randomNumber
      resultado.classList.add("numbers")

      createDiv.append(span, resultado)

      // Adiciona a div ao array para uso posterior
      divsToAppend.push(createDiv)

      let timeout = setTimeout(() => {
        section.append(createDiv)
      }, delay)

      // armazena o timeout na lista
      timeouts.push(timeout)

      // Aumenta o delay de 3.5 segundos para a próxima iteração
      delay += 3500
    }

    // Remove o delay caso clique na tela
    section.addEventListener("click", () => {
      delay = 0

      // cancela todos os timeouts pendentes
      timeouts.forEach(clearTimeout)
      timeouts = []

      // adiciona todas as divs imediatamente
      divsToAppend.forEach((div) => section.append(div))

      // Limpa a lista de divs pendentes
      divsToAppend.length = 0
    })
  }
  
  newDiv()
  
  // tira os resultados anteriores
  result.innerHTML= "";
  
  // adiciona section a div "result"
  result.append(section);
  
  
  // troca os elementos do botão 
  buttonText.textContent = "Sortear novamente";
  buttonImg.src = "./img/rerun.svg";
}

console.log(button.click());
