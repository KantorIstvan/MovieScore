let questionNames = [
  "Teljesítette a film az elvárásaidat?",
  "Milyen hosszú volt a film?",
  "Mennyire kötött le?",
  "Voltak-e benne jó jelenetek?",
  "Jó volt-e a soundtrack?",
  "Érzelmileg kötődsz a filmhez?",
  "Mennyire élvezted a filmet?",
  "Mennyire hatott meg a film?",
  "Mennyire volt szép a képi világ?",
  "Érdekes volt-e a történet?",
  "Milyenek voltak a színészi alakítások?",
  "Szívesen néznéd újra?",
  "Egyedi valamilyen szempontból?",
  "Tanultál valamit belőle?",
  "Tippelve hirtelen mennyire pontoznád?",
];
let ratings = Array(questionNames.length).fill(0);
let multipliers = [2, 2, 4, 2, 3, 5, 5, 5, 4, 5, 5, 5, 2, 3, 10];

let sum = 0;
for (let i = 0; i < multipliers.length; i++) {
  sum += multipliers[i] * 10;
}
console.log(sum);

let html = "";

for (let i = 0; i < questionNames.length; i++) {
  html += `
      <div class="question-block">
        <p class ="question" >${i + 1}. ${questionNames[i]}</p>
        <div class="radio-block">`;

  for (let j = 1; j <= 10; j++) {
    html += `
            <div class="radio-option">
              <input type="radio" id="answer${i}_${j}" name="${questionNames[i]}" value="${j}" />
              <label for="answer${i}_${j}">
                <i class="fas fa-star"></i>
                <div>${j}</div>
              </label>
            </div>`;
  }

  html += `
        </div>
      </div>`;
}

document.getElementById("questions").innerHTML = html;

let labels = document.querySelectorAll("label");
let clickedIndex = -1;

labels.forEach((label, index) => {
  // Add hover event listener
  label.addEventListener("mouseover", function () {
    let groupIndex = Math.floor(index / 10);
    let withinGroupIndex = index % 10;
    for (
      let i = groupIndex * 10;
      i <= withinGroupIndex + groupIndex * 10;
      i++
    ) {
      labels[i].style.color = "yellow";
    }
  });

  // Add click event listener
  label.addEventListener("click", function () {
    clickedIndex = index;
    let groupIndex = Math.floor(index / 10);
    let withinGroupIndex = index % 10;
    for (
      let i = groupIndex * 10;
      i <= withinGroupIndex + groupIndex * 10;
      i++
    ) {
      labels[i].style.color = "yellow";
    }
  });

  // Modify mouseout event listener to not remove highlight if label has been clicked
  label.addEventListener("mouseout", function () {
    if (index <= clickedIndex) {
      return;
    }
    let groupIndex = Math.floor(index / 10);
    let withinGroupIndex = index % 10;
    for (
      let i = groupIndex * 10;
      i <= withinGroupIndex + groupIndex * 10;
      i++
    ) {
      labels[i].style.color = "";
    }
  });
});

let radios = document.querySelectorAll('input[type="radio"]');

radios.forEach((radio, index) => {
  radio.addEventListener("change", function () {
    ratings[Math.floor(index / 10)] =
      parseInt(radio.value, 10) * multipliers[Math.floor(index / 10)];
  });

  // Add hover event listener
  radio.addEventListener("mouseover", function () {
    let groupIndex = Math.floor(index / 10);
    let withinGroupIndex = index % 10;
    for (
      let i = groupIndex * 10;
      i <= withinGroupIndex + groupIndex * 10;
      i++
    ) {
      radios[i].nextElementSibling.style.color = "yellow";
    }
  });

  // Add mouseout event listener to remove highlight
  radio.addEventListener("mouseout", function () {
    let groupIndex = Math.floor(index / 10);
    let withinGroupIndex = index % 10;
    for (
      let i = groupIndex * 10;
      i <= withinGroupIndex + groupIndex * 10;
      i++
    ) {
      radios[i].nextElementSibling.style.color = "";
    }
  });
});

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  let totalRating = (ratings.reduce((a, b) => a + b, 0) / 620) * 10;
  totalRating = totalRating.toFixed(1);

  let result = document.querySelector(".result");
  result.textContent = totalRating;
  console.log(totalRating);

  document.body.scrollIntoView({ behavior: "smooth", block: "end" });
});
