import { EventData } from "../definitions";

const getEventScore = (event: EventData, surveyAnswers: { question1: string; question2: string; question3: string }) => {
    let score = 0;
  
    const socialMap: { [key: string]: number } = { '😶': 1, '😌': 2, '😁': 3 };
    const surveySocial = socialMap[surveyAnswers.question2];
    if (event.social === surveySocial) score += 10;
  
    const sentimentMap: { [key: string]: number } = { '😶': 1, '😌': 2, '😁': 3 };
    const surveySentiment = sentimentMap[surveyAnswers.question1];
    if (event.sentiment === surveySentiment) score += 10;
    
    const surveyType = surveyAnswers.question3.split(' ')[1]; 
    if (event.type.includes(surveyType)) score += 15; 
    return score;
  };
  

  export const sortEventsBySurvey = (events: EventData[], surveyAnswers: any) => {
    return events
      .map((event) => ({
        ...event,
        score: getEventScore(event, surveyAnswers),
      }))
      .sort((a, b) => b.score - a.score); // Sort by score, highest first
  
    };
