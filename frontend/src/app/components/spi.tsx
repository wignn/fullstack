const LoadingSpinner = () => (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #000;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
  
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
  export default LoadingSpinner