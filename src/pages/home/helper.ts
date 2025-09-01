import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

export const isValidAddress = (address: string): boolean => {
  if (!address || address.trim().length === 0) return false;
  
  try {
    // Handle both hex (0x...) and SS58 address formats
    const cleanAddress = address.trim();
    
    if (cleanAddress.startsWith('0x')) {
      // Hex address validation
      if (cleanAddress.length !== 66) return false; // 0x + 64 hex chars
      hexToU8a(cleanAddress);
    } else {
      // SS58 address validation
      decodeAddress(cleanAddress);
    }
    
    encodeAddress(
      isHex(cleanAddress)
        ? hexToU8a(cleanAddress)
        : decodeAddress(cleanAddress)
    );

    return true;
  } catch (error) {
    return false;
  }
};

export const convertToHexAddress = (address: string): `0x${string}` => {
  if (!address) throw new Error('Address is required');
  
  const cleanAddress = address.trim();
  
  if (cleanAddress.startsWith('0x')) {
    return cleanAddress as `0x${string}`;
  }
  
  // Convert SS58 to hex
  try {
    const decoded = decodeAddress(cleanAddress);
    return `0x${Buffer.from(decoded).toString('hex')}`;
  } catch (error) {
    throw new Error('Invalid address format');
  }
};
