async function fetchData() {
  try {
    const storedData = localStorage.getItem("vocabularyData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}

async function displayRandomWord() {
  const data = await fetchData();

  if (data.length === 0) {
    document.getElementById("word").innerText = "Không có dữ liệu từ vựng.";
    document.getElementById("meaning").innerText = "";
    document.getElementById("example").innerText = "";
    return;
  }

  const cardInner = document.querySelector(".card-inner");
  if (cardInner.classList.contains("flipped")) {
    cardInner.classList.remove("flipped");
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomWord = data[randomIndex];
  document.getElementById("word").innerText = randomWord.word;
  document.getElementById("meaning").innerText = randomWord.meaning;
  document.getElementById("example").innerText = randomWord.example;
}

function toggleFlip() {
  document.querySelector(".card-inner").classList.toggle("flipped");
}

document.addEventListener("DOMContentLoaded", displayRandomWord);
