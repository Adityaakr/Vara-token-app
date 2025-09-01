A complete Web3 application featuring Vara Fungible Token (VFT) smart contracts and a React frontend. This full-stack dApp provides comprehensive token management functionality on the Vara blockchain.

## 🏗️ Project Structure

```
├── dApp/                    # React frontend application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── styles/         # SCSS styling
│   └── package.json
└── standards/              # Smart contracts
    ├── extended-vft/       # VFT token contract
    ├── extended-vmt/       # VMT token contract
    ├── extended-vnft/      # VNFT token contract
    └── vft-service/        # VFT service contract
```

## ✨ Features

### Frontend (React dApp)
- 🪙 **Mint Tokens** - Create new tokens (requires minter permissions)
- 🔥 **Burn Tokens** - Destroy tokens from your balance
- 💸 **Transfer Tokens** - Send tokens to other addresses
- 💰 **Check Balance** - Query token balance for any address
- 🔗 **Wallet Integration** - Connect with Vara wallets
- 📊 **Real-time Events** - Live updates for token operations

### Smart Contracts
- **VFT (Vara Fungible Token)** - Standard fungible token implementation
- **VMT (Vara Multi Token)** - Multi-token standard
- **VNFT (Vara Non-Fungible Token)** - NFT implementation
- **Service Contracts** - Supporting infrastructure

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Smart Contracts**: Rust + Gear Protocol
- **Blockchain**: Vara Network
- **Styling**: SCSS Modules
- **State Management**: React Hooks

## 🚀 Installation & Setup

### Frontend Setup
```bash
git clone https://github.com/Adityaakr/Vara-VFT-Full-Stack-dApp.git
cd Vara-VFT-Full-Stack-dApp
yarn install
yarn start
```

### Smart Contract Development
```bash
cd standards/extended-vft
cargo build --release
```

## 📖 Usage

1. **Connect Wallet** - Click the wallet button to connect your Vara wallet
2. **Mint Tokens** - Use the mint button to create 1000 tokens (requires minter role)
3. **Transfer Tokens** - Enter recipient address and amount to transfer
4. **Burn Tokens** - Burn 1000 tokens from your balance
5. **Check Balance** - Enter any address to check its token balance
