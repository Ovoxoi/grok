const handleShareResults = () => {
    const resultsSummary = generateResultsSummary(survey, questionStatistics);
  
    Share.share({
      title: `Résultats du questionnaire : ${survey.title}`,
      message: resultsSummary,
    });
  };
  