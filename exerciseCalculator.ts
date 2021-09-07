type AchievementRating = 0 | 1 | 2 | 3;

interface ExerciseResult  {
  periodLength: number
  trainingDays: number
  averageHoursTarget: number
  averageExerciseTime: number
  success: boolean
  rating: AchievementRating
  ratingDescription: string
};


const calculateExercises = (dailyResults: Array<number>, target: number): ExerciseResult  => {
  const totalHours: number = dailyResults.reduce((accumulator, currentValue) => accumulator + currentValue);
  const averageExerciseTime: number= totalHours/dailyResults.length;
  const averageHoursTarget: number= target;
  let ratingDescription:string = "";
  let percentageSuccess: number = (averageExerciseTime/target)*100


  const ratingMachine = (whatYouAimedFor: number, whatYouAccomplished: number): AchievementRating => {
    if(whatYouAccomplished >= whatYouAimedFor){
      ratingDescription ="Excellent work. " + percentageSuccess
      return 3
    }
    else if (whatYouAccomplished >= 0.67*whatYouAimedFor) {
      ratingDescription= "That was quite good but you know you can do better " + percentageSuccess
      return 2
    }
    else if (whatYouAccomplished >= 0.33*whatYouAimedFor) {
      ratingDescription= "That was not even close but good that you tried " + percentageSuccess
      return 1
    } else{
      ratingDescription= "Yuck! " + percentageSuccess
      return 0
    }
  }

  return {
    periodLength: dailyResults.length,
    trainingDays: dailyResults.filter(d => d > 0).length,
    averageHoursTarget,
    averageExerciseTime,
    success: averageHoursTarget > averageExerciseTime,
    rating: ratingMachine(target, averageExerciseTime),
    ratingDescription
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 6))