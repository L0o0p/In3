import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocketIO = () => {
  const uid = "871410a4-9675-447a-94ee-2933c7fd1f97"
  const [socket, setSocket] = useState<Socket>();
  const [failcont, setFailCount] = useState<number>(0);

  const createNewSocket = useCallback(() => {
    const socket = io('wss://aiopen.cytelab.net', {
      transports: ['websocket'],
      reconnectionDelay: 1000 * 60,
      reconnectionAttempts: 10,
      auth: {
        uid,
      },
      path: '/paid/ws',
    });
    setSocket(socket);
    socket.on('connect', () => {
      console.log('socket connected');
      setFailCount(0);
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
      setFailCount((p) => p + 1);
    });
    const stop = () => {
      socket.close();
    };
    return () => {
      stop();
    };
  }, [socket, uid]);

  useEffect(() => {
    failcont > 0 && console.log('wsfailed', failcont);
  }, [failcont]);
  useEffect(() => {
    const res = createNewSocket();
    return () => {
      res();
    };
  }, [uid]);

  return { socket };
};
