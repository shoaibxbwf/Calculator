function Footer() {
    try {
        return (
            <div data-name="footer" className="text-center py-4 mt-6">
                <p data-name="credit" className="text-red-500">
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
