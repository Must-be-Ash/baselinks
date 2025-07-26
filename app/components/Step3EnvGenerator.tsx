'use client';

import { useState } from 'react';
import StepHeader from './StepHeader';
import CopyButton from './CopyButton';
import confetti from 'canvas-confetti';

interface UserInfo {
  name: string;
  bio: string;
  twitterUrl: string;
  personalSiteUrl: string;
  linkedinUrl: string;
  cdpProjectId: string;
  cdpApiKeyName: string;
  cdpPrivateKey: string;
  walletAddress: string;
  imageUrl: string;
  siteUrl: string;
}

export default function Step3EnvGenerator() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    bio: '',
    twitterUrl: '',
    personalSiteUrl: '',
    linkedinUrl: '',
    cdpProjectId: '',
    cdpApiKeyName: '',
    cdpPrivateKey: '',
    walletAddress: '',
    imageUrl: '',
    siteUrl: ''
  });

  const [generatedEnv, setGeneratedEnv] = useState('');
  const [showEnv, setShowEnv] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUserInfo(prev => ({
        ...prev,
        imageUrl: data.url
      }));
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const generateEnvFile = () => {
    const envContent = `# CDP Configuration
CDP_PROJECT_ID=${userInfo.cdpProjectId}
CDP_API_KEY_NAME=${userInfo.cdpApiKeyName}
CDP_PRIVATE_KEY=${userInfo.cdpPrivateKey}

# Personal Information
NAME=${userInfo.name}
BIO=${userInfo.bio}
SITE_URL=${userInfo.siteUrl}
IMAGE_URL=${userInfo.imageUrl}

# Social Links
TWITTER_URL=${userInfo.twitterUrl}
PERSONAL_SITE_URL=${userInfo.personalSiteUrl}
LINKEDIN_URL=${userInfo.linkedinUrl}

# Wallet Information
WALLET_ADDRESS=${userInfo.walletAddress}`;

    setGeneratedEnv(envContent);
    setShowEnv(true);
  };

  const downloadEnvFile = () => {
    const blob = new Blob([generatedEnv], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.env';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#0052FF', '#ffffff'],
      shapes: ['square'],
      gravity: 0.8,
      ticks: 150,
    });
  };

  const handleCopyWithConfetti = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      
      // Trigger confetti
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#0052FF', '#ffffff'],
        shapes: ['square'],
        gravity: 0.8,
        ticks: 150,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="step-container">
      <StepHeader stepNumber={3} title="Generate Your .env File" />
      
      <div className="info-box">
        <div className="grid gap-8">
          {/* CDP Configuration */}
          <div className="form-section">
            <h3 className="form-section-title">CDP Configuration</h3>
            <div className="space-y-3">
              <div className="form-row">
                <label className="form-label">CDP Project ID *</label>
                <div className="form-input">
                  <input
                    type="text"
                    value={userInfo.cdpProjectId}
                    onChange={(e) => handleInputChange('cdpProjectId', e.target.value)}
                    className="input-field"
                    placeholder="Enter your CDP Project ID"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">CDP API Key Name *</label>
                <div className="form-input">
                  <input
                    type="text"
                    value={userInfo.cdpApiKeyName}
                    onChange={(e) => handleInputChange('cdpApiKeyName', e.target.value)}
                    className="input-field"
                    placeholder="Enter your CDP API Key Name"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">CDP Private Key *</label>
                <div className="form-input">
                  <textarea
                    value={userInfo.cdpPrivateKey}
                    onChange={(e) => handleInputChange('cdpPrivateKey', e.target.value)}
                    className="textarea-field h-16"
                    placeholder="Enter your CDP Private Key"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3 className="form-section-title">Personal Information</h3>
            <div className="space-y-3">
              <div className="form-row">
                <label className="form-label">Full Name *</label>
                <div className="form-input">
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Bio/Title *</label>
                <div className="form-input">
                  <input
                    type="text"
                    value={userInfo.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="input-field"
                    placeholder="e.g., Developer, Creator, Entrepreneur"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Site URL *</label>
                <div className="form-input">
                  <input
                    type="url"
                    value={userInfo.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    className="input-field"
                    placeholder="https://your-site.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Profile Image</label>
                <div className="form-input">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="profile-image-upload"
                    />
                    <label 
                      htmlFor="profile-image-upload"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
                      style={{backgroundColor: '#2a2a2a'}}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      </div>
                    </label>
                  </div>
                  {uploadLoading && (
                    <div className="mt-2 flex items-center text-sm">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                      <span style={{color: '#888888'}}>Uploading...</span>
                    </div>
                  )}
                  {uploadError && (
                    <div className="mt-2 flex items-center text-sm">
                      <svg className="w-4 h-4 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-red-400">{uploadError}</span>
                    </div>
                  )}
                  {userInfo.imageUrl && (
                    <div className="mt-2 flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-green-400">✓ Image uploaded successfully</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="form-section">
            <h3 className="form-section-title">Social Links</h3>
            <div className="space-y-3">
              <div className="form-row">
                <label className="form-label">Twitter/X URL</label>
                <div className="form-input">
                  <input
                    type="url"
                    value={userInfo.twitterUrl}
                    onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                    className="input-field"
                    placeholder="https://x.com/yourusername"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Personal Website</label>
                <div className="form-input">
                  <input
                    type="url"
                    value={userInfo.personalSiteUrl}
                    onChange={(e) => handleInputChange('personalSiteUrl', e.target.value)}
                    className="input-field"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">LinkedIn URL</label>
                <div className="form-input">
                  <input
                    type="url"
                    value={userInfo.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    className="input-field"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Information */}
          <div className="form-section">
            <h3 className="form-section-title">Wallet Information</h3>
            <div className="form-row">
              <label className="form-label">Donation Wallet Address *</label>
              <div className="form-input">
                <input
                  type="text"
                  value={userInfo.walletAddress}
                  onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                  className="input-field font-mono"
                  placeholder="0x..."
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateEnvFile}
            className="primary-button"
          >
            Generate .env File
          </button>

          {/* Generated .env File */}
          {showEnv && (
            <div className="info-box">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Generated .env File</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleCopyWithConfetti(generatedEnv)}
                    className="copy-button"
                  >
                    📋 Copy
                  </button>
                  <button onClick={downloadEnvFile} className="secondary-button">
                    📥 Download
                  </button>
                </div>
              </div>
              <div className="rounded-lg p-4 overflow-auto" style={{backgroundColor: '#2a2a2a'}}>
                <pre className="text-sm text-white font-mono whitespace-pre-wrap">
                  {generatedEnv}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 