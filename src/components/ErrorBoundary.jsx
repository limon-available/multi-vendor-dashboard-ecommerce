import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='min-h-screen flex flex-col items-center justify-center text-center p-4'>
                    <h1 className='text-2xl font-semibold mb-4'>Something went wrong</h1>
                    <button
                        onClick={() => window.location.reload()}
                        className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                    >
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
