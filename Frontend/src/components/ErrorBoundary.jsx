// // src/components/ErrorBoundary.jsx
// import { Component } from 'react';
// import PropTypes from 'prop-types';

// class ErrorBoundary extends Component {
//   state = { 
//     hasError: false,
//     error: null,
//     errorInfo: null 
//   };

//   // Update state when error occurs
//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   // Optional: Log error information
//   componentDidCatch(error, errorInfo) {
//     console.error('ErrorBoundary caught:', error, errorInfo);
//     this.setState({ errorInfo });
//   }

//   // Reset error state
//   resetError = () => {
//     this.setState({ 
//       hasError: false,
//       error: null,
//       errorInfo: null 
//     });
//   };

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
//           <h2 className="text-xl font-bold text-red-600 mb-2">
//             Something went wrong
//           </h2>
//           <p className="mb-4">{this.state.error?.toString()}</p>
          
//           {/* Show reload button for better UX */}
//           <button
//             onClick={this.resetError}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Try Again
//           </button>
          
//           {/* Optional: Show detailed error in development */}
//           {import.meta.env.DEV && (
//             <details className="mt-4 text-sm">
//               <summary>Error details</summary>
//               <pre className="bg-gray-100 p-2 mt-2 overflow-auto">
//                 {this.state.errorInfo?.componentStack}
//               </pre>
//             </details>
//           )}
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ErrorBoundary;

// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends Component {
  state = { 
    hasError: false,
    error: null,
    errorInfo: null,
    isReloading: false
  };

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
    this.logErrorToService(error, errorInfo);
    
    // Log to error tracking service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

   // ▼ Add this method right here ▼
   logErrorToService = (error, errorInfo) => {
    // Example: Send to Sentry/LogRocket/etc
    if (window.Sentry) {
      window.Sentry.captureException(error, { 
        context: {
          react: {
            componentStack:errorInfo.componentStack
          }
        }
      });
    }
    // Add other error services as needed
    if (window.LogRocket && window.LogRocket.trackError) {
      window.LogRocket.trackError(error, {
        componentStack: errorInfo.componentStack
      });
    }
  };

    // // 3. Custom backend logging (example)
    // if (process.env.NODE_ENV === 'production') {
    //   fetch('/api/log-error', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       error: error.toString(),
    //       stack: error.stack,
    //       componentStack: errorInfo.componentStack,
    //       url: window.location.href
    //     })
    //   }).catch(e => console.error('Failed to log error:', e));
    // }
    // };

  handleReload = () => {
    this.setState({ isReloading: true });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We've encountered an unexpected error. Please try refreshing the page.
            </p>
            
            <button
              onClick={this.handleReload}
              disabled={this.state.isReloading}
              className={`flex items-center px-4 py-2 rounded-md ${
                this.state.isReloading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-red-100 hover:bg-red-200'
              }`}
            >
              {this.state.isReloading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Reloading...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </>
              )}
            </button>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 w-full text-left">
                <summary className="text-sm text-red-500 cursor-pointer">
                  Error Details
                </summary>
                <div className="mt-2 p-2 bg-white rounded border border-gray-200 text-xs overflow-auto">
                  <p className="font-mono text-red-600">{this.state.error?.toString()}</p>
                  <pre className="mt-2 text-gray-600 whitespace-pre-wrap">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;