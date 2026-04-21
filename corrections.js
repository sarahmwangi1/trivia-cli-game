
const readline = require("readline");

// CLI setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Questions array
const questions = [
  {
    question: "Which of the following is not a JavaScript array method?",
    options:["A. execute()", "B. reduce()", "C. map()", "D. filter()"],
    answer: "A"
  },
  {
    question: "In Jest, which matcher is used to check if a function throws an error?",
    options: ["A. toContain", "B. toThrow", "C. toBe", "D. toMatch"],
    answer: "B"
  },
  {
    question: "What does CLI stand for?",
    options: [
      "A. Command Line Interface",
      "B. Code Language Input",
      "C. Computer Logic Interface",
      "D. Command Logic Input"],
    answer: "A"
  }
];

 // Game Variables
let score = 0;
let currentQuestion = 0;
let startTime;
let questionTimer;   // per-question timer
let gameTimer;       // overall 30-second game timer
let gameEnded = false;

// Step 1:Start quiz
function startQuiz() {
  console.log("Welcome to the Trivia CLI Game!");
  console.log("");
  console.log("Answer with A, B,C OR D.\n");
  console.log("10 seconds per question | 30 seconds total.\n");

  startTime = Date.now();

// Step 2:Start the Overall 30-second game timer
gameTimer = setTimeout(() => {
  if (!gameEnded) {
    clearTimeout(questionTimer);
    console.log("\n\n Overall time is up! Game over.");
    endQuiz();
  }
}, 30000);
}

// Step 3:Ask question
function askQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz(); //End game
    return;
  }
  const q = questions[currentQuestion];
 
  console.log(`\nQuestion ${currentQuestion + 1} of ${questions.length}`);
  console.log(`❓ ${q.question}`);
  q.options.forEach((option) => console.log(`${option}`));
  console.log("(You have 10 seconds)");
 
  // Per-question 10-second timer
  questionTimer = setTimeout(() => {
    console.log(`\n Too slow! The correct answer was: ${q.answer}`);
    currentQuestion++;
    askQuestion();
  }, 10000);
 
  rl.question("\nYour answer: ", (userAnswer) => {
    clearTimeout(questionTimer); // cancel timer — they answered in time
    checkAnswer(userAnswer.toUpperCase().trim());
  });
}
 
// ── Check the answer 
function checkAnswer(userAnswer) {
  const correct = questions[currentQuestion].answer;
  const validOptions = ["A", "B", "C", "D"];
 
  if (!validOptions.includes(userAnswer)) {
    console.log("⚠️  Invalid input! Please type A, B, C, or D.");
    console.log(`   Correct answer was: ${correct}`);
  } else if (userAnswer === correct) {
    console.log("✅ Correct!");
    score++;
  } else {
    console.log(`❌ Wrong! The correct answer was: ${correct}`);
  }
 
  currentQuestion++;
  askQuestion();
}
 
// ── End quiz 
function endQuiz() {
  if (gameEnded) return; // prevent running twice
  gameEnded = true;
 
  clearTimeout(gameTimer);
  clearTimeout(questionTimer);
 
  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // Use map to label each question result
  const results = questions.map((q, i) => {
    const status = i < currentQuestion ? "Attempted" : "Skipped";
    return `  Q${i + 1}: ${status}`;
  });
 
  console.log("\n");
  console.log(" Quiz Finished!");
  console.log(`   Score      : ${score} / ${questions.length}`);
  console.log(`   Percentage : ${((score / questions.length) * 100).toFixed(0)}%`);
  console.log(`   Time taken : ${timeTaken} seconds`);
  console.log("\n Question Summary:");
  results.forEach((r) => console.log(r));
  console.log("\n");
 
  rl.close();
}
 
// ── Run the game 
startQuiz();