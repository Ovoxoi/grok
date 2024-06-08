import React from "react";
import { View, Text } from "react-native";
import { Paper } from "react-native-paper";

const SurveyResults = () => {
  // Fetch survey results from Firebase Firestore
  const results = [];

  return (
    <View>
      <Text>Survey Results</Text>
      {results.map((result) => (
        <Paper key={result.id} style={{ padding: 16 }}>
          <Text>{result.question}</Text>
          <Text>{result.answer}</Text>
        </Paper>
      ))}
    </View>
  );
};

export default SurveyResults;
