import React from "react";

function QuestionList() {
  const[quiz, setQuiz]=useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((res)=>res.json())
    .then((data)=>{
      setQuiz(data)
    },[])
  })

  function handleClickDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{method: "DELETE",})
    .then((res)=>res.json())
    .then(()=>{const updatedQuestions = quiz.filter((quiz) => quiz.id !== id);
      setQuiz(updatedQuestions)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = quiz.map((quiz) => {
          if (quiz.id === updatedQuestion.id) 
          return updatedQuestion;
          return quiz;
        });
        setQuiz(updatedQuestions);
      });
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> {quiz.map((quiz) => (
        <QuestionItem 
          key={quiz.id} 
          question={quiz} 
          onDeleteClick={handleClickDelete} 
          onAnswerchange={handleAnswerChange}/>
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
