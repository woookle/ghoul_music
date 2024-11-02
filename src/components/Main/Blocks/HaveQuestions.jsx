import React from "react";
import { toast } from "react-toastify";

const HaveQuestions = () => {
  // Блок с кнопкой написать нам
  return (
    <section className="have_questions">
      <div className="container">
        <h1>Остались вопросы?</h1>
        <button type="button" onClick={() => toast.success('Мы в отпуске :0')}>Напишите нам ;)</button>
      </div>
    </section>
  )
}

export default HaveQuestions;