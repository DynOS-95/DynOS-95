"use client";

import React, { useRef, useState } from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { AppBar, Button, MenuList, MenuListItem, Separator, Toolbar } from "react95";

/**
 * Site header
 */
export const Header = () => {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef(null);

  return (
    <AppBar style={{ position: "initial" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Button onClick={() => setOpen(!open)} active={open} style={{ fontWeight: "bold" }}>
            Start
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                top: "100%",
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem>
                <span role="img" aria-label="👨‍💻">
                  👨‍💻
                </span>
                Profile
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="📁">
                  📁
                </span>
                My account
              </MenuListItem>
              <Separator />
              <MenuListItem disabled>
                <span role="img" aria-label="🔙" className="bg-red-400">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>
        <Button
          primary
          onClick={() => {
            console.log("widgetRef", widgetRef);
            if (widgetRef.current) {
              console.log("clicking widgetRef!");
              // widgetRef.current.click();
            }
          }}
        >
          <div ref={widgetRef}>
            <DynamicWidget innerButtonComponent="Connect" />
          </div>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
