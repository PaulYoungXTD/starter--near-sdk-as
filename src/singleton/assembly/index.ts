import { PersistentMap } from "near-sdk-as";
import { AccountId } from "../../utils";
import { INearNFTCore, Token } from "./nft_interface";

@nearBindgen  // for (de)serialization
class NFTContract implements INearNFTCore {
  // Why we have an prefix ('o' in this case) for PersistentMap?
  //   To avoid collision when we want to use multiple persistant map. 
  //   See https://docs.near.org/docs/develop/contracts/as/intro#collections for more details.
  private tokenOwnerById: PersistentMap<string, AccountId> = new PersistentMap('o')

  nft_transfer(
    receiver_id: AccountId,
    token_id: string,
    memo: string
  ): void {

  }

  nft_transfer_call(
    receiver_id: AccountId,
    token_id: string,
    memo: string,
    msg: string
  ): void {

  }

  nft_token(token_id: string): Token | null {
    const owner_id = this.tokenOwnerById.get(token_id)
    if (!owner_id) {
      return null
    }

    return {
      id: token_id,
      owner_id 
    }
  }

  // mint
  mint(token_id: string, owner_id: AccountId) {
    // Mint an NFT for this owner
    //  i.e. add a record entry showing that the token is owned by this owner

    const owner = this.tokenOwnerById.get(token_id);
    if (owner) {
      throw new Error('token already exist');
    }

    this.tokenOwnerById.set(token_id, owner_id);

    return {
      id: token_id,
      owner_id
    }

  }
}