import { Leaf } from './leaf'
import { Node } from './node'

/**
 * The merkle. By the tree, people can generate the proof and locally verify the proof.
 */
export class Tree {
  /**
   * The list of leaves.
   */
  public readonly leaves
  private mapNodePair: Record<string, Node> = {}
  /**
   * Tree constructor.
   * @param leaves The list of <address,amount> represented as leaves.
   */
  constructor(leaves: Leaf[]) {
    this.leaves = leaves.sort((a, b) => a.gte(b))
  }

  /**
   * The merkle root.
   */
  get root(): Node {
    let nodes = this.leaves.map((elm) => new Node(elm.value))
    while (nodes.length > 1) {
      const newNodes: Node[] = []
      for (let i = 0; i < nodes.length; i += 2) {
        const crrNode = nodes[i]
        const nextNode = nodes[i + 1]
        if (!nextNode) newNodes.push(crrNode)
        else {
          newNodes.push(crrNode.hash(nextNode))
          this.mapNodePair[crrNode.toString()] = nextNode
          this.mapNodePair[nextNode.toString()] = crrNode
        }
      }
      nodes = newNodes
    }
    return nodes[0]
  }

  /**
   * Generate the proof.
   * @param leaf Leaf.
   * @returns Proof - The list of nodes.
   */
  prove(leaf: Leaf): Node[] {
    const result: Node[] = []
    let node = new Node(leaf.value)
    while (!node.eq(this.root)) {
      let pairNode = this.mapNodePair[node.toString()]
      if (!pairNode) return []
      result.push(pairNode)
      node = node.hash(pairNode)
    }
    return result
  }

  /**
   * Verify the proof.
   * @param leaf The receiver info represented as a leaf.
   * @param proof The proof to the leaf.
   * @returns true/false
   */
  verify(leaf: Leaf, proof: Node[]): boolean {
    const root = this.root
    let crrNode = new Node(leaf.value)
    for (const proofNode of proof) crrNode = crrNode.hash(proofNode)
    return crrNode.eq(root)
  }
}
