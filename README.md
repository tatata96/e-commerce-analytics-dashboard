# 📊 E-Commerce Analytics Dashboard

A React dashboard built for a case study. It displays KPI metrics and three charts — a trend line and two bar charts — with consistent cross-chart color mapping for shared labels.

## 🚀 How to Run

**Requirements:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Other scripts:

```bash
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## 🎨 Color Assignment Strategy

Colors are assigned deterministically using a DJB2 hash of the normalized label name (trimmed, lowercased). The hash indexes into a fixed 16-color palette, so the same label always receives the same color — regardless of which charts are visible or in what order they render. This satisfies the requirement that a label like "Amazon" shows the same color in the Availability chart and any other chart it appears in, even as charts appear or disappear dynamically.

To prevent collisions within a single chart (two different labels hashing to the same slot), `createChartColorResolver` is called once at the dashboard boundary with the full set of known labels. It builds a stable `label → color` map by detecting collisions and offsetting conflicting entries. The resolver is then passed down to each chart's data-conversion function, keeping color logic out of the chart components entirely.

## 🏗️ Key Architectural Decisions

**Centralized color resolution at the dashboard boundary.** `createChartColorResolver` in [src/components/chart/chart.utils.ts](src/components/chart/chart.utils.ts) takes all known labels, builds the color map once, and returns a resolver function. Chart components never decide their own colors — they receive pre-colored series data. This makes cross-chart consistency a data concern, not a rendering concern.

**`useEChart` hook for chart lifecycle.** [src/util/hooks/useEChart.ts](src/util/hooks/useEChart.ts) encapsulates ECharts initialization, loading state, and disposal. Both `BarChart` and `LineChart` use it identically, so neither component manages the chart instance directly. Resize handling uses a `ResizeObserver` scoped to the container element.

**Chart components accept `Series[]` with colors baked in.** `BarChart` and `LineChart` share the same `ChartBaseProps` interface (`categories`, `series`, `isLoading`, `isError`). Colors arrive pre-resolved — the components only render what they receive. This keeps the components reusable and free of any mapping logic.

**Loading and error states live in the dashboard, not in the data layer.** `Dashboard.tsx` holds a `viewState` ("success" | "pending" | "error") toggled via the `StatusToggle` component. Each chart receives `isLoading` and `isError` props derived from that state, letting the dashboard coordinate all charts simultaneously without each chart managing its own fetch lifecycle.

**Semantic design tokens only.** All colors used in components reference CSS custom properties defined in [src/styles/colors.css](src/styles/colors.css). No raw hex or RGB values appear in component code. This keeps the visual system consistent and makes theming a single-file change.

## 🛠️ Tech Stack

| Tool         | Version | Purpose              |
| ------------ | ------- | -------------------- |
| React        | 19      | UI                   |
| TypeScript   | 6       | Type safety          |
| Vite         | 8       | Dev server & bundler |
| ECharts      | 6       | Charts               |
| Tailwind CSS | 4       | Styling              |
| Lucide React | latest  | Icons                |

## 📝 Notes

- AI tools used: Claude Code (Anthropic) was used to assist with implementation.
- All data is static mock data defined in `src/data/mockData.json`.
- The `StatusToggle` in the header simulates loading and error states for demo purposes.
