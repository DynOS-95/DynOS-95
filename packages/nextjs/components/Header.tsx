"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { useIsMounted } from "usehooks-ts";

/**
 * Site header
 */
export const Header = () => {
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setShowAuthFlow, isAuthenticated } = useDynamicContext();
  const isMounted = useIsMounted();

  if (!isMounted()) return;

  return (
    <AppBar style={{ position: "initial" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Button onClick={() => setOpen(!open)} active={open} style={{ fontWeight: "bold" }}>
            <div className="flex gap-1.5 items-center">
              <Image src="/assets/dyno.png" width={25} height={25} alt="DynOS logo" />
              DynOS 95
            </div>
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                top: "100%",
                zIndex: "99",
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem>
                <a
                  href="https://github.com/carletex/ethlondon-2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  📁 Fork me
                </a>
              </MenuListItem>
              <Separator />
              <MenuListItem>
                <div onClick={() => setModalIsOpen(true)} className="cursor-pointer">
                  👨‍💻 About
                </div>
              </MenuListItem>
            </MenuList>
          )}
        </div>
        {isAuthenticated ? (
          <DynamicWidget />
        ) : (
          <Button primary onClick={() => setShowAuthFlow(true)}>
            Sign in
          </Button>
        )}
      </Toolbar>
      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-3 md:p-0 z-10"
          onClick={() => setModalIsOpen(false)}
        >
          <Window className="window w-[450px] max-w-[95%]">
            <WindowHeader className="window-title flex justify-between">
              <span>About</span>
              <Button onClick={() => setModalIsOpen(false)}>
                <span className="close-icon" />X
              </Button>
            </WindowHeader>
            <div className="flex items-center flex-col flex-grow p-4 rounded-md">
              <WindowContent>
                <p className="pb-2">
                  DynOS 95 is designed to improve the onboarding experience to web3, providing a friendly environment
                  where users can connect to any DApps with their familiar web2 login system.
                </p>
                <p>
                  Made by Andrea, Carlos, Pablo and Shiv for ETH London 2024, using Scaffold ETH 2, Dynamic and NounsDAO
                  vibes.
                </p>
              </WindowContent>
            </div>
          </Window>
        </div>
      )}
    </AppBar>
  );
};
