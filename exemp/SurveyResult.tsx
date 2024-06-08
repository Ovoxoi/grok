import React from 'react';
import { View, Text } from 'react-native';

interface SurveyResultsProps {
  survey: Survey;
}

interface SurveyResult {
  question: string;
  answers: { label: string; count: number }[];
}

const handleSubmit = () => {
    // Valider les réponses
    // Créer un objet de réponse au questionnaire
    // Appeler storeSurveyResponse avec l'objet de réponse au questionnaire
  };
  


const SurveyResults: React.FC<SurveyResultsProps> = ({ survey }) => {
  // Calculer les résultats du questionnaire à partir des réponses enregistrées
  const results: SurveyResult[] = [];

  return (
    <View>
      {results.map((result, index) => (
        <View key={index}>
          <Text>{result.question}</Text>
          {result.answers.map((answer, index) => (
            <Text key={index}>{answer.label}: {answer.count}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SurveyResults;
