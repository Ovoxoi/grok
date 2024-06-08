/*import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import firebase from 'react-native-firebase';



const validationSchema = Yup.object().shape({
  title: Yup.string().required('Le titre est obligatoire'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required('Le texte de la question est obligatoire'),
        type: Yup.string().oneOf(['text', 'multiple_choice', 'single_choice'], 'Type de question invalide'),
        options: Yup.array()
          .when('type', {
            is: (type: string) => type === 'multiple_choice' || type === 'single_choice',
            then: Yup.array().min(2, 'Vous devez saisir au moins 2 options'),
            otherwise: Yup.array(),
          })
          .of(Yup.string().required('Le texte de l’option est obligatoire')),
      }),
    )
    .min(1, 'Vous devez saisir au moins une question'),
});

const CreateSurveyScreen: React.FC = () => {
  const handleSubmit = async (values: any) => {
    try {
      // Créer un nouvel utilisateur avec l'adresse e-mail et le mot de passe saisis
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('Vous devez être connecté pour créer un questionnaire');
      }
      const survey = {
        title: values.title,
        questions: values.questions,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        creatorId: user.uid,
      };
      await firebase.firestore().collection('surveys').add(survey);
      // Gérer la création réussie, par exemple en naviguant vers l'écran d'accueil de l'application
      console.log('Création réussie : ', survey);
    } catch (error) {
      // Gérer les erreurs de création, par exemple en affichant un message d'erreur à l'utilisateur
      console.error('Erreur de création : ', error);
    }
  };

  const addQuestion = () => {
    // Ajouter une nouvelle question au formulaire
  };

  const removeQuestion = (index: number) => {
    // Supprimer une question du formulaire
  };

  const addOption = (index: number) => {
    // Ajouter une nouvelle option à une question du formulaire
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    // Supprimer une option d'une question du formulaire
  };

  return (
    <View>
      <Formik
        initialValues={{
          title: '',
          questions: [
            {
              text: '',
              type: 'text',
              options: [],
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <>
            <TextInput
              placeholder="Titre du questionnaire"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              style={{ marginBottom: 10 }}
            />
            {errors.title && touched.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}
            {values.questions.map((question, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <TextInput
                  placeholder="Texte de la question"
                  value={question.text}
                  onChangeText={(text) => setFieldValue(`questions[${index}].text`, text)}
                  onBlur={handleBlur(`questions[${index}].text`)}
                  style={{ marginBottom: 10 }}
                />
                {errors.questions &&
                  errors.questions[index] &&
                  errors.questions[index].text &&
                  touched.questions &&
                  touched.questions[index] &&
                  touched.questions[index].text && (
                    <Text style={{ color: 'red' }}>{errors.questions[index].text}</Text>
                  )}
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Button
                    title="Texte"
                    onPress={() => setFieldValue(`questions[${index}].type`, 'text')}
                    color={question.type === 'text' ? 'primary' : 'tertiary'}
                  />
                  <Button
                    title="Choix multiple"
                    onPress={() => setFieldValue(`questions[${index}].type`, 'multiple_choice')}
                    color={question.type === 'multiple_choice' ? 'primary' : 'tertiary'}
                  />
                  <Button
                    title="Choix unique"
                    onPress={() => setFieldValue(`questions[${index}].type`, 'single_choice')}
                    color={question.type === 'single_choice' ? 'primary' : 'tertiary'}
                  />
                </View>
                {question.type === 'multiple_choice' || question.type === 'single_choice' ? (
                  <>
                    {question.options.map((option, optionIndex) => (
                      <View key={optionIndex} style={{ marginBottom: 10 }}>
                        <TextInput
                          placeholder="Texte de l’option"
                          value={option}
                          onChangeText={(text) => {
                            const newOptions = [...question.options];
                            newOptions[optionIndex] = text;
                            setFieldValue(`questions[${index}].options`, newOptions);
                          }}
                          onBlur={handleBlur(`questions[${index}].options[${optionIndex}]`)}
                          style={{ marginBottom: 10 }}
                        />
                        {errors.questions &&
                          errors.questions[index] &&
                          errors.questions[index].options &&
                          errors.questions[index].options[optionIndex] &&
                          touched.questions &&
                          touched.questions[index] &&
                          touched.questions[index].options &&
                          touched.questions[index].options[optionIndex] && (
                            <Text style={{ color: 'red' }}>{errors.questions[index].options[optionIndex]}</Text>
                          )}
                        <Button title="Supprimer l’option" onPress={() => removeOption(index, optionIndex)} />
                      </View>
                    ))}
                    <Button title="Ajouter une option" onPress={() => addOption(index)} />
                  </>
                ) : null}
                <Button title="Supprimer la question" onPress={() => removeQuestion(index)} />
              </View>
            ))}
            <Button title="Ajouter une question" onPress={addQuestion} />
            <Button title="Créer le questionnaire" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateSurveyScreen;



const addQuestion = () => {
  setFieldValue('questions', [...values.questions, { text: '', type: 'text', options: [] }]);
};

const removeQuestion = (index: number) => {
  const newQuestions = [...values.questions];
  newQuestions.splice(index, 1);
  setFieldValue('questions', newQuestions);
};

const addOption = (index: number) => {
  const newOptions = [...values.questions[index].options, ''];
  setFieldValue(`questions[${index}].options`, newOptions);
};

const removeOption = (questionIndex: number, optionIndex: number) => {
  const newOptions = [...values.questions[questionIndex].options];
  newOptions.splice(optionIndex, 1);
  setFieldValue(`questions[${questionIndex}].options`, newOptions);
};




const CreateSurveyScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
  
    const handleAddQuestion = () => {
      setQuestions([...questions, { id: uuid.v4(), text: '', options: [] }]);
    };
  
    const handleRemoveQuestion = (questionId: string) => {
      setQuestions(questions.filter(question => question.id !== questionId));
    };
  
    const handleQuestionTextChange = (questionId: string, text: string) => {
      setQuestions(
        questions.map(question =>
          question.id === questionId ? { ...question, text } : question
        )
      );
    };
  
    const handleAddOption = (questionId: string) => {
      setQuestions(
        questions.map(question =>
          question.id === questionId
            ? { ...question, options: [...question.options, { id: uuid.v4(), text: '' }] }
            : question
        )
      );
    };
  
    const handleRemoveOption = (questionId: string, optionId: string) => {
      setQuestions(
        questions.map(question =>
          question.id === questionId
            ? { ...question, options: question.options.filter(option => option.id !== optionId) }
            : question
        )
      );
    };
  
    const handleOptionTextChange = (questionId: string, optionId: string, text: string) => {
      setQuestions(
        questions.map(question =>
          question.id === questionId
            ? { ...question, options: question.options.map(option => option.id === optionId ? { ...option, text } : option) }
            : question
        )
      );
    };
  
    const handleCreateSurvey = async () => {
      if (!title || !description || !questions.length) {
        // Afficher un message d'erreur
        return;
      }
  
      const newSurvey: Survey = {
        id: uuid.v4(),
        title,
        description,
        questions,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        creatorId: firebase.auth().currentUser?.uid || '',
      };
  
      try {
        await firestore().collection('surveys').add(newSurvey);
        // Naviguer vers l'écran d'accueil
      } catch (error) {
        console.error('Error creating survey:', error);
        // Afficher un message d'erreur
      }
    };
  
    return (
      <View>
        <TextInput value={title} onChangeText={setTitle} placeholder="Titre du questionnaire" />
        <TextInput value={description} onChangeText={setDescription} placeholder="Description du questionnaire" multiline />
        {questions.map(question => (
          <View key={question.id}>
            <TextInput value={question.text} onChangeText={text => handleQuestionTextChange(question.id, text)} placeholder="Texte de la question" />
            {question.options.map(option => (
              <View key={option.id}>
                <TextInput value={option.text} onChangeText={text => handleOptionTextChange(question.id, option.id, text)} placeholder="Texte de l'option" />
                <Button title="Supprimer l'option" onPress={() => handleRemoveOption(question.id, option.id)} />
              </View>
            ))}
            <Button title="Ajouter une option" onPress={() => handleAddOption(question.id)} />
            <Button title="Supprimer la question" onPress={() => handleRemoveQuestion(question.id)} />
          </View>
        ))}
        <Button title="Ajouter une question" onPress={handleAddQuestion} />
        <Button title="Créer le questionnaire" onPress={handleCreateSurvey} />
      </View>
    );
  };
  */
