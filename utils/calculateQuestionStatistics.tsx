const calculateQuestionStatistics = (question: Question, responses: SurveyResponse[]) => {
    const optionCounts: { [optionId: number]: number } = {};
  
    for (const response of responses) {
      for (const answer of response.questions) {
        if (answer.questionId === question.id && answer.optionId !== undefined) {
          optionCounts[answer.optionId] = (optionCounts[answer.optionId] || 0) + 1;
        }
      }
    }
  
    const totalCount = Object.values(optionCounts).reduce((sum, count) => sum + count, 0);
    const optionStatistics: { label: string; value: number; percentage: number }[] = [];
  
    for (const option of question.options) {
      const count = optionCounts[option.id] || 0;
      optionStatistics.push({
        label: option.text,
        value: count,
        percentage: (count / totalCount) * 100,
      });
    }
  
    return optionStatistics;
  };
  