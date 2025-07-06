import { useAppKit } from "@reown/appkit/react";
import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";
import { formatAddress } from "@/lib/utils";

export default function ConnectButton() {
    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    // Auto-connect if there's a saved connection
    useEffect(() => {
        const savedConnector = connectors.find(c => c.ready);
        if (savedConnector && !isConnected) {
            connect({ connector: savedConnector });
        }
    }, [connectors, connect, isConnected]);

    return (
        <div className="p-2 bg-gradient-to-r from-[#5FFBF1] to-[#24FF9B] rounded-full shadow-lg inline-block">
            <button 
                onClick={() => open()} 
                className="text-black font-bold px-4 rounded "
                style={{ fontFamily: 'var(--font-basement)' }}
>
                {isConnected ? formatAddress(address) : "Connect Wallet"}
            </button>
        </div>
    );
}