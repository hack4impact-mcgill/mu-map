import { FBAuth } from "../../auth/FBAuth";
import { TokenError } from "../customErrors/TokenError";
export class TokenValidator {
  public async validateToken(authHeader: any) {
    if (authHeader) {
      console.log("here");
      await FBAuth.auth()
        .verifyIdToken(authHeader)
        .then((decodedToken) => {
          console.log("here");
          return decodedToken;
        })
        .catch((e) => {
          console.log("asdasd");
          console.log(e);
          throw new TokenError("Invalid Token!");
        });
    } else {
      throw new TokenError("No Token!");
    }
  }
}
