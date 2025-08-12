"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {anvil , zksync, mainnet} from "wagmi/chains"

export default getDefaultConfig({
    appName : "TSender App",
    projectId: "358ebfa4f884a8e37543777a5b947cb4" ,
    chains: [anvil, zksync , mainnet],
    ssr : false,
})