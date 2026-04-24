import { HierarchyGroup, SummaryData, ApiResponse } from './types';
import { USER_DETAILS } from './constants';
import { getConnectedComponents, detectCycle, buildTree, computeDepth } from './graph';

export function processGraphData(rawData: string[]): ApiResponse {
  const invalid_entries: string[] = [];
  const duplicate_edges: string[] = [];
  
  const validEdges: {u: string, v: string, original: string}[] = [];
  
  const seenEdges = new Set<string>();
  
  // 1 & 2. Sanitize and Validate
  for (const item of rawData) {
    if (typeof item !== 'string') {
      invalid_entries.push(String(item));
      continue;
    }
    
    const trimmed = item.trim();
    const parts = trimmed.split('->');
    
    if (parts.length !== 2) {
      invalid_entries.push(item);
      continue;
    }
    
    const u = parts[0].trim();
    const v = parts[1].trim();
    
    if (!/^[A-Z]$/.test(u) || !/^[A-Z]$/.test(v) || u === v) {
      invalid_entries.push(item);
      continue;
    }
    
    const normalized = `${u}->${v}`;
    
    // 3. Duplicate detect
    if (seenEdges.has(normalized)) {
      duplicate_edges.push(item);
      continue;
    }
    seenEdges.add(normalized);
    validEdges.push({u, v, original: item});
  }
  
  // 4. Assign first parent
  const parentMap = new Map<string, string>();
  const finalEdges: {u: string, v: string}[] = [];
  
  for (const edge of validEdges) {
    if (!parentMap.has(edge.v)) {
      parentMap.set(edge.v, edge.u);
      finalEdges.push(edge);
    }
  }
  
  // 5. Build directed graph
  const dirAdj = new Map<string, string[]>();
  // 6. Build undirected graph
  const undirAdj = new Map<string, Set<string>>();
  const allNodes = new Set<string>();
  const inDegree = new Map<string, number>();
  
  for (const {u, v} of finalEdges) {
    if (!dirAdj.has(u)) dirAdj.set(u, []);
    dirAdj.get(u)!.push(v);
    
    if (!undirAdj.has(u)) undirAdj.set(u, new Set());
    if (!undirAdj.has(v)) undirAdj.set(v, new Set());
    undirAdj.get(u)!.add(v);
    undirAdj.get(v)!.add(u);
    
    allNodes.add(u);
    allNodes.add(v);
    
    if (!inDegree.has(u)) inDegree.set(u, 0);
    inDegree.set(v, (inDegree.get(v) || 0) + 1);
  }
  
  for (const node of Array.from(allNodes)) {
    if (!inDegree.has(node)) inDegree.set(node, 0);
  }
  
  // 7. Connected components
  const components = getConnectedComponents(allNodes, undirAdj);
  
  const hierarchies: HierarchyGroup[] = [];
  
  for (const comp of components) {
    const compNodes = Array.from(comp);
    
    let possibleRoots = compNodes.filter(n => (inDegree.get(n) || 0) === 0);
    let root = '';
    
    // 8. Cycle detection
    const visited = new Set<string>();
    const recStack = new Set<string>();
    let hasCycle = false;
    for (const node of compNodes) {
      if (!visited.has(node)) {
        if (detectCycle(node, dirAdj, visited, recStack)) {
          hasCycle = true;
          break;
        }
      }
    }
    
    if (possibleRoots.length > 0) {
      possibleRoots.sort();
      root = possibleRoots[0];
    } else {
      compNodes.sort();
      root = compNodes[0];
    }
    
    if (hasCycle) {
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });
    } else {
      // 9. Recursive tree generation & 10. Depth
      const tree: Record<string, any> = {};
      tree[root] = buildTree(root, dirAdj);
      const depth = computeDepth(root, dirAdj);
      
      hierarchies.push({
        root,
        tree,
        depth
      });
    }
  }
  
  hierarchies.sort((a, b) => a.root.localeCompare(b.root));
  
  // 11. Summary
  let total_trees = 0;
  let total_cycles = 0;
  let largest_tree_root: string | null = null;
  let maxDepth = -1;
  
  for (const h of hierarchies) {
    if (h.has_cycle) {
      total_cycles++;
    } else {
      total_trees++;
      const d = h.depth || 0;
      if (d > maxDepth) {
        maxDepth = d;
        largest_tree_root = h.root;
      } else if (d === maxDepth && largest_tree_root) {
        if (h.root < largest_tree_root) {
          largest_tree_root = h.root;
        }
      }
    }
  }
  
  const summary: SummaryData = {
    total_trees,
    total_cycles,
    largest_tree_root
  };
  
  return {
    ...USER_DETAILS,
    hierarchies,
    invalid_entries,
    duplicate_edges,
    summary
  };
}
