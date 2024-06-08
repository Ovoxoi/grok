import React from "react";
import { View, Text } from "react-native";
import { Paper } from "react-native-paper";
import { Survey } from "./Survey";

const SurveyDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [survey, setSurvey] = useState({});

  useEffect(() => {
    const fetchSurvey = async () => {
      const surveys = await store.getSurveys();
      const survey = surveys.find((s) => s.id === id);
      setSurvey(survey);
    };
    fetchSurvey();
  }, [id]);

  return (
    <View>
      <Text>{survey.question}</Text>
      {survey.options.map((option) => (
        <Text key={option}>{option}</Text>
      ))}
    </View>
  );
};

export default SurveyDetail;
