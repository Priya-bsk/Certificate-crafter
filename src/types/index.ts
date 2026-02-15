export interface RecipientData {
  [key: string]: string | number;
}

export interface TemplateField {
  id: string;
  columnKey: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
}

export interface CertificateData {
  recipients: RecipientData[];
  columns: string[];
  template: string | null;
  /** Natural width of template image (for consistent layout/generation) */
  templateWidth: number | null;
  /** Natural height of template image */
  templateHeight: number | null;
  /** Pixel size of template as shown in Step 3 (for ratio: original/display) */
  layoutDisplayWidth: number | null;
  layoutDisplayHeight: number | null;
  fields: TemplateField[];
  selectedPreviewRow: number;
}

export interface StepProps {
  data: CertificateData;
  onDataChange: (data: Partial<CertificateData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onGoHome?: () => void;
}