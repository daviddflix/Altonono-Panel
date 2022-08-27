import { createContext } from "react";
import io from "socket.io-client";

const port = 'https://altonono.herokuapp.com/'
// process.env.REACT_APP_URL

export const socket = io.connect(`${port}`, {transports: ['websocket', 'polling']});
export const SocketContext = createContext(socket)