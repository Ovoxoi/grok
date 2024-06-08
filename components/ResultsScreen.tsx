

const ResultsScreen: React.FC<{ route: any }> = ({ route }) => {
    const [results, setResults] = useState<any[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
  
    useEffect(() => {
      const surveyId = route.params.surveyId;
      getResults(surveyId).then((results) => setResults(results));
      firebase
        .firestore()
        .collection('surveys')
        .doc(surveyId)
        .get()
        .then((survey) => setQuestions(survey.data().questions));
    }, []);
  
    return (
      <View>
        {questions.map((question, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{question.text}</Text>
            {question.type === 'multiple_choice' || question.type === 'single_choice' ? (
              <PieChart
                data={convertData(
                  results.filter((result: any) => result.id === question.options[0].id).map((result: any) => result.options[0])),
                )}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor={'count'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
              />
            ) : (
              <BarChart
                data={convertData(
                  results.filter((result: any) => result.id === question.id).map((result: any) => result.text),
                )}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                verticalLabelRotation={30}
                fromZero={true}
              />
            )}
          </View>
        ))}
      </View>
    );
  };
  
  export default ResultsScreen;
  