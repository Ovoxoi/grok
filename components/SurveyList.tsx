import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper"; // Remplacez 'Paper' par 'Card'
import { Survey } from "./Survey";
import Storage from "chemin/vers/le/module/Storage"; // Assurez-vous que le chemin d'importation est correct

interface Survey {
  id: string;
  question: string;
}

const SurveyList = () => {
  // Fetch surveys from Firebase Firestore
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveys = await Storage.getSurveys();
      setSurveys(surveys);
    };
    fetchSurveys();
  }, []);

  return (
    <View>
      <Text>Surveys</Text>
      {surveys.map((survey) => (
        <Card key={survey.id} style={{ padding: 16 }}>
          <Text>{survey.question}</Text>
        </Card>
      ))}
    </View>
  );
};

export default SurveyList;
