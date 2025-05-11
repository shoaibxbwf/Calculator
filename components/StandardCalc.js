function StandardCalc() {
    try {
        const [display, setDisplay] = React.useState('0');
        const [expression, setExpression] = React.useState('');
        const [highlightedBtn, setHighlightedBtn] = React.useState(null);

        const handleNumber = (num) => {
            setDisplay(prev => prev === '0' ? num : prev + num);
            setExpression(prev => prev + num);
        };

        const handleOperator = (op) => {
            setDisplay('0');
            setExpression(prev => prev + op);
            setHighlightedBtn(op);
        };

        const calculate = () => {
            try {
                const result = eval(expression);
                setDisplay(result.toString());
                setExpression(result.toString());
            } catch (err) {
                setDisplay('Error');
            }
            setHighlightedBtn(null);
        };

        const clear = () => {
            setDisplay('0');
            setExpression('');
            setHighlightedBtn(null);
        };

        const handleKeyPress = (e) => {
            if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
            if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
            if (e.key === 'Enter') calculate();
            if (e.key === 'Escape') clear();
        };

        React.useEffect(() => {
            document.addEventListener('keydown', handleKeyPress);
            return () => document.removeEventListener('keydown', handleKeyPress);
        }, [expression]);

        const buttons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+']
        ];

        return (
            <div data-name="standard-calculator" className="w-80 p-6 rounded-lg calculator-display">
                <h2 className="section-title">Standard Calculator</h2>
                <div data-name="display" className="calculator-screen p-4 rounded mb-4 text-right text-2xl">
                    {display}
                </div>
                <div data-name="keypad" className="grid grid-cols-4 gap-3">
                    <button
                        data-name="clear-btn"
                        className="calc-button col-span-4"
                        onClick={clear}
                    >
                        C
                    </button>
                    {buttons.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((btn) => (
                                <button
                                    key={btn}
                                    data-name={`btn-${btn}`}
                                    className={`calc-button ${
                                        highlightedBtn === btn ? 'button-highlight' : ''
                                    }`}
                                    onClick={() => {
                                        if (btn === '=') calculate();
                                        else if (['+', '-', '*', '/'].includes(btn)) handleOperator(btn);
                                        else handleNumber(btn);
                                    }}
                                >
                                    {btn}
                                </button>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('StandardCalc component error:', error);
        reportError(error);
        return null;
    }
}
