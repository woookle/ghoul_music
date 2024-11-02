import React from "react";
import more_image from "../../../assets/images/more_detailed_background.svg";

const MoreInfo = () => {
  // Второй блок, который рассказывает подробнее о сайте
  return (
    <section className="more_info">
      <div className="container">
        <h1>ПОДРОБНЕЕ</h1>
        <p>Мы - онлайн-платформа и сайт для распространения<br />оцифрованной звуковой информации (например,<br />музыкальных произведений) обладающая функциями<br />социальной сети, а также одноимённая компания</p>
        <img src={more_image} alt="more_image" />
      </div>
    </section>
  )
}

export default MoreInfo;