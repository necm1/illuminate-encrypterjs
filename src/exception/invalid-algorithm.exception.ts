/**
 * @class InvalidAlgorithmException
 * @extends {Error}
 */
export class InvalidAlgorithmException extends Error {
  /**
   * InvalidAlgorithmException constructor
   *
   * @constructor
   * @param {string} algorithm
   */
  constructor(algorithm: string) {
    super(`Invalid algorithm '${algorithm}'. Usable algorithms: 'AES-128-cbc', 'AES-256-cbc', 'AES-128-gcm' & 'AES-256-gcm'`);
  }
}