async function fetchData() {
  try {
    const storedData = localStorage.getItem("vocabularyData");
    let data = storedData ? JSON.parse(storedData) : [];
    data = data.map((item) => {
      if (!item.hasOwnProperty("learned")) {
        item.learned = false;
      }
      return item;
    });
    localStorage.setItem("vocabularyData", JSON.stringify(data));
    return data;
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

  const showLearned = document.getElementById("showLearned").checked;

  let availableWords = data;
  if (!showLearned) {
    availableWords = data.filter((word) => !word.learned);
  }

  if (availableWords.length === 0) {
    document.getElementById("word").innerText = "Không có từ vựng phù hợp.";
    document.getElementById("meaning").innerText = "";
    document.getElementById("example").innerText = "";
    return;
  }

  const cardInner = document.querySelector(".card-inner");
  if (cardInner.classList.contains("flipped")) {
    cardInner.classList.remove("flipped");
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const randomWord = availableWords[randomIndex];
  document.getElementById("word").innerText = randomWord.word;
  document.getElementById("meaning").innerText = randomWord.meaning;
  document.getElementById("example").innerText = randomWord.example;

  if (randomWord.learned) {
    document.querySelector(".card-front").classList.add("learned");
  } else {
    document.querySelector(".card-front").classList.remove("learned");
  }
}

async function markAsLearned() {
  const data = await fetchData();
  const currentWord = document.getElementById("word").innerText;

  const wordToUpdate = data.find((item) => item.word === currentWord);
  if (wordToUpdate) {
    wordToUpdate.learned = true;
    document.querySelector(".card-front").classList.add("learned");
    localStorage.setItem("vocabularyData", JSON.stringify(data));
  }
}

function toggleFlip() {
  document.querySelector(".card-inner").classList.toggle("flipped");
}

document.addEventListener("DOMContentLoaded", displayRandomWord);
