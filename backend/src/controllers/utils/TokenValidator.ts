import { FBAuth } from "../../auth/FBAuth";
import { TokenError } from "../customErrors/TokenError";
export class TokenValidator {
  public async validateToken(authHeader: any) {
    if (authHeader) {
      await FBAuth.auth()
        .verifyIdToken(authHeader)
        .then((decodedToken) => {
          return decodedToken;
        })
        .catch((e) => {
          throw new TokenError("Invalid Token!");
        });
    }
    throw new TokenError("No Token!");
  }
}
