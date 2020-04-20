function calculateBMI(weight, height) {
  return weight / (height * height);
}
function calculateBMR(weight, height, ageOfUser, genderOfUser) {
  const heightInCm = height * 100;

  let BMR;

  if (genderOfUser === "m") {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
  } else {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
  }

  return BMR;
}
function calculateIdealWeight(height) {
  return 22.5 * (height * height);
}
function calculateDailyCalories(basicMetabolicRate, doesUserExcercise) {
  return doesUserExcercise === "yes"
    ? basicMetabolicRate * 1.6
    : basicMetabolicRate * 1.4;
}
function calculateDietWeeks(weigthDifferenceFromIdeal) {
  return Math.abs(weigthDifferenceFromIdeal / 0.5);
}
function calculateDietCalories(weigthDiferenceFromIdeal, usersDailyCalories) {
  return weigthDiferenceFromIdeal < 0
    ? usersDailyCalories + 500
    : usersDailyCalories - 500;
}

function validateNumberOfInputsIsEight(argv) {
  if (argv.length !== 8) {
    console.log(`
    You gave ${argv.length - 2} arguments(s) to the program

    Please provide all 6 arguments in the following order
    separated by spaces starting with your: 
    
    name,
    age (years), 
    weight (kg), 
    height (m), 
    your gender (m for Mail, f for female)
    and whether you exercise daily (yes or no)
        
    Example input:
    $ node index.js John 28 74 1.79 m yes 
  `);

    process.exit();
  }
}

function validateNameLenght(userName) {
  if (String(userName).length > 15) {
    console.log(`
  Although there is no restriction here on 
  how you want to call yourself, lets be 
  reasonable and limit it to 15 charachters,
  ok? 

  Example input:
  $ node index.js John 28 74 1.79 m yes  
  `);
    process.exit();
  }
}

function validateNumericalInputs(weight, height, age) {
  if (isNaN(weight) || isNaN(height) || isNaN(age)) {
    // if arg NOT IS a number
    console.log(`
Please make sure that the folowing
parameters are numbers:

Parameter    (Example)   Your input
-----------------------------------
Age in years    28          ${age}
Weight in kg    74          ${weight}
Height in m     1.79        ${height}

Example syntax:
$ node index.js John 28 74 1.79 m yes 
`);
    process.exit();
  } else if (age < 20) {
    // if parameters are Numbers check if age>20
    console.log(`
    This calculation is designed for adults
     of 20 years or older, while your input
     was: ${age} 
         
    Example syntax:
    $ node index.js John 28 74 1.79 m yes 
    `);
    process.exit();
  } else if (weight < 30 || weight > 300) {
    // if parameter weight 30-300
    console.log(`
    This calculation is designed for adults
    with weight between 30kg and 300kg.
    Altough your input: ${weight} is out of
    this range you are still an wonderful
    being <3
         
    Example syntax:
    $ node index.js John 28 74 1.79 m yes 
    `);
    process.exit();
  }
}
function validateGenderInput(userGender) {
  if (userGender !== "f" && userGender !== "m") {
    console.log(`
    Please enter "m" for male or "f" for female.
    Your input: ${userGender}

    Example syntax:
    $ node index.js John 28 74 1.79 m yes 
    `);
    process.exit();
  }
}
function validateDailyExcerciseInput(excerciseInput) {
  if (excerciseInput !== "yes" && excerciseInput !== "no") {
    console.log(`
      Please enter "yes" if you excercise daily
      or "no" if you dont.
      
      Your input: ${excerciseInput}
  
      Example syntax:
      $ node index.js John 28 74 1.79 m yes 
      `);
    process.exit();
  }
}

function formatOutput(userObject) {
  return `
    **************
    BMI CALCULATOR
    **************
    
    name: ${userObject.name}  
    age: ${Math.round(userObject.age)} years
    weight: ${userObject.weightInKg} kg
    height: ${userObject.heightInM} m
    gender: ${userObject.gender === "m" ? "male" : "female"}
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI.toFixed(1)}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeight.toFixed(1)} kg
    With a normal lifestyle you burn ${Math.round(
      userObject.dailyCalories
    )} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeight.toFixed(
      1
    )} kg:

    Eat ${Math.round(userObject.dietCalories)} calories a day
    For ${Math.round(userObject.dietWeeks)} weeks
    `;
}
function bmiCalculator() {
  validateNumberOfInputsIsEight(process.argv);

  const name = process.argv[2];
  const age = parseInt(process.argv[3]);
  const weightInKg = parseInt(process.argv[4]);
  const heightInM = parseFloat(process.argv[5]);
  const gender = process.argv[6];
  const dailyExercise = process.argv[7];

  validateNameLenght(name);
  validateNumericalInputs(weightInKg, heightInM, age);
  validateGenderInput(gender);
  validateDailyExcerciseInput(dailyExercise);

  const BMI = calculateBMI(weightInKg, heightInM);
  const BMR = calculateBMR(weightInKg, heightInM, age, gender);
  const idealWeight = calculateIdealWeight(heightInM);
  const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
  const weightToLose = weightInKg - idealWeight;
  const dietWeeks = calculateDietWeeks(weightToLose);
  const dietCalories = calculateDietCalories(weightToLose, dailyCalories);

  const user = {
    name: name,
    age: age,
    weightInKg: weightInKg,
    heightInM: heightInM,
    gender: gender,
    dailyExercise: dailyExercise,
    BMI: BMI,
    idealWeight: idealWeight,
    dailyCalories: dailyCalories,
    weightToLose: weightToLose,
    dietWeeks: dietWeeks,
    dietCalories: dietCalories,
  };

  // We call formatOutput and pass in all the data using an object
  const output = formatOutput(user);
  // Now that we have all our data grouped in this user object

  console.log(output);
}

bmiCalculator();
