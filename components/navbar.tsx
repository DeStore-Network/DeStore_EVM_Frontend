import { Disclosure, Menu, Transition } from "@headlessui/react";
import Web3Modal from "web3modal";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ethers } from "ethers";
import { getEllipsisTxt } from "../utils";
import WalletSvg from "./svg/WalletSvg";
import { AppContextProps, BlockchainContext } from "../context/BlockchainContext";
import { ContextType } from "react";

interface Props { }

const navigation = [
  { name: "My Space", href: "/myNFTs" },
  { name: "Explore", href: "/explore" },
  { name: "Info", href: "/" },
];

export const Navbar = (props: Props) => {
  const [scrolled, setScrolled] = useState(false);

  const { connectedAccount, connectWallet, disconnect } = useContext(BlockchainContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return (
    <Disclosure
      as="nav"
      className={clsx("fixed z-40 w-full transition-all ease-in-out duration-200 py-4", {
        " bg-[#1b1f2b] shadow-[#1b1f2b]/20 shadow-md py-1": scrolled,
      })}
    >
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <img
                      className="block w-20 h-12 cursor-pointer lg:hidden"
                      src="/favicon.png"
                      alt="MetaRock logo"
                    />
                  </Link>
                  <Link href="/">
                    <img
                      className="hidden w-20 h-12 cursor-pointer lg:block"
                      src="/favicon.png"
                      alt="MetaRock logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-12">
                  <div className="flex space-x-12">
                    <Link href="https://snowswap.xyz/#/">
                      <div className="px-3 py-2 font-medium border-b-2 border-transparent cursor-pointer">
                        <button
                          className="px-4 py-2 font-semibold transition border-2 rounded-full shadow-lg hover:border-success hover:text-success hover:shadow-success/30 border-success/80 text-success/90 shadow-success/10"
                        >
                          Swap Crypto</button>
                      </div>
                    </Link>
                    {navigation.map((item) => {
                      return (
                        <Link key={item.name} href={item.href}>
                          <div className="pr-1 py-4 font-medium border-b-2 border-transparent cursor-pointer">
                            {item.name}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-4 font-medium sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href="/createItem">
                  <button
                    className="px-4 py-2 font-semibold transition border-2 rounded-full shadow-lg hover:border-success hover:text-success hover:shadow-success/30 border-success/80 text-success/90 shadow-success/10"
                    style={{
                      border: 'none',
                      background: 'linear-gradient(180deg,#6200e9, #ff1a9a)',
                      color: '#fff',
                    }}
                  >
                    Create NFT</button>
                </Link>
                {connectedAccount ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex items-center max-w-xs px-4 py-2 text-white transition rounded-full bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 hover:bg-gray-700 shadow-homogen font-poppins">
                        <span className="sr-only">Open user menu</span>

                        <div className="pr-2">
                          <WalletSvg className="w-5 h-5 text-white" />
                        </div>

                        <div className="font-sm">{getEllipsisTxt(connectedAccount)}</div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 py-1 mt-2 origin-top-right bg-gray-800 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <div className="m-2 rounded-md hover:bg-gray-700">
                            <button onClick={() => disconnect()} className="block p-2 text-white ">
                              Disconnect
                            </button>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={() => connectWallet(true)}
                    className="px-4 py-2 font-semibold transition border-2 rounded-full shadow-lg hover:border-primary hover:text-primary hover:shadow-primary/30 border-primary/80 text-primary/90 shadow-primary/10"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="bg-gray-800 sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <div className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
                      {item.name}
                    </div>
                  </Link>
                ))}
              </>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
