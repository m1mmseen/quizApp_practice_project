import {useCallback, useRef, useState} from "react";
import QUESTIONS from '../questions.js';
import quizCompletedImg from '../assets/quiz-complete.png'
import QuestionProgressBar from "./QuestionProgressBar.jsx";

export default function Quiz() {
    const shuffledAnswers = useRef();
    const [givenAnswers, setGivenAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = answerState === '' ? givenAnswers.length: givenAnswers.length - 1;

    const quizCompleted = givenAnswers.length === QUESTIONS.length;

    const handleSelectedAnswer = useCallback(function handleGivenAnswer(selectedAnswer) {
        setAnswerState('selected');

        setGivenAnswers(prevState => {
            return [...prevState, selectedAnswer]
        })

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }
            setTimeout(() => {
                setAnswerState('')
                shuffledAnswers.current = undefined;
            }, 2000)
        }, 1000)

    }, [activeQuestionIndex]);

    const handleSkippedAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer])

    if(quizCompleted) {
        return <div id="summary">
            <img src={quizCompletedImg} alt=""/>
            <h2>Quiz Completed!</h2>
        </div>
    }
    if (!shuffledAnswers.current) {

        shuffledAnswers.current = QUESTIONS[activeQuestionIndex].answers;
        shuffledAnswers.current.sort(() => Math.random() - 0.5)
    }

    return <>
        <div id="quiz">
            <div id="question">
                <QuestionProgressBar
                    timeout={10000}
                    onTimeout={() => handleSkippedAnswer}
                    key={activeQuestionIndex}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.current.map((answer) => {
                        let cssClass = '';
                        const selectedAnswer = givenAnswers[givenAnswers.length - 1] === answer;

                        if(answerState === 'selected' && selectedAnswer) {
                            cssClass = 'selected'
                        }

                        if ((answerState === 'correct' || answerState === 'wrong') && selectedAnswer) {
                            cssClass = answerState
                        }

                        return <li className="answer" key={answer}>
                            <button onClick={() => handleSelectedAnswer(answer)} className={cssClass}>{answer}</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>
}
