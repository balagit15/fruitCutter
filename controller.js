// Game variables

let bombTimer = 15; // Bomb defuse time (seconds)
let bombInterval;
let bombQuestionIndex = 0; // Track current bomb question index
let defuseProgress = 0; // Renamed score tracker to defuseProgress

// Bomb questions for defuse
const bombQuestions = [
  { 
    question: "In which year BIS (Bureau of Indian Standards) came into existence?", 
    options: ["1985", "1986", "1990"], 
    correct: 1
  },
  { 
    question:  "What is the logo of the Bureau of Indian Standards (BIS) known as?", 
    options:  ["ISI Mark", "BIS Logo", "Quality Mark"], 
    correct: 0
  }
  
];

// HTML elements
const bombContainer = document.getElementById('bomb-container');
const bombQuestionElem = document.getElementById('bomb-question');
const bombOptionsElem = document.getElementById('bomb-options');
const bombTimerElem = document.getElementById('bomb-timer');
const bombImageContainer = document.getElementById('bomb-image-container');
const bombImage = document.getElementById('bomb-image');
const gameOverContainer = document.getElementById('game-over-container');
const correctAnswerElem = document.getElementById('correct-answer');

// Function to spawn bomb image at a random location within the window's dimensions
function randomizeBombPosition() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Random position within the window's visible area
  const randomX = Math.floor(Math.random() * (windowWidth - bombImage.offsetWidth));
  const randomY = Math.floor(Math.random() * (windowHeight - bombImage.offsetHeight));

  bombImageContainer.style.left = `${randomX}px`;
  bombImageContainer.style.top = `${randomY}px`;
}

// Function to activate the bomb
function activateBomb() {
  // Show the bomb image (only one bomb image should appear)
  bombImageContainer.style.display = 'block';

  // Randomly place bomb image on the screen
  randomizeBombPosition();

  // Disable the normal MCQ quiz so the user can't interact with it
  disableNormalQuiz();

  // Alert the user that the bomb has spawned
  alert("A bomb has been activated! You need to defuse it!....Click the bomb to defuse it");

  // Add click event to bomb image for defuse
  bombImage.onclick = function () {
    bombImageContainer.style.display = 'none'; // Hide bomb image after click
    startBombDefuse();
  };

  // Add flash effect to the game over container (for dramatic effect)
  gameOverContainer.classList.add('flash-effect');
}

// Disable normal quiz interaction (disable fruit containers or quiz buttons)
function disableNormalQuiz() {
  const normalQuizButtons = document.querySelectorAll('.quiz-button');
  normalQuizButtons.forEach(button => button.disabled = true);

  // Disable fruit containers as well
  const fruitContainers = document.querySelectorAll('.fruit-container');
  fruitContainers.forEach(container => container.style.pointerEvents = 'none');
}

// Enable normal quiz interaction again after bomb defuse or game over
function enableNormalQuiz() {
  const normalQuizButtons = document.querySelectorAll('.quiz-button');
  normalQuizButtons.forEach(button => button.disabled = false);

  // Enable fruit containers again
  const fruitContainers = document.querySelectorAll('.fruit-container');
  fruitContainers.forEach(container => container.style.pointerEvents = 'auto');
}

// Function to start the bomb defuse scenario
function startBombDefuse() {
  bombContainer.style.display = 'block';
  gameOverContainer.style.display = 'none';
  displayBombQuestion();
  startBombTimer();
}

// Function to display bomb question and options
function displayBombQuestion() {
  const question = bombQuestions[bombQuestionIndex];
  bombQuestionElem.textContent = question.question;

  bombOptionsElem.innerHTML = ''; // Clear previous options
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkBombAnswer(index);
    bombOptionsElem.appendChild(button);
  });
}

// Function to start bomb timer countdown
function startBombTimer() {
  bombTimer = 30;
  bombInterval = setInterval(updateBombTimer, 1000);
}

// Function to update bomb timer every second
function updateBombTimer() {
  bombTimer--;
  bombTimerElem.textContent = `Time Left: ${bombTimer}s`;

  if (bombTimer <= 0) {
    clearInterval(bombInterval);
    handleBombFailure(); // Bomb exploded due to timeout
  }
}

// Function to check the player's answer for the bomb question
function checkBombAnswer(selectedIndex) {
  const question = bombQuestions[bombQuestionIndex];
  
  if (selectedIndex === question.correct) {
    defuseProgress++;  // Increment defuse progress instead of score
    bombQuestionIndex++;

    if (bombQuestionIndex < bombQuestions.length) {
      displayBombQuestion();
    } else {
      clearInterval(bombInterval);
      bombContainer.style.display = 'none';
      enableNormalQuiz(); // Re-enable normal MCQ quiz after bomb defuse
      alert("Bomb defused successfully! Continue with quiz.");
      gameOverContainer.classList.remove('flash-effect'); // Remove flash effect after defuse
    }
  } else {
    clearInterval(bombInterval);
    handleBombFailure(); // Bomb exploded due to wrong answer
  }
}

// Renamed function for bomb failure (when bomb explodes)
function handleBombFailure() {
  bombContainer.style.display = 'none';
  gameOverContainer.style.display = 'block';
  correctAnswerElem.textContent = `Correct Answer: ${bombQuestions[bombQuestionIndex].options[bombQuestions[bombQuestionIndex].correct]}`;
  enableNormalQuiz(); // Re-enable normal quiz buttons after game over
  gameOverContainer.classList.add('flash-effect'); // Remove flash effect after game over
}

