import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { BarChart, PieChart } from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { BarChart, PieChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const saveImage = async (chart: any) => {
  const fileName = `result_${Date.now()}.png`;
  const filePath = FileSystem.documentDirectory + fileName;
  await chart.toImage().then((image) => FileSystem.writeAsStringAsync(filePath, image, { encoding: 'base64' }));
  return filePath;
};

const shareImage = async (chart: any) => {
  const filePath = await saveImage(chart);
  await Sharing.shareAsync({
    dialogTitle: 'Partager les résultats',
    UTI: 'public.image',
    url: filePath,
  });
};

const getResults = async (surveyId: string) => {
  const results: any[] = [];
  const responses = await firebase
    .firestore()
    .collection('responses')
    .where('surveyId', '==', surveyId)
    .get();
  responses.forEach((response) => {
    response.data().answers.forEach((answer: any) => {
      const index = results.findIndex((result: any) => result.id === answer.id);
      if (index === -1) {
        results.push({ id: answer.id, count: 1 });
      } else {
        results[index].count += 1;
      }
    });
  });
  return results;
};

const convertData = (results: any[]) => {
  const labels: string[] = [];
  const data: number[] = [];
  const colors: string[] = [];
  results.forEach((result) => {
    labels.push(result.text);
    data.push(result.count);
    colors.push(result.color);
  });
  return { labels, data, colors };
};

const ResultsScreen: React.FC<{ route: any }> = ({ route }) => {
  // ...
  return (
    <View>
      {questions.map((question, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{question.text}</Text>
          {question.type === 'multiple_choice' || question.type === 'single_choice' ? (
            <>
              <PieChart
                // ...
                onDataPointClick={(data: any) => console.log('Data : ', data)}
                onSelectDataPoint={(data: any) => console.log('Data : ', data)}
                style={{ marginVertical: 8 }}
              />
              <TouchableOpacity onPress={() => shareImage(chartRef.current)} style={{ backgroundColor: '#e26a00', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Partager les résultats</Text>
              </TouchableOpacity>
            </>
          ) : (
            <BarChart
              // ...
              onDataPointClick={(data: any) => console.log('Data : ', data)}
              onSelectDataPoint={(data: any) => console.log('Data : ', data)}
              style={{ marginVertical: 8 }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default ResultsScreen;


const ResultsScreen: React.FC<{ route: { params: { surveyId: number } } }> = ({ route }) => {
    const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([]);
    const [questionStatistics, setQuestionStatistics] = useState<{ [questionId: number]: any[] }>({});
  
    useEffect(() => {
      async function fetchData() {
        const responses = await getSurveyResponses(route.params.surveyId);
        setSurveyResponses(responses);
  
        const statistics: { [questionId: number]: any[] } = {};
  
        for (const question of responses[0].survey.questions) {
          statistics[question.id] = calculateQuestionStatistics(question, responses);
        }
  
        setQuestionStatistics(statistics);
      }
  
      fetchData();
    }, []);
    return (
      <View>
        {/* Afficher les statistiques et les graphiques pour chaque question d'un questionnaire */}
  
        <Button title="Partager les résultats" onPress={handleShareResults} />
      </View>
    );
   
    // Afficher les statistiques et les graphiques pour chaque question d'un questionnaire
  };
  
