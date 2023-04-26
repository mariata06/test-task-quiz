const quiz = document.querySelector('.quiz');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const formBtn = document.querySelector('.form-btn');
const step = document.querySelectorAll('.step');
const form = document.querySelector('.quiz__form')
const question = document.querySelectorAll('.question');
const phoneInput = document.querySelector('input[type=tel]');
const selectBtn = document.querySelectorAll('.select-btn');
const items = document.querySelectorAll('.form-control');

selectBtn.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    })    
})

////////////////////Init Quiz questions//////////////////////////////
function initRenderQuestion() {
    for (let i = 0; i < step.length; i++) {
        step[i].style.zIndex = step.length - i;
    }
}

initRenderQuestion();

////////////////////Change questions by clicking back-forward////////
let currentQuestion = 0;

function answerQuestion() {
    nextBtn.addEventListener('click', () => {
        for (let i = 0; i < step.length; i++) {
            if (Number(step[i].style.zIndex) === step.length) {
                step[i].style.zIndex = 1;
            } else {
                step[i].style.zIndex = Number(step[i].style.zIndex) + 1;
            } 
        }

        currentQuestion++;
        if (currentQuestion === step.length - 1) {
            nextBtn.style.display ='none';
            prevBtn.style.display = 'none';
        }

        if(currentQuestion === 1) {
            prevBtn.style.display = 'flex';
        }
    })

    prevBtn.addEventListener('click', () => {
        for (let i = 0; i < step.length; i++) {
            if (Number(step[i].style.zIndex) === 1) {
                step[i].style.zIndex = step.length;
            } else {
                step[i].style.zIndex = Number(step[i].style.zIndex) - 1;
            } 
        }

        currentQuestion--;
        if(currentQuestion === 0) {
            prevBtn.style.display = 'none';
        }
    })
}

answerQuestion();

////////////////////////////form submitting///////////////////////////
form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let formData = new FormData(form);
    for (let [key, value] of formData) {
        console.log(`${key} - ${value}`)
    }
})

///////////////////////start validate phone number/////////////////////
const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

phoneInput.addEventListener("input", () => {
  const value = phoneInput.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (phoneInput.value.includes("+8") || phoneInput.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }

  phoneInput.value = result;
});
///////////////////////end validate phone number/////////////////////