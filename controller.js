// Game variables

const coords={x: 0, y:0};
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
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
const middleY = window.innerHeight / 2;
const middleX = window.innerWidth / 2;
const leftX = window.innerWidth / 4;
const rightX = window.innerWidth * 3 / 4;
const fruitContainers = document.querySelectorAll('.fruit-container');
const fruitImages = [
  "images/apple.jpeg",
  "images/orange.jpeg",
  "images/watermelon.jpeg"
];
const questions = [
  { text: "Which of the following BIS standards governs the quality of cement in India?", options: ["IS 8112", "IS 2062", "IS 2706"], correct: 0 },
  { text: "What is the focus of  IS 3370?", options: ["Testing the compressive strength of concrete", " Protection of reinforced concrete structures against corrosion", "Designing building foundations"], correct: 1 },
  { text: "Which BIS standard is used for the safety of electrical installations in buildings?", options: ["IS 3646", "IS 9845", "IS 732"], correct: 2 },
];

// HTML elements
const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score");

// Function to reset fruit containers and move images from bottom to top
function resetFruitContainers() {
  fruitContainers.forEach((container, index) => {
    const img = container.querySelector('img');
    const text = container.querySelector('.fruit-text');

    // Reset the position and opacity for animation
    container.style.top = `${window.innerHeight + 200}px`; // Start off-screen (bottom)
    container.style.opacity = '0'; // Start as invisible
    container.style.left = `${index === 0 ? leftX : index === 1 ? middleX - 60 : rightX}px`; // Position fruits on left, middle, right
    text.textContent = questions[currentQuestionIndex].options[index]; // Set text for options
    container.classList.remove('sliced'); // Remove the "sliced" class to reset fruit
    container.style.transform = 'scale(1)'; // Reset scale
  });
}

// Update question and display fruits
function updateQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.text;

  // Reset fruit containers and move them up
  resetFruitContainers();

  // Animate the fruits to move up and become visible
  setTimeout(() => {
    fruitContainers.forEach((container, index) => {
      container.style.transition = 'opacity 1s ease, top 1s ease'; // Smooth transition for opacity and position
      container.style.top = `${middleY - 60}px`; // Move to the middle (centered vertically)
      container.style.opacity = '1'; // Make it visible
    });
  }, 500); // Delay for smoother transition
}

// Update score display
function updateScore() {
  scoreElement.textContent = "Score: " + score;
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

// Handle hovering over fruits to trigger slicing effect
fruitContainers.forEach((container, index) => {
  // When fruit reaches the middle, allow slicing effect
  container.addEventListener('mouseover', () => {
    if (isGameOver) return;

    // Ensure fruit is in the middle before allowing slicing
    const rect = container.getBoundingClientRect();
    const fruitMiddleY = rect.top + rect.height / 2;

    if (fruitMiddleY >= middleY - 50 && fruitMiddleY <= middleY + 50) {
      // Add the slicing effect when the fruit is positioned in the middle
      container.classList.add('sliced');

      // After the slicing animation ends, move to the next question
      setTimeout(() => {
        score++;
        updateScore();
        nextQuestion();
      }, 500);  // Wait for the slicing effect before proceeding
    }
  });
});

// Game over logic
function gameOver() {
  isGameOver = true;
  questionElement.textContent = "Game Over! Final Score: " + score;
}

// Start the game
function startGame() {
  updateQuestion();
  updateScore();
}

// Start the game when the page loads
window.onload = startGame;
