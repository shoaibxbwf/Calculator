function BmiCalc() {
    try {
        const [weight, setWeight] = React.useState('');
        const [height, setHeight] = React.useState('');
        const [age, setAge] = React.useState('');
        const [gender, setGender] = React.useState('male');
        const [activityLevel, setActivityLevel] = React.useState('sedentary');
        const [bmi, setBmi] = React.useState(null);

        const activityLevels = {
            sedentary: 'Sedentary (little or no exercise)',
            light: 'Lightly active (1-3 days/week)',
            moderate: 'Moderately active (3-5 days/week)',
            active: 'Very active (6-7 days/week)',
            extra: 'Extra active (very active & physical job)'
        };

        const calculateBMI = () => {
            const weightKg = parseFloat(weight);
            const heightM = parseFloat(height) / 100;
            const bmiValue = weightKg / (heightM * heightM);
            
            // Calculate BMR (Basal Metabolic Rate) using Harris-Benedict Equation
            let bmr;
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weightKg) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weightKg) + (3.098 * height) - (4.330 * age);
            }

            // Activity factor multipliers
            const activityFactors = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725,
                extra: 1.9
            };

            const tdee = bmr * activityFactors[activityLevel];

            setBmi({
                value: bmiValue.toFixed(1),
                category: getBMICategory(bmiValue),
                bmr: Math.round(bmr),
                tdee: Math.round(tdee)
            });
        };

        const getBMICategory = (bmi) => {
            if (bmi < 18.5) return 'Underweight';
            if (bmi < 25) return 'Normal weight';
            if (bmi < 30) return 'Overweight';
            return 'Obese';
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') calculateBMI();
        };

        React.useEffect(() => {
            document.addEventListener('keydown', handleKeyPress);
            return () => document.removeEventListener('keydown', handleKeyPress);
        }, [weight, height, age, gender, activityLevel]);

        return (
            <div data-name="bmi-calculator" className="w-96 p-6 rounded-lg calculator-display">
                <h2 className="section-title">BMI Calculator</h2>
                <div className="space-y-4">
                    <input
                        type="number"
                        data-name="weight-input"
                        placeholder="Weight (kg)"
                        className="input-field w-full"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <input
                        type="number"
                        data-name="height-input"
                        placeholder="Height (cm)"
                        className="input-field w-full"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <input
                        type="number"
                        data-name="age-input"
                        placeholder="Age"
                        className="input-field w-full"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    
                    <div className="flex space-x-4">
                        <button
                            className={`calc-button flex-1 ${gender === 'male' ? 'button-highlight' : ''}`}
                            onClick={() => setGender('male')}
                        >
                            Male
                        </button>
                        <button
                            className={`calc-button flex-1 ${gender === 'female' ? 'button-highlight' : ''}`}
                            onClick={() => setGender('female')}
                        >
                            Female
                        </button>
                    </div>

                    <select
                        className="input-field w-full"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    >
                        {Object.entries(activityLevels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>

                    <button
                        data-name="calculate-btn"
                        className="calc-button w-full"
                        onClick={calculateBMI}
                    >
                        Calculate BMI
                    </button>

                    {bmi && (
                        <div data-name="result" className="result-container">
                            <p className="text-xl mb-2">BMI: {bmi.value}</p>
                            <p className="mb-2">Category: {bmi.category}</p>
                            <p className="mb-2">BMR: {bmi.bmr} calories/day</p>
                            <p>TDEE: {bmi.tdee} calories/day</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('BmiCalc component error:', error);
        reportError(error);
        return null;
    }
}
