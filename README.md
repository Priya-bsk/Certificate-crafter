# Certificate Crafter

A web app to generate personalized certificates in bulk.

Certificate Crafter lets you:
- upload recipient data from CSV/Excel,
- upload a certificate template image,
- map data columns to draggable text fields,
- preview any recipient certificate,
- export all certificates as high-quality PNG files in one ZIP download.

## Features

- 5-step guided workflow:
  - Data upload
  - Template upload
  - Layout design
  - Preview
  - Generate
- CSV and Excel input support (`.csv`, `.xlsx`, `.xls`)
- Drag-and-drop field placement on template
- Field styling controls:
  - font family
  - font size
  - color
  - bold/italic
  - left/center/right text alignment
- Coordinate scaling system for consistent placement between on-screen layout and exported image
- Batch export to ZIP (`certificates.zip`) with one PNG per recipient

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- Lucide React (icons)
- PapaParse (CSV parsing)
- SheetJS/xlsx (Excel parsing)
- JSZip + FileSaver (ZIP creation and download)
- react-draggable (layout interaction)

## Project Structure

```text
project/
├─ src/
│  ├─ components/
│  │  ├─ LandingPage.tsx
│  │  ├─ common/
│  │  │  ├─ FileUpload.tsx
│  │  │  └─ ProgressBar.tsx
│  │  └─ steps/
│  │     ├─ Step1DataUpload.tsx
│  │     ├─ Step2TemplateUpload.tsx
│  │     ├─ Step3LayoutDesign.tsx
│  │     ├─ Step4Preview.tsx
│  │     └─ Step5Generate.tsx
│  ├─ types/
│  │  └─ index.ts
│  ├─ utils/
│  │  ├─ fileHandlers.ts
│  │  └─ certificateGenerator.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ package.json
└─ ...
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```


### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## How to Use

1. Upload recipient data
   - Accepted formats: CSV, XLSX, XLS
   - Max file size: 5 MB
   - Empty rows are filtered out automatically.
2. Upload certificate template image
   - Accepted formats: PNG, JPG, JPEG
   - Max file size: 5 MB
   - Minimum resolution: 800x600
3. Design layout
   - Drag a column name onto the certificate.
   - Select a field to edit typography and alignment.
   - Reposition fields directly on the template.
4. Preview
   - Choose any recipient row.
   - Refresh preview to validate final output.
5. Generate
   - Creates one PNG per recipient.
   - Downloads a `certificates.zip` file.

## Input Data Format

Use column headers in the first row.

Example CSV:

```csv
Name,Event,Date,Rank
Name1,Data Analytics Hackathon,2026-04-01,1
Name2,Data Analytics Hackathon,2026-04-01,2
```

Notes:
- Any column can be mapped to a certificate text field.
- Preview dropdown uses `Name` or `name` when present.
- If `Name` is missing, fallback labels are used in UI and filenames.

## Output Naming

Generated files are named like:

```text
certificate_1_Name1.png
certificate_2_Name2.png
```

Invalid filename characters are sanitized automatically.

## Browser/Runtime Behavior

- All processing is client-side in the browser.
- No backend is required.
- Uploaded data and generated certificates are not sent to a server by this app.

## Known Limitations

- Very large datasets may increase generation time and browser memory usage.
- Text wrapping and multiline layout are not currently implemented.
- If the data file has unusual encoding or malformed headers, parsing may fail.

## Future Improvements

- Custom output resolution and DPI
- Text wrapping / max-width constraints
- Multi-template support
- Save/load layout presets
- Better validation and error reporting
- Optional PDF export

