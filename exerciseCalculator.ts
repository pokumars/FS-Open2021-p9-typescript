type AchievementRating = 0 | 1 | 2 | 3;

interface ExerciseResult  {
  periodLength: number
  trainingDays: number
  averageHoursTarget: number
  averageExerciseTime: number
  success: boolean
  rating: AchievementRating
  ratingDescription: string
}

interface ExerciseArgument  {
  target: number
  results: Array<number>
}


const argumentParser = (args: Array<string>): ExerciseArgument => {
  if (args.length < 4)  throw new Error("Not enough arguments");
  const target = Number(args[2]);
  const results = args.slice(3);
  
  if( results.findIndex(n => isNaN(Number(n))) === -1 && !isNaN(target)) {
    console.log('results.findIndex(n => isNaN(Number(n)))', results.findIndex(n => isNaN(Number(n))));
    return {
      target: Number(target),
      results: results.map(n => Number(n))
    };
  } else {
    throw new Error("Some of the expected numbers were not numbers");
    
  }  
};

const calculateExercises = (dailyResults: Array<number>, target: number): ExerciseResult  => {
  const totalHours: number = dailyResults.reduce((accumulator, currentValue) => accumulator + currentValue);
  const averageExerciseTime: number= totalHours/dailyResults.length;
  const averageHoursTarget: number= target;
  let ratingDescription = "";
  const percentageSuccess: number = (averageExerciseTime/target)*100;


  const ratingMachine = (whatYouAimedFor: number, whatYouAccomplished: number): AchievementRating => {
    if(whatYouAccomplished >= whatYouAimedFor){
      ratingDescription ="Excellent work. " + percentageSuccess;
      return 3;
    }
    else if (whatYouAccomplished >= 0.67*whatYouAimedFor) {
      ratingDescription= "That was quite good but you know you can do better " + percentageSuccess;
      return 2;
    }
    else if (whatYouAccomplished >= 0.33*whatYouAimedFor) {
      ratingDescription= "That was not even close but good that you tried " + percentageSuccess;
      return 1;
    } else{
      ratingDescription= "Yuck! " + percentageSuccess;
      return 0;
    }
  };

  return {
    periodLength: dailyResults.length,
    trainingDays: dailyResults.filter(d => d > 0).length,
    averageHoursTarget,
    averageExerciseTime,
    success: averageExerciseTime  > averageHoursTarget,
    rating: ratingMachine(target, averageExerciseTime),
    ratingDescription
  };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 6))

try {
  const { target, results} = argumentParser(process.argv);
    
  console.log(calculateExercises(results, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

