function Header() {
    try {
        return (
            <div data-name="header" className="text-center py-4 mb-6">
                <h1 data-name="title" className="text-4xl font-bold text-white">CALCUMATE</h1>
            </div>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
