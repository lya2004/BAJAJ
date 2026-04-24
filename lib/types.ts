export interface InputData {
  data: string[];
}

export interface ApiResponse {
  user_id: string;
  email_id: string;
  college_roll_number: string;
  hierarchies: HierarchyGroup[];
  invalid_entries: string[];
  duplicate_edges: string[];
  summary: SummaryData;
}

export interface HierarchyGroup {
  root: string;
  tree: Record<string, any>;
  has_cycle?: boolean;
  depth?: number;
}

export interface SummaryData {
  total_trees: number;
  total_cycles: number;
  largest_tree_root: string | null;
}
