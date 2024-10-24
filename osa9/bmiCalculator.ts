interface BmiCalculator {
    height: number
    weight: number
}

const parseBmiArguments = (args: string[]): BmiCalculator => {
    if (args.length < 4) throw new Error('You must provide height and weight');
    if (args.length > 4) throw new Error('You proveide too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    }
    else {
        throw new Error('Please, provide numbers as arguments');
    }
};

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) ** 2);
    let category: string;

    if (bmi < 16) {
        category = 'Underweight (Severe thinness)';
    }

    else if (bmi < 17) {
        category = 'Underweight (Moderate thinness)';
    }

    else if (bmi < 18.5) {
        category = 'Underweight (Mild thinness)';
    }
    
    else if (bmi < 25) {
        category = 'Normal range';
    }

    else if (bmi < 30) {
        category = 'Overweight (Pre-obese)';
    }
    else if (bmi < 35) {
        category = 'Obese (Class I)';
    }

    else if (bmi < 40) {
        category = 'Obese (Class II)';
    }

    else {
        category = 'Obese (Class III)';
    }
    
    if (require.main === module) {
        console.log(category);
        return;
    }
    else {
        return category;
    }

};

if (require.main === module) {
    try {
        const {height, weight } = parseBmiArguments(process.argv);
        calculateBmi(height, weight);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateBmi;


/*
const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2)
    let category: string

    if (bmi < 16) {
        category = 'Underweight (Severe thinness)'
    }

    else if (bmi < 17) {
        category = 'Underweight (Moderate thinness)'
    }

    else if (bmi < 18.5) {
        category = 'Underweight (Mild thinness)'
    }
    
    else if (bmi < 25) {
        category = 'Normal range'
    }

    else if (bmi < 30) {
        category = 'Overweight (Pre-obese)'
    }
    else if (bmi < 35) {
        category = 'Obese (Class I)'
    }

    else if (bmi < 40) {
        category = 'Obese (Class II)'
    }

    else {
        category = 'Obese (Class III)'
    }

    return category

}

console.log(calculateBmi(180, 74))
*/

