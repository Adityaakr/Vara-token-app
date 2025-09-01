import { UseQueryResult } from '@tanstack/react-query';

export type TokenMetaQueries = {
  name: string | undefined;
  symbol: string | undefined;
  decimals: string | undefined;
  totalSupply: string | undefined;
  isLoading: boolean;
  refetchTotalSupply: (() => Promise<void>) | undefined;
};

import { ActorId } from 'sails-js';

export type TokenEventCallbacks = {
  onMinted?: (data: { owner: ActorId; amount: bigint }) => void;
  onBurned?: (data: { owner: ActorId; amount: bigint }) => void;
  onTransfer?: (data: { from: ActorId; to: ActorId; amount: bigint }) => void;
  onApproval?: (data: { owner: ActorId; spender: ActorId; amount: bigint }) => void;
};

export type BalanceQuery = UseQueryResult<bigint | undefined, Error>;
