function AgeCalc() {
    try {
        const [birthDate, setBirthDate] = React.useState('');
        const [age, setAge] = React.useState(null);

        const calculateAge = () => {
            if (!birthDate) return;
            
            const birth = new Date(birthDate);
            const today = new Date();
            
            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            let days = today.getDate() - birth.getDate();
            
            if (months < 0 || (months === 0 && days < 0)) {
                years--;
                months += 12;
            }
            
            if (days < 0) {
                months--;
                const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
                days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
            }
            
            setAge({ years, months, days });
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                calculateAge();
            }
        };

        React.useEffect(() => {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [birthDate]);

        return (
            <div data-name="age-calculator" className="w-96 p-4 rounded-lg calculator-display">
                <h2 className="section-title">Age Calculator</h2>
                <div data-name="input-section" className="mb-4">
                    <input
                        type="date"
                        data-name="birth-date-input"
                        className="w-full p-2 bg-gray-800 rounded text-white"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <button
                    data-name="calculate-btn"
                    className="w-full p-3 bg-blue-600 rounded mb-4"
                    onClick={calculateAge}
                >
                    Calculate Age
                </button>
                {age && (
                    <div data-name="result" className="text-center">
                        <h3 className="text-xl mb-2">Your Age is:</h3>
                        <p>{age.years} years, {age.months} months, {age.days} days</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('AgeCalc component error:', error);
        reportError(error);
        return null;
    }
}
