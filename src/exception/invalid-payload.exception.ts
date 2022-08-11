/**
 * @class InvalidPayloadException
 * @extends {Error}
 */
export class InvalidPayloadException extends Error {
  /**
   * InvalidPayloadException constructor
   *
   * @constructor
   */
  constructor() {
    super('The given payload is invalid');
  }
}