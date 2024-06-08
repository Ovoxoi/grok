import React from 'react';
import { View, Text } from 'react-native';
import RNPDF from 'react-native-pdf';

interface SurveyResultsPDFProps {
  survey: Survey;
}

interface SurveyResult {
  question: string;
  answers: { label: string; count: number }[];
}

const SurveyResultsPDF: React.FC<SurveyResultsPDFProps> = ({ survey }) => {
  // Calculer les résultats du questionnaire à partir des réponses enregistrées
  const results: SurveyResult[] = [];

  const pdf = new RNPDF({
    paperSize: 'A4',
    margin: 30,
  });

  pdf.doc.text(`Résultats du questionnaire : ${survey.title}`, {
    fontSize: 24,
    align: 'center',
  });

  results.forEach((result) => {
    pdf.doc.text(result.question, { fontSize: 18, margin: [0, 10] });

    result.answers.forEach((answer) => {
      pdf.doc.text(`- ${answer.label} : ${answer.count}`, { margin: [20, 5] });
    });
  });

  // Enregistrer le PDF sur le téléphone ou le partager directement
  // ...

  return null;
};

export default SurveyResultsPDF;
