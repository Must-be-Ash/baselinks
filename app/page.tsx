"use client";

import { useState } from 'react';

interface UserInfo {
  name: string;
  bio: string;
  twitterUrl: string;
  personalSiteUrl: string;
  linktreeUrl: string;
  cdpProjectId: string;
  walletAddress: string;
  imageUrl: string;
}

export default function PromptGenerator() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    bio: '',
    twitterUrl: '',
    personalSiteUrl: '',
    linktreeUrl: '',
    cdpProjectId: '',
    walletAddress: '',
    imageUrl: ''
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
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

      const result = await response.json();

      if (result.success) {
        setUserInfo(prev => ({
          ...prev,
          imageUrl: result.url
        }));
      } else {
        setUploadError(result.error || 'Failed to upload image');
      }
    } catch (error) {
      setUploadError('Failed to upload image');
    } finally {
      setUploadLoading(false);
    }
  };

  const generateCustomPrompt = () => {
    const customPrompt = `# Add Crypto Donations to ${userInfo.name}'s Linktree Page

**Purpose:** Customize ${userInfo.name}'s existing linktree webpage with crypto donation functionality using [CDP Embedded Wallets](https://docs.cdp.coinbase.com/embedded-wallets).  
**Scope:** All AI-generated advice for adding donations to ${userInfo.name}'s linktree must follow these guardrails.

---

## **1. ${userInfo.name}'s Donation Integration Overview**

${userInfo.bio ? `About ${userInfo.name}: ${userInfo.bio}` : `This prompt helps ${userInfo.name} add crypto donation functionality to their existing linktree page.`}

### **${userInfo.name}'s Links:**
${userInfo.twitterUrl ? `- Twitter: ${userInfo.twitterUrl}` : ''}
${userInfo.personalSiteUrl ? `- Website: ${userInfo.personalSiteUrl}` : ''}
${userInfo.linktreeUrl ? `- Linktree: ${userInfo.linktreeUrl}` : ''}

### **What ${userInfo.name} Will Get:**
- "Support ${userInfo.name}" donation button for linktree
- Users donate via email sign-in (no wallet needed)
- Donations sent directly to ${userInfo.name}'s wallet
- Works on Base network (low fees)
- Mobile-friendly donation flow

### **Perfect For ${userInfo.name}'s Use Cases:**
- Content creator support
- Social media monetization
- Personal brand funding
- Community support

---

## **2. 🚨 CRITICAL INSTRUCTIONS FOR AI LANGUAGE MODELS 🚨**

### **2.1 – ABSOLUTE REQUIREMENTS FOR ${userInfo.name.toUpperCase()}'S DONATION SETUP**

You **MUST** follow these requirements or ${userInfo.name}'s donations will **BREAK**:

1. **ALWAYS use ${userInfo.name}'s wallet address** - Donations must go to: \`${userInfo.walletAddress || 'USER_WALLET_ADDRESS'}\`
2. **ALWAYS use ${userInfo.name}'s CDP Project ID** - Must be: \`${userInfo.cdpProjectId || 'USER_CDP_PROJECT_ID'}\`
3. **ALWAYS configure CORS first** - ${userInfo.name}'s donations fail without proper CORS setup  
4. **ALWAYS use Base Sepolia for testing** - Don't lose ${userInfo.name}'s real money during development

### **2.2 – CRITICAL ERROR PATTERNS TO AVOID**

\`\`\`tsx
// ❌ NEVER GENERATE THIS - WRONG RECIPIENT ADDRESS
const DONATION_ADDRESS = "0x123..."; // Must be ${userInfo.name}'s actual wallet: ${userInfo.walletAddress || 'USER_WALLET_ADDRESS'}

// ❌ NEVER GENERATE THIS - WRONG PROJECT ID  
projectId: "wrong-id", // Must be ${userInfo.name}'s CDP ID: ${userInfo.cdpProjectId || 'USER_CDP_PROJECT_ID'}

// ❌ NEVER GENERATE THIS - WRONG NETWORK FOR DONATIONS
chainId: 1, // Expensive Ethereum - use Base (8453) for ${userInfo.name}'s donations

// ❌ NEVER GENERATE THIS - MISSING CLIENT DIRECTIVE
import { CDPReactProvider } from "@coinbase/cdp-react"; // Missing "use client"
\`\`\`

### **2.3 – CORRECT PATTERNS YOU MUST ALWAYS GENERATE**

\`\`\`tsx
// ✅ ALWAYS GENERATE THIS EXACT PATTERN FOR ${userInfo.name.toUpperCase()}

// ${userInfo.name}'s wallet address (where donations go)
const DONATION_ADDRESS = "${userInfo.walletAddress || 'REPLACE_WITH_YOUR_WALLET_ADDRESS'}";

// ${userInfo.name}'s CDP Project ID
const cdpConfig = {
  projectId: "${userInfo.cdpProjectId || 'REPLACE_WITH_YOUR_CDP_PROJECT_ID'}",
  basePath: "https://api.cdp.coinbase.com/platform",
  useMock: false,
  debugging: false,
};

// Base network for low fees
chainId: 8453, // Base mainnet

// Client directive for components
"use client";
import { CDPReactProvider } from "@coinbase/cdp-react";
\`\`\`

---

## **3. ${userInfo.name.toUpperCase()}'S LINKTREE DONATION IMPLEMENTATION**

### **3.1 – ${userInfo.name}'s Donation Button Component**

\`\`\`tsx
// components/SupportButton.tsx
"use client";

import { useState } from 'react';
import { CDPReactProvider } from '@coinbase/cdp-react';
import { 
  useSendEvmTransaction, 
  useEvmAddress, 
  useIsSignedIn, 
  useIsInitialized 
} from '@coinbase/cdp-hooks';
import { AuthButton } from '@coinbase/cdp-react';
import { Heart, Loader2 } from 'lucide-react';

// 🎯 ${userInfo.name}'s wallet address (where donations go)
const DONATION_ADDRESS = "${userInfo.walletAddress || 'REPLACE_WITH_YOUR_WALLET_ADDRESS'}";

// 🔑 ${userInfo.name}'s CDP configuration
const cdpConfig = {
  projectId: "${userInfo.cdpProjectId || 'REPLACE_WITH_YOUR_CDP_PROJECT_ID'}",
  basePath: "https://api.cdp.coinbase.com/platform",
  useMock: false,
  debugging: false,
};

const appConfig = {
  name: "Support ${userInfo.name}",
  logoUrl: "${userInfo.imageUrl || (userInfo.personalSiteUrl ? userInfo.personalSiteUrl + '/logo.png' : 'https://your-site.com/logo.png')}",
};

function DonationForm() {
  const [amount, setAmount] = useState('0.005');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendTransaction = useSendEvmTransaction();
  const evmAddress = useEvmAddress();
  const isSignedIn = useIsSignedIn();
  const isInitialized = useIsInitialized();

  const handleDonate = async () => {
    if (!evmAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const valueInWei = BigInt(Math.floor(parseFloat(amount) * 1e18));

      const result = await sendTransaction({
        evmAccount: evmAddress,
        transaction: {
          to: DONATION_ADDRESS,
          value: valueInWei,
          chainId: 8453, // Base mainnet (low fees)
          type: "eip1559",
        },
        network: "base",
      });

      setTxHash(result.transactionHash);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Donation failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="donation-loading">
        <Loader2 className="loading-spinner" />
        <p>Loading donation system...</p>
      </div>
    );
  }

  if (txHash) {
    return (
      <div className="donation-success">
        <div className="success-icon">
          <Heart className="success-heart" />
        </div>
        <h3>Thank You for Supporting ${userInfo.name}!</h3>
        <p>Your donation of \{amount\} ETH was sent successfully!</p>
        \{message && <p className="donation-message">"\{message\}"</p>\}
        <a 
          href={\`https://basescan.org/tx/\${txHash}\`}
          target="_blank"
          rel="noopener noreferrer"
          className="transaction-link"
        >
          View Transaction
        </a>
        <button 
          onClick={() => {
            setTxHash(null);
            setAmount('0.005');
            setMessage('');
          }}
          className="donate-again-btn"
        >
          Support ${userInfo.name} Again
        </button>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="donation-signin">
        <div className="support-header">
          <h3>
            <Heart className="support-icon" />
            Support Me
          </h3>
        </div>
        <AuthButton />
        <p className="powered-by">Powered by Coinbase • No wallet needed</p>
      </div>
    );
  }

  return (
    <div className="donation-form">
      <div className="support-header">
        <h3>
          <Heart className="support-icon" />
          Support ${userInfo.name}
        </h3>
        \{userInfo.bio && <p className="creator-bio">${userInfo.bio}</p>\}
      </div>
      
      \{error && (
        <div className="error-message">
          \{error\}
        </div>
      )\}

      <div className="amount-selection">
        <label>Choose donation amount:</label>
        <select 
          value=\{amount\}
          onChange=\{(e) => setAmount(e.target.value)\}
          className="amount-select"
        >
          <option value="0.002">0.002 ETH (~$5)</option>
          <option value="0.005">0.005 ETH (~$12)</option>
          <option value="0.01">0.01 ETH (~$25)</option>
          <option value="0.02">0.02 ETH (~$50)</option>
          <option value="0.05">0.05 ETH (~$125)</option>
        </select>
      </div>

      <div className="message-input">
        <label>Optional message for ${userInfo.name}:</label>
        <input
          type="text"
          value=\{message\}
          onChange=\{(e) => setMessage(e.target.value)\}
          placeholder="Keep up the great work!"
          className="message-field"
          maxLength=\{100\}
        />
      </div>

      <button
        onClick=\{handleDonate\}
        disabled=\{isLoading\}
        className="donate-button"
      >
        \{isLoading ? (
          <>
            <Loader2 className="loading-icon" />
            Sending...
          </>
        ) : (
          \`Support ${userInfo.name} with \$\{amount\} ETH\`
        )\}
      </button>

      <div className="donation-info">
        <p>Sent on Base network • Low fees</p>
        <p>Your wallet: \{evmAddress?.slice(0, 6)\}...\{evmAddress?.slice(-4)\}</p>
      </div>
    </div>
  );
}

export default function SupportButton() {
  return (
    <CDPReactProvider config={cdpConfig} app={appConfig}>
      <DonationForm />
    </CDPReactProvider>
  );
}
\`\`\`

### **3.2 – ${userInfo.name}'s Linktree Integration**

\`\`\`tsx
// pages/index.tsx or app/page.tsx
import SupportButton from '@/components/SupportButton';
import { Twitter, Globe, TreePine } from 'lucide-react';

export default function ${userInfo.name.replace(/\s+/g, '')}Linktree() {
  return (
    <div className="linktree-container">
      <div className="profile-section">
        <div className="profile-image">
          <img src="${userInfo.imageUrl || '/profile.jpg'}" alt="${userInfo.name}" />
        </div>
        <div className="profile-info">
          <h1>${userInfo.name}</h1>
          \{userInfo.bio && <p className="bio">${userInfo.bio}</p>\}
        </div>
      </div>

      <div className="links-section">
        \{userInfo.twitterUrl && 
        <a href="${userInfo.twitterUrl}" className="link-button" target="_blank" rel="noopener noreferrer">
          <Twitter className="link-icon" />
          <span className="link-text">Follow on Twitter</span>
        </a>
        \}
        
        \{userInfo.personalSiteUrl && 
        <a href="${userInfo.personalSiteUrl}" className="link-button" target="_blank" rel="noopener noreferrer">
          <Globe className="link-icon" />
          <span className="link-text">Visit Website</span>
        </a>
        \}
        
        \{userInfo.linktreeUrl && 
        <a href="${userInfo.linktreeUrl}" className="link-button" target="_blank" rel="noopener noreferrer">
          <TreePine className="link-icon" />
          <span className="link-text">Linktree</span>
        </a>
        \}
        
        {/* Add your other links here */}
      </div>

      {/* ${userInfo.name}'s Crypto Donation Section */}
      <div className="donation-section">
        <SupportButton />
      </div>

      <footer className="linktree-footer">
        <p>© ${new Date().getFullYear()} ${userInfo.name}</p>
      </footer>
    </div>
  );
}
\`\`\`

### **3.3 – ${userInfo.name}'s Elegant Linktree Styling**

\`\`\`css
/* styles/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #000000;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.linktree-container {
  max-width: 680px;
  width: 100%;
  padding: 40px 20px;
  text-align: center;
}

/* Profile Section */
.profile-section {
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  margin-bottom: 24px;
}

.profile-image img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0052FF;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-info h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #fff;
}

.bio {
  color: #a3a3a3;
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  max-width: 480px;
}

/* Links Section */
.links-section {
  margin-bottom: 48px;
}

.link-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  margin: 12px 0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  position: relative;
}

.link-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.link-icon {
  margin-right: 12px;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.link-text {
  text-align: center;
  flex: 1;
}

/* Donation Section */
.donation-section {
  margin-top: 32px;
}

.donation-signin,
.donation-form {
  background: transparent;
  padding: 24px;
  text-align: center;
}

.support-header {
  margin-bottom: 16px;
}

.support-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.support-icon {
  width: 24px;
  height: 24px;
  color: #ff6b6b;
}

.creator-bio {
  color: #a3a3a3;
  font-size: 14px;
  margin-bottom: 16px;
}

.donation-signin p {
  color: #a3a3a3;
  font-size: 16px;
  margin-bottom: 24px;
}

/* Sign In Button */
.donation-signin button,
.donate-button,
.donate-again-btn {
  background: #0052FF;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.donation-signin button:hover,
.donate-button:hover:not(:disabled),
.donate-again-btn:hover {
  background: #0041CC;
  transform: translateY(-1px);
}

.donate-button:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
}

.loading-icon {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

/* Form Elements */
.amount-selection,
.message-input {
  margin: 20px 0;
  text-align: left;
}

.amount-selection label,
.message-input label {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.amount-select,
.message-field {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
}

.amount-select:focus,
.message-field:focus {
  outline: none;
  border-color: #0052FF;
  background: rgba(255, 255, 255, 0.15);
}

/* Success State */
.donation-success {
  background: transparent;
  padding: 32px 24px;
  text-align: center;
}

.success-icon {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.success-heart {
  width: 48px;
  height: 48px;
  color: #ff6b6b;
}

.donation-success h3 {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.donation-success p {
  color: #a3a3a3;
  margin-bottom: 16px;
}

.donation-message {
  color: #fff;
  font-style: italic;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
}

.transaction-link {
  color: #0052FF;
  text-decoration: none;
  font-weight: 600;
}

.transaction-link:hover {
  text-decoration: underline;
}

/* Social Links */
.social-links {
  margin: 16px 0;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.social-link {
  color: #0052FF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.social-link:hover {
  text-decoration: underline;
}

/* Info Text */
.powered-by,
.donation-info {
  color: #a3a3a3;
  font-size: 12px;
  margin-top: 16px;
}

.donation-info p {
  margin: 4px 0;
}

/* Error State */
.error-message {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

/* Loading State */
.donation-loading {
  padding: 40px;
  text-align: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
  color: #0052FF;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Footer */
.linktree-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.linktree-footer p {
  color: #a3a3a3;
  font-size: 12px;
}

/* Responsive */
@media (max-width: 480px) {
  .linktree-container {
    padding: 32px 16px;
  }
  
  .profile-image img {
    width: 80px;
    height: 80px;
  }
  
  .profile-info h1 {
    font-size: 20px;
  }
  
  .link-button {
    padding: 14px 16px;
  }
}
\`\`\`

---

## **4. ${userInfo.name.toUpperCase()}'S SETUP CHECKLIST**

### **4.1 – Before ${userInfo.name} Starts**

- [ ] ✅ CDP Project ID: \`${userInfo.cdpProjectId || 'GET_FROM_CDP_PORTAL'}\`
- [ ] ${userInfo.walletAddress ? '✅' : '❌'} Wallet Address: \`${userInfo.walletAddress || 'GET_YOUR_WALLET_ADDRESS'}\`
- [ ] Add ${userInfo.personalSiteUrl || 'your-domain.com'} to CORS settings at https://portal.cdp.coinbase.com/products/embedded-wallets/cors

### **4.2 – ${userInfo.name}'s Development Setup**

- [ ] Install packages: \`npm install @coinbase/cdp-react @coinbase/cdp-core @coinbase/cdp-hooks lucide-react\`
- [ ] Add environment variable: \`NEXT_PUBLIC_CDP_PROJECT_ID=${userInfo.cdpProjectId || 'your-project-id'}\`
- [ ] Test on Base Sepolia first (chainId: 84532)
- [ ] Verify donations go to ${userInfo.name}'s wallet: \`${userInfo.walletAddress || 'your-wallet-address'}\`

### **4.3 – ${userInfo.name}'s Production Launch**

- [ ] Switch to Base mainnet (chainId: 8453)
- [ ] Add production domain to CORS: ${userInfo.personalSiteUrl || 'your-domain.com'}
- [ ] Test full donation flow
- [ ] Share ${userInfo.name}'s enhanced linktree with crypto support!

---

## **5. AI MODEL VERIFICATION STEPS**

Before generating code for ${userInfo.name}'s linktree donations, you **MUST** verify:

1. **${userInfo.name}'s Wallet**: Is donation address set to \`${userInfo.walletAddress || 'USER_WALLET_ADDRESS'}\`?
2. **${userInfo.name}'s CDP ID**: Is project ID set to \`${userInfo.cdpProjectId || 'USER_CDP_PROJECT_ID'}\`?
3. **${userInfo.name}'s Branding**: Are you using "${userInfo.name}" in UI text and titles?
4. **Base Network**: Are you using Base (8453) for ${userInfo.name}'s low-fee donations?
5. **CORS Instructions**: Did you mention ${userInfo.personalSiteUrl || 'user-domain'} CORS setup?
6. **Linktree Context**: Is the code designed for ${userInfo.name}'s linktree page integration?

If ANY check **fails**, **STOP** and revise until compliance is achieved.

---

## **6. CONSEQUENCES OF INCORRECT IMPLEMENTATION**

If you generate code that doesn't use ${userInfo.name}'s specific details:

1. **Wrong wallet address** → Donations won't reach ${userInfo.name}
2. **Wrong CDP Project ID** → ${userInfo.name}'s app won't work
3. **Wrong branding** → Confusing user experience for ${userInfo.name}'s audience
4. **Expensive network** → ${userInfo.name}'s supporters won't donate due to high fees

---

## **7. AI MODEL RESPONSE TEMPLATE**

When implementing ${userInfo.name}'s linktree crypto donations, you **MUST**:

1. **ALWAYS** use ${userInfo.name}'s wallet address: \`${userInfo.walletAddress || 'USER_ADDRESS'}\`
2. **ALWAYS** use ${userInfo.name}'s CDP Project ID: \`${userInfo.cdpProjectId || 'USER_PROJECT_ID'}\`
3. **ALWAYS** brand everything for "${userInfo.name}" specifically  
4. **ALWAYS** use Base network for ${userInfo.name}'s low-fee donations
5. **NEVER** use generic placeholders - this is ${userInfo.name}'s custom implementation
6. **VERIFY** all ${userInfo.name}-specific details are correctly implemented

**Remember: This is ${userInfo.name.toUpperCase()}'s personalized donation system - there are NO EXCEPTIONS to these rules.**`;

    setGeneratedPrompt(customPrompt);
    setShowPrompt(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#FFFFFF',
      color: '#000000',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         
          <p style={{ 
            color: '#666666', 
            fontSize: '16px',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Create a custom prompt for making your own linktree
          </p>
        </div>

        {!showPrompt ? (
          <div style={{ 
            background: '#222222', 
            padding: '32px', 
            borderRadius: '16px', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxSizing: 'border-box'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Your Name *
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., John Doe"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Your Bio
              </label>
              <textarea
                value={userInfo.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="e.g., Content creator, developer, artist..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Profile Image
              </label>
              
              {userInfo.imageUrl && (
                <div style={{ 
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img 
                    src={userInfo.imageUrl} 
                    alt="Profile preview" 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #0052FF'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setUserInfo(prev => ({ ...prev, imageUrl: '' }))}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(255, 0, 0, 0.2)',
                      color: '#ff6b6b',
                      border: '1px solid rgba(255, 0, 0, 0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadLoading}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box',
                  cursor: uploadLoading ? 'not-allowed' : 'pointer'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
              
              {uploadLoading && (
                <small style={{ 
                  color: '#0052FF', 
                  fontSize: '12px',
                  display: 'block',
                  marginTop: '4px'
                }}>
                  Uploading image...
                </small>
              )}
              
              {uploadError && (
                <small style={{ 
                  color: '#ff6b6b', 
                  fontSize: '12px',
                  display: 'block',
                  marginTop: '4px'
                }}>
                  {uploadError}
                </small>
              )}
              
              {!uploadLoading && !uploadError && (
                <small style={{ 
                  color: '#a3a3a3', 
                  fontSize: '12px',
                  display: 'block',
                  marginTop: '4px'
                }}>
                  Upload your profile picture (max 5MB)
                </small>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Twitter URL
              </label>
              <input
                type="url"
                value={userInfo.twitterUrl}
                onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                placeholder="https://twitter.com/yourusername"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Personal Website URL
              </label>
              <input
                type="url"
                value={userInfo.personalSiteUrl}
                onChange={(e) => handleInputChange('personalSiteUrl', e.target.value)}
                placeholder="https://yourwebsite.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Linktree URL
              </label>
              <input
                type="url"
                value={userInfo.linktreeUrl}
                onChange={(e) => handleInputChange('linktreeUrl', e.target.value)}
                placeholder="https://linktr.ee/yourusername"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />

            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                CDP Project ID *
              </label>
              <input
                type="text"
                value={userInfo.cdpProjectId}
                onChange={(e) => handleInputChange('cdpProjectId', e.target.value)}
                placeholder="Get from https://portal.cdp.coinbase.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                required
              />
              <small style={{ 
                color: '#a3a3a3', 
                fontSize: '12px',
                display: 'block',
                marginTop: '4px'
              }}>
                Get this from your CDP Portal project settings
              </small>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#FFFFFF',
                fontSize: '14px'
              }}>
                Your Wallet Address *
              </label>
              <input
                type="text"
                value={userInfo.walletAddress}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                placeholder="0x1234567890123456789012345678901234567890"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#0052FF'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                required
              />
              <small style={{ 
                color: '#a3a3a3', 
                fontSize: '12px',
                display: 'block',
                marginTop: '4px'
              }}>
                Where you want to receive donations (your Ethereum/Base wallet address)
              </small>
            </div>

            <button
              type="button"
              onClick={generateCustomPrompt}
              disabled={!userInfo.name || !userInfo.cdpProjectId || !userInfo.walletAddress}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: userInfo.name && userInfo.cdpProjectId && userInfo.walletAddress ? '#0052FF' : '#444444',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: userInfo.name && userInfo.cdpProjectId && userInfo.walletAddress ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                opacity: userInfo.name && userInfo.cdpProjectId && userInfo.walletAddress ? 1 : 0.6,
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                if (userInfo.name && userInfo.cdpProjectId && userInfo.walletAddress) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#0041CC';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (userInfo.name && userInfo.cdpProjectId && userInfo.walletAddress) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#0052FF';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                }
              }}
            >
              Create Prompt
            </button>
          </div>
        ) : (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '24px',
              padding: '20px',
              background: 'rgba(0, 82, 255, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(0, 82, 255, 0.3)'
            }}>
              <div>
                <h2 style={{ 
                  color: '#0052FF', 
                  margin: '0 0 5px 0',
                  fontSize: '20px',
                  fontWeight: '700'
                }}>
                  ✅ Your Custom Prompt is Ready!
                </h2>
                <p style={{ 
                  color: '#a3a3a3', 
                  margin: 0,
                  fontSize: '14px'
                }}>
                  Personalized for {userInfo.name}'s linktree donations
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={copyToClipboard}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#0041CC';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#0052FF';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  📋 Copy Prompt
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#444444',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#555555';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#444444';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  ← Back to Form
                </button>
              </div>
            </div>

            <div style={{
              background: '#222222',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '13px',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                color: '#FFFFFF'
              }}>
                {generatedPrompt}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}