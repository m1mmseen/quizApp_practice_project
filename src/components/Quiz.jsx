import {useState} from "react";
import QUESTIONS from '../questions.js';
import quizCompletedImg from '../assets/quiz-complete.png'
import QuestionProgressBar from "./QuestionProgressBar.jsx";

export default function Quiz() {

    const [givenAnswers, setGivenAnswers] = useState([]);
    const activeQuestionIndex = givenAnswers.length;

    const quizCompleted = givenAnswers.length === QUESTIONS.length;

    function handleGivenAnswer(selectedAnswer) {
        setGivenAnswers(prevState => {
            return [...prevState, selectedAnswer]
        })
    }

    if(quizCompleted) {
        return <div id="summary">
            <img src={quizCompletedImg} alt=""/>
            <h2>Quiz Completed!</h2>
        </div>
    }

    const answers = QUESTIONS[activeQuestionIndex].answers;
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

    return <>
        <div id="quiz">
            <div id="question">
                <QuestionProgressBar timeout={10000} onTimeout={() => handleGivenAnswer(null)} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        return <li className="answer" key={answer}>
                            <button onClick={() => handleGivenAnswer(answer)}>{answer}</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>
}
