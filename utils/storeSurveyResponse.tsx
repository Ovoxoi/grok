import AsyncStorage from '@react-native-async-storage/async-storage';

interface SurveyResponse {
  surveyId: number;
  questions: {
    questionId: number;
    optionId?: number;
    text?: string;
  }[];
}

const storeSurveyResponse = async (surveyResponse: SurveyResponse) => {
  try {
    const jsonValue = JSON.stringify(surveyResponse);
    await AsyncStorage.setItem(`@survey_app:${surveyResponse.surveyId}`, jsonValue);
  } catch (e) {
    console.error('Error storing survey response:', e);
  }
};
