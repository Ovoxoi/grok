import React, { createContext, useState } from 'react';

interface SurveyContextProps {
  surveys: Survey[];
  addSurvey: (survey: Survey) => void;
  // ... autres méthodes pour la gestion des questionnaires
}

const SurveyContext = createContext<SurveyContextProps>({
  surveys: [],
  addSurvey: () => {},
  // ...
});

const SurveyContextProvider: React.FC = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const addSurvey = (survey: Survey) => {
    setSurveys([...surveys, survey]);
  };

  // ... autres méthodes pour la gestion des questionnaires

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey, /* ... */ }}>
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, SurveyContextProvider };
