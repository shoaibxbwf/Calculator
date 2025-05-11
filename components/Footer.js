function Footer() {
    try {
        return (
            <div
                data-name="footer"
                className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center py-2 bg-white shadow-md w-full sm:w-auto sm:px-4 z-50"
            >
                <p data-name="credit" className="text-red-500 text-sm">
                    Developed by Shoaib
                </p>
            </div>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
        return null;
    }
}
