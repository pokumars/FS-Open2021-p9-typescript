export const calculateBmi = (height: number, mass: number): string => {

  const heightInMetres: number = height / 100;
  const bmi = (mass / (Math.pow(heightInMetres, 2)));

  if (bmi < 25) {
    return `Healthy. Your BMI result is ${bmi}`;
  }
  else if (bmi >= 25 || bmi < 30) {
    return `Overweight. Your BMI result is ${bmi}`;
  }
  else if (bmi >= 30) {
    return `Obese. Your BMI result is ${bmi}.`;
  }
  else return 'the given values dont make sense';
};

interface BmiParams {
  height: number
  mass: number
}

export const parseArguments = (args: Array<string>): BmiParams => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length < 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {

    return {
      height: Number(args[2]),
      mass: Number(args[3])
    };
  } else {
    throw new Error("Some of the expected numbers were not numbers");

  }
};



try {
  const { mass, height } = parseArguments(process.argv);

  console.log(calculateBmi(height, mass));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}