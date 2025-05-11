function App() {
    try {
        const [activeCalc, setActiveCalc] = React.useState('standard');

        const renderCalculator = () => {
            switch(activeCalc) {
                case 'standard':
                    return <StandardCalc />;
                case 'scientific':
                    return <ScientificCalc />;
                case 'age':
                    return <AgeCalc />;
                case 'loan':
                    return <LoanCalc />;
                case 'bmi':
                    return <BmiCalc />;
                default:
                    return <StandardCalc />;
            }
        };

        return (
            <div data-name="app" className="min-h-screen">
                <Header />
                <div data-name="main-content" className="container mx-auto px-4 flex">
                    <Sidebar activeCalc={activeCalc} setActiveCalc={setActiveCalc} />
                    <div data-name="calculator-container" className="flex-1 flex justify-center">
                        {renderCalculator()}
                    </div>
                </div>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
