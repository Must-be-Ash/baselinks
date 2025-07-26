import StepHeader from './StepHeader';
import CopyButton from './CopyButton';
import { Github } from 'lucide-react';

export default function Step1Clone() {
  const cloneCommand = 'git clone https://github.com/Must-be-Ash/linktree-donate';

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">1</div>
        <div className="flex items-center gap-2">
          <h2 className="step-title">Clone the Repository</h2>
          <a
            href="https://github.com/Must-be-Ash/linktree-donate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors bg-gray-600 hover:bg-gray-500 rounded-full p-1.5 flex items-center justify-center"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
      
      <div className="info-box">
        <p style={{color: '#888888'}} className="mb-4">
          Start by cloning the linktree-donate repository to get the base template for your crypto donation page.
        </p>
        
        <div className="rounded-lg p-4 font-mono text-sm flex items-center justify-between" style={{backgroundColor: '#2a2a2a'}}>
          <code className="text-white">{cloneCommand}</code>
          <CopyButton text={cloneCommand}>
            📋 Copy
          </CopyButton>
        </div>
      </div>
    </div>
  );
} 