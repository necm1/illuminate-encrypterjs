import {Encrypter} from './encrypter';
import {Algorithm} from './algorithm.enum';

new Encrypter('base64:u2D3+em3E9/O3hSUHJAKTg==', Algorithm.AES128gcm).generateKey();

export {Encrypter} from './encrypter'
