/**
 * @class GenerateIVException
 * @extends {Error}
 */
export class GenerateIVException extends Error {
  /**
   * GenerateIVException constructor
   *
   * @constructor
   * @param {string} message
   */
  constructor(message: string) {
    super(message);
  }
}