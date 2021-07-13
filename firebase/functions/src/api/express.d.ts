declare namespace Express {

  /**
   * Extended Express Request to faciliate passing data between middleware on the request object.
   */
  export interface Request {
    userUid?: string;
  }
}