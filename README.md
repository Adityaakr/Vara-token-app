# VFT dApp

A Vara Fungible Token (VFT) decentralized application built on the Vara blockchain. This dApp provides a complete interface for interacting with VFT smart contracts including minting, burning, transferring tokens, and checking balances.

## Features

- 🪙 **Mint Tokens** - Create new tokens (requires minter permissions)
- 🔥 **Burn Tokens** - Destroy tokens from your balance
- 💸 **Transfer Tokens** - Send tokens to other addresses
- 💰 **Check Balance** - Query token balance for any address
- 🔗 **Wallet Integration** - Connect with Vara wallets
- 📊 **Real-time Events** - Live updates for token operations

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Blockchain**: Vara Network
- **Styling**: SCSS Modules
- **State Management**: React Hooks
- **Wallet**: Polkadot Extension Integration

## Installation

```bash
# Clone the repository
git clone https://github.com/Adityaakr/vft-dapp.git
cd vft-dapp

# Install dependencies
yarn install

# Start development server
yarn start
```

## Usage

1. **Connect Wallet** - Click the wallet button to connect your Vara wallet
2. **Mint Tokens** - Use the mint button to create 1000 tokens (requires minter role)
3. **Transfer Tokens** - Enter recipient address and amount to transfer
4. **Burn Tokens** - Burn 1000 tokens from your balance
5. **Check Balance** - Enter any address to check its token balance

## Smart Contract Integration

This dApp integrates with VFT (Vara Fungible Token) smart contracts that implement:
- Standard fungible token operations
- Role-based access control for minting
- Event emission for all operations
- Balance queries for any address
