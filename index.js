// database with the questions

const STORE = {
    questionArray: [
        {
            question: 'How many members are in the K-pop boy band, BTS?',
            answers: [
                '5 members',
                '3 members',
                '2 members',
                '7 members'

            ],
            correctAnswer: 
                '7 members'
        },

        {
            question: 'Who is the oldest member?', 
            answers: [
                'Jin',
                'RM',
                'J-Hope',
                'Suga'

            ],
            correctAnswer: 
                'Jin'
        },
        {
            question: 'Who is the youngest member?',
            answers: [
                'Suga',
                'Jimin',
                'Jungkook',
                'RM'

            ],
            correctAnswer: 
                'Jungkook'
        },
        {
            question: "Which is a solo song of Jungkooks’?",
            answers: [
                'Euphoria',
                'Epiphany',
                'Smile',
                'The Last'
                
            ],
            correctAnswer: 
                'Euphoria'
        },

        {
            question: "Which is a solo song of Jimins’?",
            answers: [
                'Stigma',
                'Serendipity',
                'Begin',
                'Winter Bear'
            ],
            correctAnswer: 
                'Serendipity'
        },
        {
            question: 'How many albums has BTS release?',
            answers: [
                '3',
                '4',
                '5',
                '7'

            ],
            correctAnswer: 
                '7'
        },
        {
            question: 'When does their world tour start?',
            answers: [
                'April 05, 2020',
                'April 11, 2020',
                'December 5, 2020',
                'July 6, 2020'
            ],
            correctAnswer: 
                'April 11, 2020'
        }
        ],
    score: 0,
    questionNo: 0,

    };







//click handler for the start quiz button
function startQuiz(){
    $('#start').on('click', function(event){
        event.preventDefault();
        $('#js-questions').remove();
        renderQuestion();
        $('.question-score').css('display','block');
    })

}


//populating the current question
function renderQuestion(){
    let curQuestionData = STORE.questionArray[STORE.questionNo];
    let form= `<form id="js-questions" class="bts-quiz"> 
  
    <fieldset>
    <p>${curQuestionData.question}</p>
    <div class="selections">
        <input type="radio" name="choice" value="${curQuestionData.answers[0]}" required> 
        <label for="one">${curQuestionData.answers[0]}</label><br>
        <input type="radio" name="choice" value="${curQuestionData.answers[1]}"> 
        <label for="two">${curQuestionData.answers[1]}</label><br>
        <input type="radio" name="choice" value="${curQuestionData.answers[2]}"> 
        <label for="three">${curQuestionData.answers[2]}</label><br>
        <input type="radio" name="choice" value="${curQuestionData.answers[3]}"> 
        <label for="four">${curQuestionData.answers[3]}</label><br>
    </div>
    </fieldset>
    <button id="submit">Submit</button>
    <section id="results"></section>
</form>`
    $('.container').append(form);

}



//submitting an answer

function handleQuestions(){
    $('body').on("click",'.next', function(event){
        event.preventDefault();
        $('.container').show();
        $('.next').hide();
        $('h2').hide();
       
        if (STORE.questionNo >= STORE.questionArray.length){
            displayResults();
        }else{
            $('.container form').replaceWith(renderQuestion());
        }
    })
}

function checkAnswer(){
    $('body').on("click",'#submit',function(event){
        event.preventDefault();
        let selected = $("input[name=choice]:checked").val();
        let answer = STORE.questionArray[STORE.questionNo].correctAnswer;
        if(!selected){
            alert("Select an answer!");
        }else{
            if(selected === answer){
                correctAnswer();
                incrementQuestion();
            }else {
                wrongAnswer();
                incrementQuestion();
            }
        } 
    })
}

//incrementing the current question
function incrementQuestion(){
    STORE.questionNo++;
    $('.questionNo').text('Question: ' + STORE.questionNo + '/7');
}

//incrementing the score
function incrementScore(){
    STORE.score++;
    $('.score').text('Score: ' + STORE.score);

}
//correct answer feedback

function correctAnswer(){
    $('.container').html( 
        `<form>
        <h2>You got the correct answer!!!</h2>
        <button type="button" class="next">Next</button>
        </form>`
    );
    incrementScore();
}

// incorrect answer feedback
function wrongAnswer(){
    let answer = STORE.questionArray[STORE.questionNo].correctAnswer;
    $('.container').html(
        `<form>
        <h2>Wrong Answer, it looks like you don't know BTS!</h2>
        <h2>Correct Answer is ${answer}.</h2>
        <button type="button" class="next">Next</button>
        </form>`
    );
}


//final question and score status

function displayResults(){
    $('.final').html(
        `<h2>Your total score is: ${STORE.score}</h2>
        <button type="submit" class="restart">Restart</button>
        <div class="thumbs-up">
            <img class="done" src="Done.jpg" alt="BTS thumbs up">
        </div>
        <div class="audio">
            <audio controls>
                <source src="ON.mp3" type="audio/mpeg">
            </audio>
        </div>
        `
    
    );
    $('.final').show();
}

//restarting the quiz

function restartQuiz(){
    $('.final').on('click','.restart',function(event){
        event.preventDefault;
        resetScore();

        renderQuestion();
        $('.final').hide();
    })
}

function resetScore(){
    STORE.score = 0;
    STORE.questionNo = 0;
    $('.score').text('Score: 0');
    $('.questionNo').text('Question: 1/7');
    
    


}

//multiple function calls
function loadQuizApp(){
    startQuiz();
    handleQuestions();
    checkAnswer();
    restartQuiz();

}



$(loadQuizApp);
