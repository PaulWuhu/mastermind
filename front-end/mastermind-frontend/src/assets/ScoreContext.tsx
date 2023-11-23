import React, { createContext, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

type createContextType = {
  scores: scores[] | null;
  fetchScore: () => Promise<void>;
};
export const ScoreContext = createContext<createContextType | null>(null);

export const ScoreProvider = ({ children }: Props) => {
  const [scores, setScores] = useState<scores[] | null>(null);
  const fetchScore = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/api/get_all_user"
      );
      const jsonData = await response.json();
      setScores(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const contextValue: createContextType = {
    scores,
    fetchScore,
  };
  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};
