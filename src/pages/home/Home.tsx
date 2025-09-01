import { useAccount, useAlert } from '@gear-js/react-hooks';
import { UseQueryResult } from '@tanstack/react-query';
import { ActorId } from 'sails-js';
import { Button, Input } from '@gear-js/vara-ui';
import { useState } from 'react';

import {
  useSendMintTransaction,
  useSendBurnTransaction,
  useSendTransferTransaction,
  useTokenQueries,
  useTokenEvents,
  useBalanceOfQuery,
  useProgramInstance,
} from '../../hooks';

import styles from './Home.module.scss';
import { isValidAddress, convertToHexAddress } from './helper';

function Home() {
  const { account } = useAccount();
  const { name, symbol, decimals, totalSupply, isLoading, refetchTotalSupply } = useTokenQueries();
  const alert = useAlert();

  const [transferTo, setTransferTo] = useState('');
  const [transferValue, setTransferValue] = useState('');
  const [balanceAddr, setBalanceAddr] = useState('');
  const [balanceResult, setBalanceResult] = useState<string | null>(null);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);

  const { sendTransactionAsync: sendMint, isPending: mintPending } = useSendMintTransaction();
  const { sendTransactionAsync: sendBurn, isPending: burnPending } = useSendBurnTransaction();
  const { sendTransactionAsync: sendTransfer, isPending: transferPending } = useSendTransferTransaction();
  const { data: program } = useProgramInstance();

  useTokenEvents({
    onMinted: (data) => alert.info(`Mint event: ${JSON.stringify(data)}`),
    onBurned: (data) => alert.info(`Burn event: ${JSON.stringify(data)}`),
    onTransfer: (data) => alert.info(`Transfer event: ${JSON.stringify(data)}`),
    onApproval: (data) => alert.info(`Approval event: ${JSON.stringify(data)}`),
  });

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!account?.address) throw new Error('No account selected!');
      await sendMint({ args: [account.decodedAddress, '1000'] });
      await refetchTotalSupply?.();
      alert.success('Mint success!');
    } catch (error) {
      alert.error('Error mint');
      console.error(error);
    }
  };

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!account?.address) throw new Error('No account selected!');
      await sendBurn({ args: [account.decodedAddress, '1000'] });
      await refetchTotalSupply?.();
      alert.success('Burn success!');
    } catch (error) {
      alert.error('Error burn');
      console.error(error);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!account?.address) throw new Error('No account selected!');
      if (!isValidAddress(transferTo)) throw new Error('Invalid recipient address!');
      if (!transferValue || parseFloat(transferValue) <= 0) throw new Error('Invalid transfer amount!');
      
      // Convert address to proper hex format
      const recipientAddress = convertToHexAddress(transferTo.trim());
      console.log('Transfer details:');
      console.log('- From:', account.address);
      console.log('- To (original):', transferTo);
      console.log('- To (hex):', recipientAddress);
      console.log('- Amount:', transferValue);
      
      // Check if trying to transfer to self
      const senderHex = convertToHexAddress(account.address);
      if (senderHex.toLowerCase() === recipientAddress.toLowerCase()) {
        throw new Error('Cannot transfer to yourself!');
      }
      
      await sendTransfer({ args: [recipientAddress, transferValue] });
      alert.success('Transfer success!');
      setTransferValue('');
      setTransferTo('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transfer failed';
      alert.error(errorMessage);
      console.error('Transfer error:', error);
    }
  };

  const handleCheckBalance = async () => {
    try {
      setIsCheckingBalance(true);
      setBalanceResult(null);
      
      const trimmedAddress = balanceAddr.trim();
      console.log('Checking balance for address:', trimmedAddress);
      
      if (!isValidAddress(trimmedAddress)) {
        alert.error('Please enter a valid address');
        return;
      }
      
      // Convert address to hex format
      const hexAddress = convertToHexAddress(trimmedAddress);
      console.log('Converted hex address:', hexAddress);
      
      if (!program) {
        throw new Error('Program not initialized');
      }
      
      // Call balanceOf directly
      const balance = await program.vft.balanceOf(hexAddress);
      console.log('Balance result:', balance);
      
      setBalanceResult(balance.toString());
      alert.success('Balance retrieved successfully!');
      
    } catch (error) {
      console.error('Balance check error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to check balance';
      alert.error(errorMessage);
      setBalanceResult('Error');
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const balanceQuery = useBalanceOfQuery(balanceAddr as `0x${string}`, {
    enabled: isValidAddress(balanceAddr),
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Token Metadata</h1>
        {isLoading ? (
          <p className={styles.loading}>Loading token data...</p>
        ) : (
          <dl className={styles.metaList}>
            <div>
              <dt>Name:</dt>
              <dd>{name}</dd>
            </div>
            <div>
              <dt>Symbol:</dt>
              <dd>{symbol}</dd>
            </div>
            <div>
              <dt>Decimals:</dt>
              <dd>{decimals}</dd>
            </div>
            <div>
              <dt>Total Supply:</dt>
              <dd>{totalSupply}</dd>
            </div>
          </dl>
        )}
        <div className={styles.account}>
          <strong>Your Account:</strong> {account?.address ?? 'Not connected'}
        </div>
      </header>

      <form className={styles.section} onSubmit={handleMint} autoComplete="off">
        <Button type="submit" color="primary" size="medium" isLoading={mintPending} disabled={!account?.address} block>
          {mintPending ? 'Minting...' : 'Mint 1000 to self'}
        </Button>
      </form>

      <form className={styles.section} onSubmit={handleBurn} autoComplete="off">
        <Button type="submit" color="contrast" size="medium" isLoading={burnPending} disabled={!account?.address} block>
          {burnPending ? 'Burning...' : 'Burn 1000 from self'}
        </Button>
      </form>

      <form className={styles.section} onSubmit={handleTransfer} autoComplete="off">
        <Input
          label="To address"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
          placeholder="To address"
          size="medium"
          block
          error={transferTo && !isValidAddress(transferTo) ? 'Incorrect address' : undefined}
        />
        <Input
          label="Amount"
          type="number"
          value={transferValue}
          onChange={(e) => setTransferValue(e.target.value)}
          placeholder="Amount"
          size="medium"
          min="0"
          block
        />
        <Button
          type="submit"
          color="primary"
          size="medium"
          isLoading={transferPending}
          disabled={transferPending || !transferTo || !transferValue || !isValidAddress(transferTo)}
          block>
          {transferPending ? 'Transferring...' : 'Transfer'}
        </Button>
      </form>

      <form className={styles.section} autoComplete="off">
        <Input
          label="Address"
          value={balanceAddr}
          onChange={(e) => setBalanceAddr(e.target.value)}
          placeholder="Address"
          size="medium"
          block
          error={balanceAddr && !isValidAddress(balanceAddr) ? 'Incorrect address' : undefined}
        />
        <Button
          type="button"
          color="primary"
          size="medium"
          disabled={!isValidAddress(balanceAddr)}
          isLoading={isCheckingBalance}
          block
          onClick={handleCheckBalance}>
          {isCheckingBalance ? 'Checking...' : 'Check Balance'}
        </Button>
        {balanceResult !== null && (
          <div className={styles.balance}>
            Balance: <strong>{balanceResult}</strong>
          </div>
        )}
      </form>
    </main>
  );
}

export { Home };