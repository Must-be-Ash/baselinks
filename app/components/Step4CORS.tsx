import StepHeader from './StepHeader';

export default function Step4CORS() {
  return (
    <div className="step-container">
      <StepHeader stepNumber={4} title="Configure CORS Settings" />
      
      <div className="info-box">
        <div className="flex items-start gap-4 mb-6">
          <div className="text-4xl">🌐</div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Add Your Site URL to CDP CORS
            </h3>
            <p style={{color: '#888888'}} className="mb-4">
              For your crypto donation functionality to work, you need to add your site's URL to the 
              CORS (Cross-Origin Resource Sharing) settings in the Coinbase Developer Platform.
            </p>
          </div>
        </div>

        
        <a
          href="https://portal.cdp.coinbase.com/products/embedded-wallets/cors"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center primary-button inline-block"
        >
          Configure CORS Settings
        </a>
      </div>
    </div>
  );
} 