export function getConnectedComponents(nodes: Set<string>, undirAdj: Map<string, Set<string>>): Set<string>[] {
  const visited = new Set<string>();
  const components: Set<string>[] = [];

  for (const node of Array.from(nodes).sort()) {
    if (!visited.has(node)) {
      const comp = new Set<string>();
      const queue = [node];
      visited.add(node);
      comp.add(node);
      
      let head = 0;
      while (head < queue.length) {
        const curr = queue[head++];
        const neighbors = undirAdj.get(curr) || new Set();
        for (const neighbor of Array.from(neighbors)) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            comp.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      components.push(comp);
    }
  }
  return components;
}

export function detectCycle(
  node: string, 
  adj: Map<string, string[]>, 
  visited: Set<string>, 
  recStack: Set<string>
): boolean {
  visited.add(node);
  recStack.add(node);
  
  const neighbors = adj.get(node) || [];
  for (const next of neighbors) {
    if (!visited.has(next)) {
      if (detectCycle(next, adj, visited, recStack)) return true;
    } else if (recStack.has(next)) {
      return true;
    }
  }
  
  recStack.delete(node);
  return false;
}

export function buildTree(root: string, adj: Map<string, string[]>): Record<string, any> {
  const tree: Record<string, any> = {};
  const children = adj.get(root) || [];
  children.sort(); // Sort children alphabetically
  
  for (const child of children) {
    tree[child] = buildTree(child, adj);
  }
  return tree;
}

export function computeDepth(root: string, adj: Map<string, string[]>): number {
  const children = adj.get(root) || [];
  if (children.length === 0) return 1;
  let maxChildDepth = 0;
  for (const child of children) {
    maxChildDepth = Math.max(maxChildDepth, computeDepth(child, adj));
  }
  return 1 + maxChildDepth;
}
