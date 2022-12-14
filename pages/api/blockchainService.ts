import { ethers } from "ethers";
import { MetaRockCollection } from "../../typechain-types/MetaRockCollection";
import { Marketplace } from "../../typechain-types/Marketplace";
import { marketAddress, nftAddress } from "../../config";
import NFT from "../../contracts/MetaRockCollection.sol/MetaRockCollection.json";
import Market from "../../contracts/Marketplace.sol/Marketplace.json";

export const rpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ROPSTEN_URL
);

export function getMarketContract(signer?: any) {
  let provider = rpcProvider;
  if (signer) {
    provider = signer;
  }
  return new ethers.Contract(marketAddress, Market.abi, provider) as Marketplace;
}

export function getTokenContract(signer?: any) {
  let provider = rpcProvider;
  if (signer) {
    provider = signer;
  }
  return new ethers.Contract(nftAddress, NFT.abi, provider) as MetaRockCollection;
}
