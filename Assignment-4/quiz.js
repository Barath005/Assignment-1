//Selecting necessary DOM elements 
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".no-of-questions");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.querySelector(".user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start");
let Score = document.getElementById("user-score");

// Initializing variables
let questionCount;
let scoreCount = 0;
let count = 26;
let countdown;

//Quiz array with questions and answers
const quizArray = [
    {
      id: "0",
      question: "What is Virat Kohli's father's name?",
      options: ["Ravi Kohli", "Prem Kohli", "Raman Kohli", "Jasvinder Kohli"],
      correct: "Prem Kohli",
    },
    {
      id: "1",
      question: "Which of the following is the nickname of Virat Kohli in the world of cricket?",
      options: ["The Wall", "Mr Fire", "Run Machine", "Mr 360"],
      correct: "Run Machine",
    },
    {
      id: "2",
      question: "What is Virat Kohli's ODI Jersey Number?",
      options: ["7", "45", "22", "18"],
      correct: "18",
    },
    {
      id: "3",
      question: "Which record does Virat Kohli hold in the IPL?",
      options: ["Highest runs in super over", "Highest catches as a fielder", "Highest centuries in 1 season", "Highest runs in 1 match"],
      correct: "Highest centuries in 1 season",
    },
    {
      id: "4",
      question: "What is Virat Kohli's highest score in an ODI innings",
      options: ["183", "245*", "196*", "178"],
      correct: "183",
    },
    {
      id: "5",
      question: "Which national award has Virat Kohli been honoured with?",
      options: ["Rajiv Gandhi Khel Ratna Award", "Arjuna Award", "Padma Shri", "All of the above"],
      correct: "All of the above",
    },
    {
      id: "6",
      question: "Kohli has taken four wickets in ODIs-Alastair Cook, Brendon McCullum, Craig Kieswetter and_____?",
      options: ["Chris Gayle", "Kane Williamson", "Imran Tahir", "Quinton De Kock"],
      correct: "Quinton De Kock",
    },
    {
      id: "7",
      question: "How many Test hundreds has Virat Kohli scored?",
      options: ["44", "27", "22", "33"],
      correct: "27",
    },
    {
      id: "8",
      question: "Kohli started his World Cup journey with a century. Guess the opponent?",
      options: ["Pakistan", "England", "Bangladesh", "Australia"],
      correct: "Bangladesh",
    },
    {
      id: "9",
      question: "On his ODI debut for India vs Sri Lanka in 2008, Virat Kohli opened the innings with?",
      options: ["Sachin Tendulkar", "Gautam Gambhir", "Virender Sehwag", "Rohit Sharma"],
      correct: "Gautam Gambhir",
    },
];

//Action for Restart button,When we click it remove the score-container and display the quiz-container
restart.addEventListener("click", () => {
    initial();//callling initial function to restart the questions
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
  });
//Action for Next button

nextBtn.addEventListener("click", (displayNext = () => {
  
    questionCount += 1;
    //Check all the questions as been answered
    if (questionCount == quizArray.length) {

      // Add  the score-container and remove the quiz container 
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
          "Your score is " + scoreCount + " out of " + questionCount;
      } else {
      //Displaying the question number
        countOfQuestion.innerHTML =
          questionCount + 1 + " of " + quizArray.length + " Question";
      //display the user score
      userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
      //Giving feedback for user's score using If Condition
      const feedbackElement = document.getElementById("feedback");

      if (scoreCount === quizArray.length) {
          feedbackElement.innerText = "True Virat Kohli fan! Ee sala cup namde " ;
      } else if (scoreCount >= quizArray.length / 2) {
          feedbackElement.innerText = "Great job! You are Ardent Virat Kohli fan";
      } else {
          feedbackElement.innerText = "You can do better!";
      }

    }
 
      quizDisplay(questionCount);//Display the next question
      count = 26;//reset countdown to 25
      clearInterval(countdown);
      timerDisplay();
    }

  )
);
//Countdown timer display
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}'s`;
        if( count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    },1000);
};

// Function to display quiz questions
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container");

    quizCards.forEach((element) => {
        element.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

// Function to create and display quiz questions

function quizCreator(){

  //Rearrange the order of the quiz question when we click restart button
    quizArray.sort(() => Math.random() - 0.5);
   //Rearrange the order of the quiz options when we click restart button
    for(let i of quizArray){
        i.options.sort(() => Math.random() - 0.5);
      //display the 1 out of 10 questions
        let div = document.createElement("div");
        div.classList.add("container" , "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Questions";
       //creating paragraph element to displaying the question
        let question_DIV =document.createElement("p");
        question_DIV.classList.add("question");
      
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
         // Create buttons for each answer to the checker function
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>`;
        quizContainer.appendChild(div);

    }
}
// function to check  answer and update score on screen

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container")[questionCount];
  let options = question.querySelectorAll(".option-div");
  // If the answer is correct, add "correct" class and update the score
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
    updateScore();
  } else {  // If the answer is incorrect, add "incorrect" class to the selected option
    userOption.classList.add("incorrect");
    // Find and add "correct" class to the correct option
    options.forEach((element) => {
      if (element.innerText === quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  // Disable all options to prevent further clicks
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });

}
// Function to update the displayed score
function updateScore() {
  Score.innerText = scoreCount;
}


//function to initial the quiz

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 26;
    updateScore();
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//action for start-button to start the quiz
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
})
// Event listener for when the window loads
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");

};