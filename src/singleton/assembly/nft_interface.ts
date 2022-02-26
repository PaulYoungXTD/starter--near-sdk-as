import { AccountId } from '../../utils'

export class Token {
    id: string
    owner_id: AccountId
}

export interface INearNFTCore {
    nft_transfer(
        receiver_id: AccountId,
        token_id: string,
        memo: string
    )

    nft_transfer_call(
        receiver_id: AccountId,
        token_id: string,
        memo: string,
        msg: string
    )

    nft_token(token_id: string): Token | null
}