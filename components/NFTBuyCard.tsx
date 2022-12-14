import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MarketItem } from "../pages";
import { ethers } from "ethers";
import Button from "./common/Button";
import { BlockchainContext } from "../context/BlockchainContext";
import { BuyDialog } from "./BuyDialog";
import { SellDialog } from "./SellDialog";

interface Props {
  nft: MarketItem;
}

const NFTBuyCard = ({ nft }: Props) => {
  const { getProvider } = useContext(BlockchainContext);
  const [owner, setOwner] = useState<string | undefined>();
  // const [buy, setBuy] = useState(false);
  // const [sell, setSell] = useState(false);
  useEffect(() => {
    async function setOwnerAddress() {
      const provider = await getProvider();
      const accounts = await provider?.listAccounts();
      if (provider && accounts[0]) setOwner(accounts[0]);
    }
    setOwnerAddress();
  }, []);
  function isOwner() {
    if (nft) return nft.owner && owner == nft.owner;
  }
  return (
    <div className="relative text-gray-200 shadow-homogen bg-background rounded-2xl">
      <span className="absolute z-10 inline-flex items-center px-3 text-sm font-semibold text-white rounded-full bg-primary right-2 top-2">
        # <span className="pl-1 text-xl">{nft.itemId}</span>
      </span>
      <Link href={`/items/${nft.itemId}`}>
        <div className="cursor-pointer">
          <div className="p-4">
            <img
              src={nft.image}
              className="object-cover aspect-square rounded-2xl"
            />
          </div>
          <div className="px-4 pb-4">
            <div className="mt-2 mb-4 space-y-3 sm:pr-8">
              <h5 className="text-xl font-semibold ">{nft.name}</h5>
              <p className="text-lg text-gray-400">{nft.description}</p>
              {nft.price.toString() != "0" ? (
                <p className="text-2xl font-bold text-white font-inter">
                  {ethers.utils.formatEther(nft.price)} PRING
                </p>
              ) : (
                <p className="text-2xl font-bold text-white font-inter">
                  Not for Sale
                </p>
              )}
            </div>
            {/* <div className="flex items-center space-x-2 justify-evenly">
          {
            owner ?
              isOwner() ?
                <Button onClick={() => setSell(true)}>Sell</Button>
                :
                nft.isSold ?
                  <div />
                  :
                  <Button onClick={() => setBuy(true)}>Buy</Button>
              :
              <div />
          }
          <Link href={`/items/${nft.itemId}`} passHref>
            <Button type="secondary">Details</Button>
          </Link>
        </div> */}
          </div>
        </div>
      </Link>

      {/* {buy && (
        <BuyDialog
          open={buy}
          onClose={() => setBuy(false)}
          price={nft.price}
          itemId={nft.itemId}
          onComplete={() => setBuy(false)}
        />
      )}

      <SellDialog
        itemId={nft.itemId}
        open={sell}
        onClose={() => setSell(false)}
      /> */}
    </div>
  );
};

export default NFTBuyCard;