// Function to reset the game
function resetGame() {
  bombQuestionIndex = 0;
  defuseProgress = 0; // Reset defuse progress
  startBombDefuse(); // Start bomb defuse again after restart
  gameOverContainer.style.display = 'none'; // Hide game over container
  bombContainer.style.display = 'none'; // Hide bomb container
}

// Call `activateBomb` periodically or based on some game logic
setTimeout(activateBomb, 10000);  // Spawn the bomb after 5 seconds












const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
  "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
  "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
  "#680060", "#60005f", "#48005f", "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

let score = 0;
let isGameOver = false;
let currentQuestionIndex = 0;
let questions = []; // Store fetched questions here
const middleY = window.innerHeight / 2;
const middleX = window.innerWidth / 2;
const leftX = window.innerWidth / 4;
const rightX = window.innerWidth * 3 / 4;
const fruitContainers = document.querySelectorAll('.fruit-container');
const fruitImages = [
  "images/apple2.png",
  "images/cherry.png",
  "images/strawberry.png",
  "images/grapes.png",
  "images/orange1.png",
  "images/watermelon1.png",
  "images/mango.png"
];

// HTML elements
const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score");

// Function to fetch questions from the backend
async function fetchQuestions() {
  try {
    const response = await fetch('http://localhost:5000/getQuestions');
    const data = await response.json();
    if (data && Array.isArray(data)) {
      questions = data; // Store fetched questions
      console.log("Questions fetched:", questions);
      updateQuestion(); // Make sure to update the question when fetched
    } else {
      console.error("Invalid question data format.");
      alert("Failed to load questions. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Failed to load questions. Please try again later.");
  }
}

// Function to reset fruit containers and move images from bottom to top
function resetFruitContainers() {
  const randomFruits = [];
  while (randomFruits.length < 3) {
    const randomIndex = Math.floor(Math.random() * fruitImages.length);
    if (!randomFruits.includes(fruitImages[randomIndex])) {
      randomFruits.push(fruitImages[randomIndex]);
    }
  }

  fruitContainers.forEach((container, index) => {
    const img = container.querySelector('img');
    const text = container.querySelector('.fruit-text');

    // Set the selected fruit image randomly
    img.src = randomFruits[index];
    img.alt = randomFruits[index].split('/').pop().split('.')[0].toUpperCase();

    // Set the text for options
    text.textContent = questions[currentQuestionIndex].options[index];

    // Reset the position and opacity for animation
    container.style.top = `${window.innerHeight + 200}px`;
    container.style.opacity = '0';
    container.style.left = `${index === 0 ? leftX : index === 1 ? middleX - 60 : rightX}px`;
    container.classList.remove('sliced');
    container.style.transform = 'scale(1)';
  });
}

// Update question and display fruits
function updateQuestion() {
  if (!questions || questions.length === 0) {
    alert("No questions available!");
    return;
  }

  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question; // Update question text

  resetFruitContainers();

  setTimeout(() => {
    fruitContainers.forEach((container, index) => {
      container.style.transition = 'opacity 1s ease, top 1s ease';
      container.style.top = `${middleY - 60}px`;
      container.style.opacity = '1';
    });
  }, 500);
}

// Update score display
function updateScore() {
  scoreElement.textContent = "Score: " + score; // Update the score in the #score element
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    updateQuestion();
  } else {
    gameOver();
  }
}

// Handle clicking on fruits to trigger slicing effect
fruitContainers.forEach((container, index) => {
  container.addEventListener('click', () => {
    if (isGameOver) return;

    const rect = container.getBoundingClientRect();
    const fruitMiddleY = rect.top + rect.height / 2;

    if (fruitMiddleY >= middleY - 50 && fruitMiddleY <= middleY + 50) {
      const question = questions[currentQuestionIndex];
      const correctAnswerIndex = question.correctOption;

      if (index === correctAnswerIndex) {
        container.classList.add('sliced');
        setTimeout(() => {
          score++; // Increase score on correct answer
          updateScore(); // Update score display
          nextQuestion();
        }, 500);
      } else {
        container.classList.add('sliced');
        setTimeout(() => {
          nextQuestion();
        }, 500);
      }
    }
  });
});

// Game over logic
function gameOver() {
  isGameOver = true;
  questionElement.textContent = "Game Over! Final Score: " + score;

  fruitContainers.forEach(container => {
    container.style.opacity = '0';
    container.style.transition = 'opacity 1s ease';
  });

  const resetButton = document.getElementById('reset-btn');
  const exitButton = document.getElementById('exit-btn');
  resetButton.style.display = 'none';
  exitButton.style.display = 'none';

  const gameOverModal = document.getElementById('game-over-modal');
  const finalScore = document.getElementById('final-score');
  const correctAnswersList = document.getElementById('correct-answers-list');

  finalScore.textContent = "Your Score: " + score;

  correctAnswersList.innerHTML = '';
  questions.forEach((question, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Q${index + 1}: ${question.options[question.correctOption]} (Correct Answer)`;
    correctAnswersList.appendChild(listItem);
  });

  gameOverModal.style.display = 'flex';

  const username = localStorage.getItem('username');
  const college = localStorage.getItem('college');

  fetch('http://localhost:5000/saveScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, college, score })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Score saved successfully:', data);
    })
    .catch(error => {
      console.error('Error saving score:', error);
    });
}

// Start the game
async function startGame() {
  await fetchQuestions(); // Ensure questions are fetched before starting
  updateQuestion();       // Start with the first question
}

startGame();



