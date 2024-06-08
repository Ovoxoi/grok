import React from "react";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-paper";

const QuestionnaireCard = ({ questionnaire, onPress }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 3 }}>
        <Card.Title title={questionnaire.title} />
        <Card.Content>
          <Text>{questionnaire.description}</Text>
        </Card.Content>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          mode="contained"
          icon="pencil"
          onPress={() => onPress("edit")}
          style={{ marginRight: 5 }}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          icon="chart-pie"
          onPress={() => onPress("results")}
          style={{ marginLeft: 5 }}
        >
          Results
        </Button>
      </View>
    </View>
  );
};

export default QuestionnaireCard;
