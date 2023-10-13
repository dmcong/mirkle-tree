import { AbiCoder, getBytes, keccak256, toBeArray } from 'ethers'

/**
 * Every receiver will be represented as a leaf node.
 */
export class Leaf {
  /**
   * Leaf constructor.
   * @param address Receiver's address.
   * @param amount Airdroped amount.
   */
  constructor(
    public readonly address: string,
    public readonly amount: bigint,
  ) {}

  /**
   * Hash the sibling to the parent value.
   * @returns Its hash.
   */
  get value(): Uint8Array {
    const abiCoder = new AbiCoder()
    return getBytes(
      keccak256(
        toBeArray(
          abiCoder.encode(['address', 'uint'], [this.address, this.amount]),
        ),
      ),
    )
  }

  /**
   * Compare 2 leaves whether yours greater than or equal.
   * @param leaf Another leaf to compare.
   * @returns -1/0/1
   */
  gte(leaf: Leaf) {
    if (this.address > leaf.address) return 1
    if (this.address < leaf.address) return -1
    if (this.amount > leaf.amount) return 1
    if (this.amount < leaf.amount) return -1
    return 0
  }
}
