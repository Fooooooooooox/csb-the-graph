
import { store, Bytes, BigInt } from '@graphprotocol/graph-ts';

import {
    Mint as MintEvent,
    Burn as BurnEvent,
  } from '../../generated/CBT/CharacterBoundToken';
  
import {
    CBT,
 } from '../../generated/schema';
  

function toBytes(hexString: String): Bytes {
    let result = new Uint8Array(hexString.length/2);
    for (let i = 0; i < hexString.length; i += 2) {
        result[i/2] = parseInt(hexString.substr(i, 2), 16) as u32;
    }
    return result as Bytes;
}

  export function handleMint(event: MintEvent): void {
    let tokenId = event.params.tokenId;
    let id = event.address.toHex() + '_' + tokenId.toString();
    let cbt = CBT.load(id);
    if (cbt != null) {
        cbt = new CBT(id);
        cbt.tokenID = event.params.tokenId;
        cbt.owner = event.address.toString();
        cbt.amount = event.params.tokenNumber;
        cbt.mintTime = event.block.timestamp;
        cbt.save();
    }
  
  };
  
//   export function handleBurn(event: BurnEvent): void {
    
//   };