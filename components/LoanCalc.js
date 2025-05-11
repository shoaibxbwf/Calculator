function LoanCalc() {
    try {
        const [amount, setAmount] = React.useState('');
        const [rate, setRate] = React.useState('');
        const [years, setYears] = React.useState('');
        const [result, setResult] = React.useState(null);

        const formatIndianCurrency = (amount) => {
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            });
            return formatter.format(amount);
        };

        const calculateLoan = () => {
            const principal = parseFloat(amount);
            const annualRate = parseFloat(rate) / 100;
            const totalMonths = parseFloat(years) * 12;
            
            const monthlyRate = annualRate / 12;
            const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                                 (Math.pow(1 + monthlyRate, totalMonths) - 1);
            
            const totalPayment = monthlyPayment * totalMonths;
            const totalInterest = totalPayment - principal;
            
            setResult({
                monthlyPayment: formatIndianCurrency(monthlyPayment),
                totalPayment: formatIndianCurrency(totalPayment),
                totalInterest: formatIndianCurrency(totalInterest)
            });
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                calculateLoan();
            }
        };

        React.useEffect(() => {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [amount, rate, years]);

        return (
            <div data-name="loan-calculator" className="w-96 p-4 rounded-lg calculator-display">
                <h2 className="section-title">Loan Calculator</h2>
                <div className="space-y-4">
                    <input
                        type="number"
                        data-name="loan-amount"
                        placeholder="Loan Amount (₹)"
                        className="w-full p-2 bg-gray-800 rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        type="number"
                        data-name="interest-rate"
                        placeholder="Interest Rate (%)"
                        className="w-full p-2 bg-gray-800 rounded"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                    <input
                        type="number"
                        data-name="loan-years"
                        placeholder="Loan Term (Years)"
                        className="w-full p-2 bg-gray-800 rounded"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                    />
                    <button
                        data-name="calculate-btn"
                        className="w-full p-3 bg-blue-600 rounded"
                        onClick={calculateLoan}
                    >
                        Calculate
                    </button>
                    {result && (
                        <div data-name="result" className="space-y-2 mt-4">
                            <p>Monthly Payment: {result.monthlyPayment}</p>
                            <p>Total Payment: {result.totalPayment}</p>
                            <p>Total Interest: {result.totalInterest}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoanCalc component error:', error);
        reportError(error);
        return null;
    }
}
