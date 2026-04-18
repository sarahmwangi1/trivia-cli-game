
/**
 * TRIVIA CLI GAME
 * ───────────────
 * A command-line trivia game built with Node.js
 * Players answer multiple choice questions within a time limit.
 *
 * Author  : Sarah M
 * Date    : 18/04/2026
 * Version : 1.0
 */

const readline = require("readline");

// CLI setup
// readline allows the game to read input typed by the user in the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Questions array
// Each question is an object with three properties:
//   question : the question text
//   options  : the four answer choices shown to the player
//   answer   : the correct letter (A, B, C or D)
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
 // These variables track the state of the game throughout its lifecycle
let score = 0;
let currentQuestion = 0;
let startTime;
let questionTimer;   // per-question timer
let gameTimer;       // overall 30-second game timer
let gameEnded = false;

// Step 1:Start quiz
//  Entry point of the game. Prints the welcome message,
//  records the start time, and kicks off the timers and questions.
function startQuiz() {
  console.log("Welcome!Time to test your knowledge in JS!");
  console.log("");
  console.log("Answer with A, B,C OR D.\n");
  console.log("10 seconds per question | 30 seconds total.\n");

  startTime = Date.now();
  startGameTimer(); 
  askQuestion();   
}

// Step 2:Starts a 30-second countdown for the whole game.
//  If time runs out before all questions are answered,
//  the game ends automatically.
//  30000 = 30 seconds in milliseconds (1 second = 1000ms)
function startGameTimer() {
  gameTimer = setTimeout(() => {
  if (!gameEnded) {
    clearTimeout(questionTimer);
    console.log("\n\n Overall time is up! Game over.");
    endQuiz();
  }
}, 30000);
}

// Step 3:Ask question
//  Coordinator function — checks if there are questions left,
//  then calls showQuestion, startTimer, and waitForAnswer in order.
function askQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz(); //End game
    return;
  }
  
  showQuestion();   // step 4:show the question text
  startTimer();     // step 5:start the 10-second countdown
  waitForAnswer();  // step 6:wait for the player to type
}

// Step 4:Display the current question
//  Prints the current question and its options to the terminal.
//  Uses forEach() to loop through and display each answer option.
function showQuestion() {
  const q = questions[currentQuestion];
  console.log(`\nQuestion ${currentQuestion + 1} of ${questions.length}`);
  console.log(`❓ ${q.question}`);
  q.options.forEach((option) => console.log(`${option}`));
  console.log("(You have 10 seconds)");
}

// Step 5:Starts a 10-second timer for the current question.
// If the player does not answer in time, it reveals the correct
// answer and automatically moves to the next question.
// 10000 = 10 seconds in milliseconds
function startTimer() {
    const q = questions[currentQuestion];
    questionTimer = setTimeout(() => {
    console.log(`\n Too slow! The correct answer was: ${q.answer}`);
    currentQuestion++;
    askQuestion();
  }, 10000);
}

// Step 6:Wait for the player to type their response(Answer) and enter.
// Cancels the question timer as soon as they respond,
// then passes the answer to checkAnswer() for validation.
function waitForAnswer() {
    rl.question("\nYour answer: ", (userAnswer) => {
    clearTimeout(questionTimer); 
    checkAnswer(userAnswer.toUpperCase().trim());
  });
}
 
// Step 7:Check the if the answer is correct. 
//  Validates the player's input and checks it against the
//  correct answer. Awards a point for correct answers.
//  Then moves on to the next question by calling askQuestion().
function checkAnswer(userAnswer) {
  const correct = questions[currentQuestion].answer;
  const validOptions = ["A", "B", "C", "D"];
 
  if (!validOptions.includes(userAnswer)) {
    console.log("Invalid input! Please type A, B, C, or D.");
    console.log(`Correct answer was: ${correct}`);
  } else if (userAnswer === correct) {
    console.log("Correct!");
    score++;
  } else {
    console.log(`Wrong! The correct answer was: ${correct}`);
  }
 
  currentQuestion++;
  askQuestion(); 
}
 
//Step 8:End the game and check score
//  Ends the game, clears all timers, calculates the final score
//  and time taken, then prints a summary to the terminal.
//  Uses .map() to label each question as Attempted or Skipped.
function endQuiz() {
  if (gameEnded) return; // prevent running twice
  gameEnded = true;
 
  clearTimeout(gameTimer);
  clearTimeout(questionTimer);

  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
  
    const results = questions.map((q, i) => {
    const status = i < currentQuestion ? "Attempted" : "Skipped";
    return `  Q${i + 1}: ${status}`;
  });
 
  //print final results
  console.log("\n");
  console.log(" Quiz Finished!");
  console.log(`   Score      : ${score} / ${questions.length}`);
  console.log(`   Percentage : ${((score / questions.length) * 100).toFixed(0)}%`);
  console.log(`   Time taken : ${timeTaken} seconds`);
  console.log("\n Question Summary:");
  results.forEach((r) => console.log(r));
  console.log("\n");
 
  rl.close(); //close the terminal input interface
}
 
// ── Run the game .This is the single line that starts the game.

startQuiz();