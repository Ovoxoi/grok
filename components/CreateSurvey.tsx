import React from "react";
import { View, Text } from "react-native";
import { Paper } from "react-native-paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Survey } from "./Survey";

const CreateSurvey = () => {
  const [survey, setSurvey] = useState({});
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answerType, setAnswerType] = useState("");

  const handleSubmit = async (values) => {
    const newSurvey = { ...values };
    await store.saveSurvey(newSurvey);
    navigation.navigate("SurveyList");
  };

  return (
    <Formik
      initialValues={{
        question: "",
        options: [],
        answerType: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Field
            type="text"
            name="question"
            placeholder="Enter question text"
          />
          <ErrorMessage name="question" component="div" />
          <Field
            type="text"
            name="options"
            placeholder="Enter options (comma-separated)"
          />
          <ErrorMessage name="options" component="div" />
          <Field
            type="select"
            name="answerType"
            placeholder="Select answer type"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="rating-scale">Rating Scale</option>
            <option value="open-ended-text">Open-Ended Text</option>
          </Field>
          <ErrorMessage name="answerType" component="div" />
          <Button title="Create Survey" />
        </Form>
      )}
    </Formik>
  );
};

export default CreateSurvey;
