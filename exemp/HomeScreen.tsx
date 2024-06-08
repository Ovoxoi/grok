




  const handleSurveyPress = (survey: Survey) => {
    // Naviguer vers l'écran de visualisation des résultats
  };

  return (
    <Surface style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text variant="titleLarge">Questionnaires</Text>
        <FlatList
          data={surveys}
          renderItem={({ item }) => (
            <SurveyListItem survey={item} onPress={() => handleSurveyPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Surface>
  );
};

export default HomeScreen;
