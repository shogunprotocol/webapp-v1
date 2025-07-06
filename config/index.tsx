import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'
import type { Chain } from 'viem'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Define Filecoin Calibration Testnet
export const filecoinCalibration = defineChain({
  id: 314_159,
  name: 'Filecoin Calibration Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/filecoin_testnet'],
    },
    public: {
      http: ['https://rpc.ankr.com/filecoin_testnet'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Beryx',
      url: 'https://beryx.zondax.ch',
    },
  },
  testnet: true,
})

// Define Flow Testnet
export const flowTestnet = defineChain({
  id: 545,
  name: 'Flow Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Flow',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.evm.nodes.onflow.org'],
    },
    public: {
      http: ['https://testnet.evm.nodes.onflow.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Flowscan',
      url: 'https://testnet.flowscan.org',
    },
  },
  testnet: true,
})

export const networks: [Chain, ...Chain[]] = [filecoinCalibration, flowTestnet]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig