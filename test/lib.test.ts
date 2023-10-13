import { SigningKey, Wallet, randomBytes } from 'ethers'
import { expect } from 'chai'

import { Leaf, Tree } from '../dist'

const leaves: Leaf[] = Array.from(Array(17).keys()).map(
  (i) =>
    new Leaf(
      new Wallet(new SigningKey(randomBytes(32))).address,
      BigInt(i + 1) * 1_000_000_000_000_000_000n,
    ),
)

describe('library', function () {
  it('prove/verify locally', () => {
    const tree = new Tree(leaves)
    const proof = tree.prove(leaves[10])
    const ok = tree.verify(leaves[10], proof)
    expect(ok).to.be.true
  })
})
