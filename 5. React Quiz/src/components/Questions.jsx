import QuestionTimer from "../components/QuestionTimer.jsx";
import Answers from "../components/Answers.jsx";

export default function Questions({
  onSkipAnswer,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  answers,
  questionText
}) {


  return (
    <>
      <QuestionTimer 
        timeout={10000} 
        onTimeout={onSkipAnswer}
      />
      <h2>{questionText}</h2>
      <Answers 
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </>
  )
}