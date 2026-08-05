import io from 'socket.io-client'
import { SOCKET_URL } from '../config/app'

export const overrideStyle = {
    display : 'flex', 
    margin : '0 auto',
    height: '24px',
    justifyContent : 'center',
    alignItems : 'center'
}
export const socket = io(SOCKET_URL)
