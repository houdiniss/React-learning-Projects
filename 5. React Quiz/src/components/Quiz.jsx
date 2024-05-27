import { useCallback,  useState } from "react";
import QUESTIONS from '../questions.js';
import quizCompleteImg from "../assets/quiz-complete.png";
import Questions from "./Questions.jsx";

export default function Quiz() {
  const [userAnswers , setUserAnswers] = useState([]);
  const [answerState , setAnswerState] = useState('');
  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;


  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState('answered');
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers , selectedAnswer];
      })

      setTimeout(() => {
        if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        } , 2000);

      } , 1000);
    } , [activeQuestionIndex]);


  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null) , [handleSelectAnswer]);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length - 1;

  if(quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"/>
        <h2>Quiz Completed!</h2>
      </div>
    );
  };




  return (
    <div id="quiz">
      <div id="question">
        <Questions 
          key={activeQuestionIndex}
          onSkipAnswer={handleSkipAnswer}
          onSelectAnswer={handleSelectAnswer}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          answers={QUESTIONS[activeQuestionIndex].answers}
          questionText={QUESTIONS[activeQuestionIndex].text}
        />
      </div>
    </div>
  )
}