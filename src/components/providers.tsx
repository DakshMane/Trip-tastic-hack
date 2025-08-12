"use client"

import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React, { ReactNode, useState , useEffect } from "react";
import { WagmiProvider } from "wagmi";
import config from "./rainbowKitConfig";
import "@rainbow-me/rainbowkit/styles.css";

import {QueryClient , QueryClientProvider} from "@tanstack/react-query";


export function Providers(props : {children : ReactNode}) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            
            {props.children}
        </RainbowKitProvider>
        </QueryClientProvider>
        </WagmiProvider>
    )
}