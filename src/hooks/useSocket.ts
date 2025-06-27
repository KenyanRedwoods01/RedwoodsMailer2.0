import { useEffect, useRef, useState } from 'react';

interface UseSocketOptions {
  url?: string;
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

interface SocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const {
    url = 'ws://localhost:8080',
    autoConnect = true,
    reconnectAttempts = 3,
    reconnectInterval = 1000
  } = options;

  const [state, setState] = useState<SocketState>({
    connected: false,
    connecting: false,
    error: null
  });

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setState(prev => ({ ...prev, connecting: true, error: null }));

    try {
      socketRef.current = new WebSocket(url);

      socketRef.current.onopen = () => {
        setState({ connected: true, connecting: false, error: null });
        reconnectCountRef.current = 0;
      };

      socketRef.current.onclose = () => {
        setState(prev => ({ ...prev, connected: false, connecting: false }));
        
        // Attempt to reconnect
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      socketRef.current.onerror = (error) => {
        setState(prev => ({ 
          ...prev, 
          connected: false, 
          connecting: false, 
          error: 'WebSocket connection error' 
        }));
      };

    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        connected: false, 
        connecting: false, 
        error: 'Failed to create WebSocket connection' 
      }));
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    setState({ connected: false, connecting: false, error: null });
  };

  const send = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
      return true;
    }
    return false;
  };

  const subscribe = (callback: (data: any) => void) => {
    if (socketRef.current) {
      const handleMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      socketRef.current.addEventListener('message', handleMessage);

      return () => {
        if (socketRef.current) {
          socketRef.current.removeEventListener('message', handleMessage);
        }
      };
    }

    return () => {};
  };

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [url, autoConnect]);

  return {
    ...state,
    connect,
    disconnect,
    send,
    subscribe
  };
};

export default useSocket;

