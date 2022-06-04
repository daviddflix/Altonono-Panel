import { createContext } from "react";
import io from "socket.io-client";

const port = 'https://altonono.herokuapp.com'

export const socket = io.connect(`${port}`, {transports: ['websocket', 'polling']});
export const SocketContext = createContext()