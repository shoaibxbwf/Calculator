function ScientificCalc() {
    try {
        const [display, setDisplay] = React.useState('0');
        const [expression, setExpression] = React.useState('');
        const [memory, setMemory] = React.useState(0);
        const [degreeMode, setDegreeMode] = React.useState(true);
        const [selectedOperator, setSelectedOperator] = React.useState(null);

        const evaluateExpression = (expr) => {
            expr = expr.replace(/π/g, Math.PI);
            expr = expr.replace(/e/g, Math.E);
            return Function(`'use strict'; return (${expr})`)();
        };

        const handleNumber = (num) => {
            if (num === 'π' || num === 'e') {
                setDisplay(prev => prev === '0' ? num : prev + num);
                setExpression(prev => prev + num);
            } else {
                setDisplay(prev => prev === '0' ? num : prev + num);
                setExpression(prev => prev + num);
            }
            setSelectedOperator(null);
        };

        const handleOperator = (op) => {
            setSelectedOperator(op);
            setDisplay('0');
            setExpression(prev => prev + op);
        };

        const handleScientific = (func) => {
            try {
                const value = parseFloat(display);
                let result;

                switch(func) {
                    case 'sin':
                    case 'cos':
                    case 'tan':
                        const angleInRad = degreeMode ? value * Math.PI / 180 : value;
                        result = Math[func](angleInRad);
                        break;
                    case 'log':
                        result = Math.log10(value);
                        break;
                    case 'ln':
                        result = Math.log(value);
                        break;
                    case 'sqrt':
                        result = Math.sqrt(value);
                        break;
                    case 'x²':
                        result = Math.pow(value, 2);
                        break;
                    case 'x³':
                        result = Math.pow(value, 3);
                        break;
                    default:
                        result = value;
                }

                setDisplay(result.toString());
                setExpression(result.toString());
            } catch (err) {
                setDisplay('Error');
            }
            setSelectedOperator(null);
        };

        const calculateResult = () => {
            try {
                const result = evaluateExpression(expression);
                setDisplay(result.toString());
                setExpression(result.toString());
            } catch (err) {
                setDisplay('Error');
            }
            setSelectedOperator(null);
        };

        const clear = () => {
            setDisplay('0');
            setExpression('');
            setSelectedOperator(null);
        };

        const handleMemory = (operation) => {
            const currentValue = parseFloat(display);
            switch(operation) {
                case 'MC':
                    setMemory(0);
                    break;
                case 'MR':
                    setDisplay(memory.toString());
                    setExpression(memory.toString());
                    break;
                case 'M+':
                    setMemory(memory + currentValue);
                    break;
                case 'M-':
                    setMemory(memory - currentValue);
                    break;
            }
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') calculateResult();
            if (e.key === 'Escape') clear();
            if (/[\d\+\-\*\/\(\)]/.test(e.key)) {
                e.preventDefault();
                if (/\d/.test(e.key)) handleNumber(e.key);
                else handleOperator(e.key);
            }
        };

        React.useEffect(() => {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [expression]);

        const scientificButtons = [
            ['sin', 'cos', 'tan', 'log', 'ln'],
            ['sqrt', 'x²', 'x³', 'π', 'e'],
            ['(', ')', '^', '±', 'DEG']
        ];

        const numericButtons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+']
        ];

        return (
            <div data-name="scientific-calculator" className="w-[400px] p-6 rounded-lg calculator-display">
                <h2 className="section-title">Scientific Calculator</h2>
                <div data-name="display" className="calculator-screen p-4 rounded mb-4 text-right text-2xl">
                    {display}
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <button className="calc-button col-span-4" onClick={clear}>C</button>
                    
                    {scientificButtons.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((btn) => (
                                <button
                                    key={btn}
                                    className={`calc-button ${selectedOperator === btn ? 'button-highlight' : ''}`}
                                    onClick={() => {
                                        if (btn === 'DEG') {
                                            setDegreeMode(!degreeMode);
                                        } else if (btn === 'π' || btn === 'e') {
                                            handleNumber(btn);
                                        } else {
                                            handleScientific(btn);
                                        }
                                    }}
                                >
                                    {btn === 'DEG' ? (degreeMode ? 'DEG' : 'RAD') : btn}
                                </button>
                            ))}
                        </React.Fragment>
                    ))}
                    
                    {numericButtons.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((btn) => (
                                <button
                                    key={btn}
                                    className={`calc-button ${selectedOperator === btn ? 'button-highlight' : ''}`}
                                    onClick={() => {
                                        if (btn === '=') calculateResult();
                                        else if (['+', '-', '*', '/', '^'].includes(btn)) handleOperator(btn);
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
        console.error('ScientificCalc component error:', error);
        reportError(error);
        return null;
    }
}
