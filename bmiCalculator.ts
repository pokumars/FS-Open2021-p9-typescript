const calculateBmi = (height:number, mass:number): string => {

  const heightInMetres: number = height/100
  const bmi = (mass/(Math.pow(heightInMetres, 2)))

  if (bmi < 25) {
    return `Healthy. Your BMI result is ${bmi}`;
  } 
  else if (bmi >= 25 || bmi <30){
    return `Overweight. Your BMI result is ${bmi}`;
  } 
  else if(bmi >= 30) {
    return `Obese. Your BMI result is ${bmi}.`;
  }
}

console.log(calculateBmi(180, 74))
