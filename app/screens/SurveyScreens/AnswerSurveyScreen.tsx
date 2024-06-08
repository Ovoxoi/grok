

const AnswerSurveyScreen: React.FC<{ route: { params: { surveyId: string } } }> = ({ route }) => {
    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  
    const handleAnswerChange = (questionId: string, optionId: string) => {
      setAnswers({ ...answers, [questionId]: optionId });
    };
  
    const handleSubmitAnswers = async () => {
      if (Object.keys(answers).length !== questions.length) {
        // Afficher un message d'erreur
        return;
      }
  
      const newResponse: Response = {
        id: uuid.v4(),
        surveyId: surveyId,
        userId: firebase.auth().currentUser?.uid || '',
        answers: Object.entries(answers).map(([questionId, optionId]) => ({ questionId, optionId })),
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
  
      try {
        await firestore().collection('responses').add(newResponse);
        // Naviguer vers l'écran d'accueil
      } catch (error) {
        console.error('Error submitting answers:', error);
        // Afficher un message d'erreur
      }
    };
  
    const survey = useFirestoreDocumentData<Survey>(`surveys/${surveyId}`);
    const questions = survey?.questions || [];
  
    return (
      <View>
        {questions.map(question => (
          <View key={question.id}>
            <Text>{question.text}</Text>
            {question.options.map(option => (
              <View key={option.id}>
                <Button
                  title={option.text}
                  onPress={() => handleAnswerChange(question.id, option.id)}
                  color={answers[question.id] === option.id ? 'primary' : 'tertiary'}
                />
              </View>
            ))}
          </View>
        ))}
        <Button title="Soumettre les réponses" onPress={handleSubmitAnswers} />
      </View>
    );
  };
  