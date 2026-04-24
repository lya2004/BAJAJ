# SRM Full Stack Engineering Challenge

A complete winning submission for the SRM Full Stack Engineering Challenge. 
This application features a highly performant hierarchical data analysis engine wrapped in a stunning, modern dark-themed UI.

## Overview

The goal of this project is to analyze directed edges, construct trees, detect cycles, and summarize graph structures.

**Frontend URL**: [https://srm-challenge-app.vercel.app](https://srm-challenge-app.vercel.app)
**Backend API Base URL**: [https://srm-challenge-app.vercel.app](https://srm-challenge-app.vercel.app)
**Endpoint Evaluator Tests**: [https://srm-challenge-app.vercel.app/bfhl](https://srm-challenge-app.vercel.app/bfhl)

### Why Same URL Works
By using Next.js App Router, the application acts as a true full-stack monolith.
- `app/page.tsx` renders the React frontend.
- `app/api/bfhl/route.ts` provides the serverless backend endpoint natively on the same deployment infrastructure (Vercel).

## Run Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
npm run start
```

## API Docs

### `POST /api/bfhl`
Accepts a list of edges and returns a structured analysis.

**Request:**
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

**Response:**
```json
{
  "user_id": "lyapuri_30012004",
  "email_id": "lp8271@srmist.edu.in",
  "college_roll_number": "RA2311026010449",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": {
            "D": {}
          },
          "C": {}
        }
      },
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

## Logic Explanation
1. **Sanitize & Validate**: The system parses input, enforcing the `A-Z` strict format and dropping loops.
2. **First-Parent Constraint**: Only the first valid parent for a given node is accepted. Subsequent conflicting claims are ignored.
3. **Graph Construction**: Builds an undirected graph for component detection and a directed graph for topology.
4. **Cycle Detection**: Uses Depth-First Search with a recursion stack.
5. **Tree Gen & Depth**: Recursively builds nested JSON objects matching the structural requirement. Computes longest path depth.

Deployed seamlessly to Vercel with zero config.
