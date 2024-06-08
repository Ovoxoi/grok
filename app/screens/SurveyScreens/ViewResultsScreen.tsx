


const ViewResultsScreen: React.FC<{ route: { params: { surveyId: string } } }> = ({ route }) => {
    const survey = useFirestoreDocumentData<Survey>(`surveys/${surveyId}`);
    const questions = survey?.questions || [];
    const responses = useFirestoreCollectionData<Response>(`responses`, [
      { field: 'surveyId', op: '==', value: surveyId },
    ]);
  
    const getOptionCount = (questionId: string, optionId: string) => {
      return responses?.filter(response => response.answers.some(({ questionId: qId, optionId: oId }) => qId === questionId && oId === optionId)).length || 0;
    };
  
    return (
      <View>
        {questions.map(question => (
          <View key={question.id}>
            <Text>{question.text}</Text>
            {question.options.map(option => (
              <View key={option.id}>
                <Text>{option.text} ({getOptionCount(question.id, option.id)}/{responses?.length || 0})</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };
  