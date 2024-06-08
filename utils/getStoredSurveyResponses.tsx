const getStoredSurveyResponses = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const surveyResponses: SurveyResponse[] = [];
  
      for (const key of keys) {
        if (key.startsWith('@survey_app:')) {
          const jsonValue = await AsyncStorage.getItem(key);
          const response = JSON.parse(jsonValue!) as SurveyResponse;
          surveyResponses.push(response);
        }
      }
  
      return surveyResponses;
    } catch (e) {
      console.error('Error getting stored survey responses:', e);
      return [];
    }
  };
  