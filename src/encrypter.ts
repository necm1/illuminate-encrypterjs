import * as crypto from 'crypto';
import {GenerateIVException} from './exception/generate-iv.exception';
import {Algorithm} from './algorithm.enum';
import {InvalidAlgorithmException} from './exception/invalid-algorithm.exception';
import {Payload} from './interface/payload.interface';
import {InvalidPayloadException} from './exception/invalid-payload.exception';

/**
 * @class Encrypter
 */
export class Encrypter {
  /**
   * Algorithms store
   *
   * @private
   * @property
   * @type {{[key: string]: {size: number, aead: boolean}}}
   */
  private algorithms: {[key: string]: {size: number, aead: boolean}} = {
    'AES-128-cbc': {size: 16, aead: false},
    'AES-256-cbc': {size: 32, aead: false},
    'AES-128-gcm': {size: 16, aead: true},
    'AES-256-gcm': {size: 32, aead: false}
  }

  /**
   * Used algorithm
   *
   * @private
   * @property
   * @type {{key: 'AES-128-cbc' | 'AES-256-cbc' | 'AES-128-gcm' | 'AES-256-gcm', size: number, aead: boolean}}
   */
  private algorithm: {key: 'AES-128-cbc' | 'AES-256-cbc' | 'AES-128-gcm' | 'AES-256-gcm', size: number, aead: boolean};

  private key: string;

  /**
   * Byte size
   *
   * @protected
   * @property
   * @type {number}
   */
  protected bytesSize: number = 8;

  /**
   * Encrypter constructor
   *
   * @constructor
   * @param {string} key App Key
   * @param {Algorithm} algorithm
   */
  constructor(key: string, algorithm: Algorithm) {
    const algorithmEntry = this.algorithms[algorithm];

    if (!this.isValidAlgorithm(algorithm)) {
      throw new InvalidAlgorithmException(algorithm);
    }

    // Assign current algorithm
    this.algorithm = {key: algorithm, size: algorithmEntry.size, aead: algorithmEntry.aead};

    // Assign app key
    this.key = key;
  }

  /**
   * Asynchronously encrypt data
   *
   * @public
   * @async
   * @param {any} data Data to encrypt
   * @returns {Promise<string>}
   */
  public async encrypt(data: any): Promise<string> {
    return new Promise<string>((resolve, rejects) => {
      /*const iv = crypto.randomBytes(crypto.(this.algorithm.key.toLowerCase()));

      let decipher = crypto.createDecipheriv(SETTINGS.mode, SETTINGS.key, _iv);*/
    });
  }

  /**
   * Asynchronously decrypt payload
   *
   * @public
   * @async
   * @param {string} payload
   * @returns {Promise<string>}
   */
  public async decrypt(payload: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

    });
  }

  /**
   * Generate App Key
   *
   * @public
   * @returns {string}
   */
  public generateKey(): string {
    return `base64:${crypto.randomBytes(this.algorithm ? this.algorithm.size : 32).toString('base64')}`;
  }

  /**
   * Encrypt data
   *
   * @public
   * @param {any} data Data to encrypt
   * @returns {string}
   */
  public encryptSync(data: any): string {
    return '';
  }

  /**
   * Decrypt payload
   *
   * @public
   * @param {string} payload
   * @returns {string}
   */
  public decryptSync(payload: string): string {
    return '';
  }

  /**
   * Calculate MAC.
   *
   * @param {Object} payload with iv & value
   * @param {String} key
   */
  public calculateMac(payload, key){
    /*let hashedData = hash(payload['iv'], payload['value'])
    return hashHmac(hashedData, key);*/
  }

  /**
   * Validate algorithm
   *
   * @private
   * @param {string} algorithm
   * @returns {boolean}
   */
  private isValidAlgorithm(algorithm: string): boolean {
    return !!this.algorithms[algorithm];
  }

  /**
   * Generate 8 bytes IV
   *
   * @protected
   * @async
   * @returns {Promise<string>}
   */
  protected async generateIV(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      crypto.randomBytes(this.bytesSize, (e: Error | null, buffer: Buffer) => {
        if (e) {
          return reject(new GenerateIVException(`Error generating random bytes: \n${e.message}`));
        }

        resolve(buffer.toString('hex'))
      })
    })
  }

  /**
   * Generate 8 bytes IV
   *
   * @protected
   * @returns {string}
   */
  protected generateIVSync(): string {
    try {
      const buffer = crypto.randomBytes(this.bytesSize);
      return buffer.toString('hex');
    } catch (e) {
      throw new GenerateIVException(`Error generating random bytes: \n${e.message}`);
    }
  }

  /**
   *
   * @param {string} payload
   * @protected
   */
  protected jsonPayload(payload: string): Payload {
    try {
      const parsedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii')) as Payload;

      if (!this.validPayload(parsedPayload)) {
        throw new InvalidPayloadException();
      }

      if (!this.algorithm.aead && !this.validMac(parsedPayload)) {

      }

      return parsedPayload;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Verify payload
   *
   * @protected
   * @param {string} payload
   * @returns {boolean}
   */
  protected validPayload(payload: Payload): boolean {
    return payload && payload.hasOwnProperty('iv') && payload.hasOwnProperty('mac') && payload.hasOwnProperty('value');
  }

  /**
   * @protected
   */
  protected validMac(payload: Payload): boolean {
    return crypto.createHmac('sha256', this.key).update(payload.mac, crypto.randomBytes(16))
      === this.hash(payload.iv, payload.value)
  }

  /**
   * Create a MAC for the given value
   *
   * @protected
   * @param {string} iv
   * @param {value} value
   * @returns {string}
   */
  protected hash(iv: string, value: string): string {
    return crypto.createHmac('sha256', this.key).update(iv + value).digest('hex');
  }
}