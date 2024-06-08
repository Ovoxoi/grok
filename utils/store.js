import AsyncStorage from "@react-native-community/async-storage";
import firebase from "./firebase";

const store = {
  async getSurveys() {
    const surveys = await AsyncStorage.getItem("surveys");
    return surveys ? JSON.parse(surveys) : [];
  },
  async saveSurvey(survey) {
    const surveys = await this.getSurveys();
    surveys.push(survey);
    await AsyncStorage.setItem("surveys", JSON.stringify(surveys));
  },
  async deleteSurvey(id) {
    const surveys = await this.getSurveys();
    surveys = surveys.filter((survey) => survey.id !== id);
    await AsyncStorage.setItem("surveys", JSON.stringify(surveys));
  },
};

export default store;
