let questions = [
    {
    numb: 1,
    question: "In which direction you drag the fingers to control recoil",
    answer: "Downwards",
    options: [
      "Left",
      "Right",
      "Upwards",
      "Downwards"
    ]
  },
    {
    numb: 2,
    question: "Max scope available for AR weapon?",
    answer: "6x",
    options: [
      "3x",
      "4x",
      "6x",
      "8x"
    ]
  },
    {
    numb: 3,
    question: "which gun has maximum default loading capacity?",
    answer: "M249",
    options: [
      "Dp-28",
      "M416",
      "M249",
      "scar-l"
    ]
  },
    {
    numb: 4,
    question: "Which all weapons tactical stock can be attached to?",
    answer: "M416",
    options: [
      "SCAR-L",
      "M416",
      "MP5K",
      "M762"
    ]
  },
    {
    numb: 5,
    question: "How many container sets are there in Georgopol?",
    answer: 7,
    options: [
      5,
      4,
      7,
      6
    ]
  },
  {
    numb: 6,
    question: "Which is the location which does not have any visible (in the mini-map) buildings in it?",
    answer: "Shelter",
    options: [
      "Farm",
      "Stalber",
      "Shelter",
      "Shooting range"

    ]
  },
  {
    numb: 7,
    question: "What are the dimensions of Sanhok map?",
    answer: "4x4 km",
    options: [
      "2x2 km",
      "5x5 km",
      "8x8 km",
      "4x4 km"
    ]
  },
  {
    numb: 8,
    question: "Which is the most powerful (Bolt action) sniper in BGMI?",
    answer: "AWM",
    options: [
      "AWM",
      "M24",
      "Kar98",
      "Mini 14"
    ]
  },
  {
    numb: 9,
    question: "What does AWM stands for in context of BGMI?",
    answer: "Arctic Warfare Magnum",
    options: [
      "Assistant Work Manager",
      "Arctic Warfare Magnum",
      "Anti Weapon Missile",
      "Appliance Wiring Material"
    ]
  },
  {
    numb: 10,
    question: "What does KAR98 stand for in context of PubG mobile?",
    answer: "Karabiner98 Kurz",
    options: [
      "Karabiner98 Kurz",
      "Kartin98",
      "Kerobin98 Kurz",
      "King98"
    ]
  },
];

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
}
let que_count = 0;
let que_numb = 1;
let userScore = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count); 
    queCounter(que_numb);  
    next_btn.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb);  
        next_btn.classList.remove("show");
        let green=document.getElementById('right');
        green.style.backgroundColor="white";
        let red=document.getElementById('wrong');
        red.style.backgroundColor="white";
    }else{
        showResult(); 
    }
}
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function optionSelected(answer){
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1;
        let input=document.getElementById('right');
        // console.log(input);
        input.style.backgroundColor = "#6df48c";
    }else{
      let wrong=document.getElementById('wrong');
      // console.log(input);
      wrong.style.backgroundColor = "#fa7481";
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); 
}
function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span> You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
      }
function queCounter(index){
          let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
          bottom_ques_counter.innerHTML = totalQueCounTag;
      }     