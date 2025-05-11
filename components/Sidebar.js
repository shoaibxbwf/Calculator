function Sidebar({ activeCalc, setActiveCalc }) {
    try {
        const menuItems = [
            { id: 'standard', label: 'Standard', icon: 'calculator' },
            { id: 'scientific', label: 'Scientific', icon: 'flask' },
            { id: 'age', label: 'Age', icon: 'calendar-alt' },
            { id: 'loan', label: 'Loan', icon: 'money-bill-wave' },
            { id: 'bmi', label: 'BMI', icon: 'weight' }
        ];

        return (
            <div data-name="sidebar" className="w-48 h-full">
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        data-name={`menu-item-${item.id}`}
                        className={`p-4 cursor-pointer mb-2 rounded-l-lg transition-all duration-300 flex items-center ${
                            activeCalc === item.id ? 'active-calc' : 'hover:bg-gray-800'
                        }`}
                        onClick={() => setActiveCalc(item.id)}
                    >
                        <i className={`fas fa-${item.icon} mr-3`}></i>
                        {item.label}
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return null;
    }
}
