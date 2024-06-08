const generateResultsSummary = (survey: Survey, questionStatistics: { [questionId: number]: any[] }) => {
    let summary = `Résultats du questionnaire : ${survey.title}\n\n`;
  
    for (const question of survey.questions) {
      summary += `${question.text}\n`;
  
      for (const stat of questionStatistics[question.id]) {
        summary += `${stat.label} : ${stat.value} (${stat.percentage.toFixed(1)}%)\n`;
      }
  
      summary += '\n';
    }
  
    return summary;
  };
  