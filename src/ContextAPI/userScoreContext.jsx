import React, { createContext, useState, useEffect } from "react";

export const UserScoreContext = createContext();

export function ScoreFunctionProvider({ children }) {
  const [user, setUser] = useState({});
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    const userLocalData = JSON.parse(localStorage.getItem("user_profile")) || {};
    const userLocalScore = JSON.parse(localStorage.getItem("user_score")) || 0;

    setUser(userLocalData);
    setUserScore(userLocalScore);
  }, []);

  function scoreInc(plus) {
    setUserScore((prevScore) => {
      const newScore = prevScore + parseInt(plus);
      localStorage.setItem("user_score", newScore);
      return newScore;
    });
  }

  return (
    <UserScoreContext.Provider value={{ userScore, setUserScore, user, setUser, scoreInc }}>
      {children}
    </UserScoreContext.Provider>
  );
}
