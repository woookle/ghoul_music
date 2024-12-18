import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getActors } from "../../../api/artistAPI";


const PopulateActors = () => {
 
  const dispatch = useDispatch();
  const [top3actor, setTop3Actor] = useState([]);
  const actors = useSelector((state) => state.actors.actors);

  
  useEffect(() => { 
    dispatch(getActors());
  }, [dispatch]);

  
  useEffect(() => {
    if (actors.length >= 3) {
      setTop3Actor(actors.slice(0, 3));
    }
  }, [actors]);

  const API_URL = process.env.REACT_APP_API_URL;


  return (
    <section className="populate_actors">
      <div className="container">
        <h1>Музыканты</h1>
        <p className="subtitle">Самые популярные музыканты по прослушиваниям</p>
        <div className="actors_container">
          {top3actor.map((el, key) => {
            return (
              <div className="actor" key={key}>
                <div className="image_actor" style={{backgroundImage: `url("${API_URL}${el.avatar}")`}}></div>
                <p className="actor_name">{el.nickname}</p>
                <NavLink to={`/profile/${el._id}`}>Профиль</NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopulateActors;