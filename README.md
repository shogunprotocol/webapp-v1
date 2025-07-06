# Shōgun DeFi: AI-Powered Yield Optimization

Welcome to **Shōgun DeFi**, a next-generation, AI-powered DeFi platform for Flow and Filecoin. Shōgun delivers cross-protocol yield optimization, onchain transparency, and a radically user-friendly experience. Built for the ETHGlobal hackathon.

---

## 🚀 What is Shōgun?

Shōgun is a full-stack, multi-chain DeFi system that combines:
- **[shogun-ai-core](https://github.com/yourusername/shogun-ai-core)**: The AI agent backend for strategy planning, risk assessment, and execution.
- **[shogun-contracts](https://github.com/yourusername/shogun-contracts)**: Smart contracts for vaults, strategies, logging, and protocol integration.
- **[shogun-webapp](https://github.com/yourusername/shogun-webapp)** (this repo): The modern, responsive dashboard for users and institutions.

**At Shōgun, we believe DeFi should be transparent, auditable, and accessible to everyone.**

---

## 🏆 What We Built for the Hackathon

- **AI-powered DeFi agent** that plans, scores, and executes yield strategies across Flow and Filecoin.
- **Multi-chain vaults** with onchain-logged actions and risk data.
- **Full transparency:** Every AI action is logged and visible in the app.
- **User-friendly dashboard** for deposits, withdrawals, and real-time monitoring.
- **"Thoughts" page:** A vertical timeline of all AI agent actions, with risk, reason, and onchain links.

---

## 🌐 Live Networks & Contract Addresses

### Filecoin Calibration Testnet
| Contract           | Address                                    | Explorer |
|--------------------|--------------------------------------------|----------|
| AI Vault           | 0xAF28B48E48317109F885FEc05751f5422d850857 | [Beryx](https://beryx.zondax.ch/address/0xAF28B48E48317109F885FEc05751f5422d850857)    |
| Strategy           | 0xF3B66dEF94Ab0C8D485e36845f068aFB48959A04 | [Beryx](https://beryx.zondax.ch/address/0xF3B66dEF94Ab0C8D485e36845f068aFB48959A04)    |
| Mock Protocol      | 0x8fDE7A649c782c96e7f4D9D88490a7C5031F51a9 | [Beryx](https://beryx.zondax.ch/address/0x8fDE7A649c782c96e7f4D9D88490a7C5031F51a9)    |
| USDFC Token        | 0xb3042734b608a1B16e9e86B374A3f3e389B4cDf0 | [Beryx](https://beryx.zondax.ch/address/0xb3042734b608a1B16e9e86B374A3f3e389B4cDf0)    |
| Movement Logger    | 0x9f03F83F092D025635AeA1800E6AB3c9f0882673 | [Beryx](https://beryx.zondax.ch/address/0x9f03F83F092D025635AeA1800E6AB3c9f0882673)    |
| Decision Registry  | 0xDcc2986e610B51ECA891Bd2470F7CcD02F9C4e1B | [Beryx](https://beryx.zondax.ch/address/0xDcc2986e610B51ECA891Bd2470F7CcD02F9C4e1B)    |

- **Chain ID:** 314159 (0x4cb2f)
- **RPC:** https://rpc.ankr.com/filecoin_testnet
- **Currency:** tFIL

### Flow Testnet
| Contract      | Address                                    | Explorer |
|--------------|---------------------------------------------|----------|
| AI Vault     | 0x7C65F77a4EbEa3D56368A73A12234bB4384ACB28  | [Flowscan](https://testnet.flowscan.org/account/0x7C65F77a4EbEa3D56368A73A12234bB4384ACB28)  |
| Mock USDC    | 0xAF28B48E48317109F885FEc05751f5422d850857  | [Flowscan](https://testnet.flowscan.org/account/0xAF28B48E48317109F885FEc05751f5422d850857)  |

- **Chain ID:** 545 (0x221)
- **RPC:** https://testnet.evm.nodes.onflow.org
- **Currency:** FLOW

---

## 🖥️ Webapp Pages & Features

### Home
- Welcome, overview, and onboarding.

### Vaults
- Deposit/withdraw into AI-managed vaults on Flow and Filecoin.
- Real-time balances, APY, and vault stats.
- Chain switcher for seamless cross-chain experience.

### Thoughts
- **AI Activity Feed:** Vertical timeline of every AI agent action (rebalance, strategy, risk assessment, etc.), fetched from Tableland.
- **Why it matters:**
  - **Transparency:** Every move is logged and visible, building trust.
  - **Auditability:** Users and companies can see why funds moved, risk levels, and strategy details.
  - **Compliance:** Prove to auditors and regulators that all actions are transparent and justified.
  - **Learning:** Users can learn from the AI's decisions, understanding DeFi strategies and risk management in real time.

### Presentation
- Full-screen, slide-based explainer for demos, onboarding, and pitching.

---

## 🧠 How It Works: The Shogun Stack

- **[shogun-ai-core](https://github.com/yourusername/shogun-ai-core):**
  - The backend AI agent for planning, risk, and execution.
  - LLM-based strategy generation, risk scoring, and onchain logging.
- **[shogun-contracts](https://github.com/yourusername/shogun-contracts):**
  - Solidity/Cadence contracts for vaults, strategies, logging, and protocol integration.
- **[shogun-webapp](https://github.com/yourusername/shogun-webapp):**
  - The user dashboard for deposits, monitoring, and transparency.

---

## 🤖 Shogun AI Core (Backend)

An AI-powered DeFi strategy agent for Flow and Filecoin, specializing in cross-protocol yield optimization, onchain transparency, and consumer-friendly experiences. Shogun AI Core leverages LLM-based planning, risk assessment, and multi-chain vaults to deliver next-generation DeFi strategies.

[Full Shogun AI Core README](https://github.com/yourusername/shogun-ai-core#readme)

---

## 🛠️ Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT 