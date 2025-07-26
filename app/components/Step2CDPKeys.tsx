import StepHeader from './StepHeader';

export default function Step2CDPKeys() {
  return (
    <div className="step-container">
      <StepHeader stepNumber={2} title="Get Your CDP API Keys" />
      
      <div className="info-box">
        <div className="flex items-start gap-4 mb-6">
          <div className="text-4xl">🔑</div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Coinbase Developer Platform
            </h3>
            <p style={{color: '#888888'}} className="mb-4">
              You'll need to create a project and generate API keys from the Coinbase Developer Platform. 
              This is required for the crypto donation functionality to work.
            </p>
          </div>
        </div>
        
        <a
          href="https://portal.cdp.coinbase.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center primary-button inline-block"
        >
          Get your API keys
        </a>
      </div>
    </div>
  );
} 