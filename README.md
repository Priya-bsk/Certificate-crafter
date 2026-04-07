# 🎓 Certificate Crafter

A modern web application for generating personalized certificates in bulk — quickly, accurately, and entirely in the browser.

**Certificate Crafter** eliminates manual certificate editing by allowing you to upload recipient data, design a template visually, and export high-quality certificates in a single click.

[Craft your certificates here](https://certificate-crafter.vercel.app/)

---

## 🚀 Overview

Certificate Crafter provides an intuitive, step-by-step workflow to:

- Import recipient data from CSV or Excel files  
- Upload a certificate template image  
- Map data fields to draggable text elements  
- Preview certificates dynamically  
- Generate and download all certificates as PNG files in a ZIP archive  

All processing is performed **client-side**, ensuring speed, privacy, and zero backend dependency.

---

## ✨ Features

### 🧭 Guided Workflow
A structured 5-step process:
1. Data Upload  
2. Template Upload  
3. Layout Design  
4. Preview  
5. Generate  

### 📂 Data Support
- CSV (`.csv`)
- Excel (`.xlsx`, `.xls`)
- Automatic filtering of empty rows  

### 🎨 Visual Layout Designer
- Drag-and-drop field placement  
- Real-time positioning on template  
- Interactive editing  

### 🔤 Advanced Typography Controls
- Font family selection  
- Font size adjustment  
- Color customization  
- Bold / Italic styling  
- Text alignment (left, center, right)  

### 📐 Accurate Rendering System
- Coordinate scaling ensures **pixel-perfect consistency**  
  between on-screen preview and exported certificates  

### 📦 Batch Export
- Generate one certificate per recipient  
- Export all certificates as a single `certificates.zip`  
- High-quality PNG output  

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript  
- **Build Tool:** Vite 5  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Data Parsing:** PapaParse (CSV), SheetJS/xlsx (Excel)  
- **File Generation:** JSZip + FileSaver  
- **UI Interaction:** react-draggable  

---

## 📁 Project Structure

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

### 💻 Usage Guide

### 1. Upload Recipient Data
- Supported formats: **CSV, XLSX, XLS**
- Max file size: **5 MB**
- First row must contain **column headers**


### 2. Upload Template
- Supported formats: **PNG, JPG, JPEG**
- Minimum resolution: **800 × 600**
- Max file size: **5 MB**


### 3. Design Layout
- Drag column names onto the template  
- Adjust position, font, and styling  
- Fine-tune alignment and appearance  


### 4. Preview Certificates
- Select any recipient  
- Validate layout before generation  


### 5. Generate Certificates
- Bulk generation of **PNG files**  
- Automatic **ZIP download**  


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

---
## Browser/Runtime Behavior

- All processing is client-side in the browser.
- No backend is required.
- Uploaded data and generated certificates are not sent to a server by this app.
  
---
## Known Limitations

- Very large datasets may increase generation time and browser memory usage.
- Text wrapping and multiline layout are not currently implemented.
- If the data file has unusual encoding or malformed headers, parsing may fail.

---
## Future Improvements

- Custom output resolution and DPI
- Text wrapping / max-width constraints
- Multi-template support
- Save/load layout presets
- Better validation and error reporting
- Optional PDF export

