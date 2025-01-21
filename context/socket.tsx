import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, type Socket } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

// Create a context for the Socket instance
const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

// Hook to use socket context
const useSocket = () => {
    return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    useEffect(() => {
        const socketConnection = io(); // Add URL if necessary
        setSocket(socketConnection);

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider, useSocket };
