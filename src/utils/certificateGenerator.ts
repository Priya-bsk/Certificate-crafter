import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { RecipientData, TemplateField } from '../types';

/** Must match Step 3 field div padding (p-2 = 8px) so drawn text aligns with layout */
const FIELD_PADDING_DISPLAY_PX = 8;

export const generateCertificateCanvas = async (
  templateImage: string,
  recipient: RecipientData,
  fields: TemplateField[],
  layoutDisplayWidth?: number | null,
  _layoutDisplayHeight?: number | null
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const fontSizeRatio =
        layoutDisplayWidth != null && layoutDisplayWidth > 0
          ? img.width / layoutDisplayWidth
          : 1;

      ctx?.drawImage(img, 0, 0);

      fields.forEach((field) => {
        if (ctx && recipient[field.columnKey]) {
          const text = String(recipient[field.columnKey]);
          const fontSizeOriginal = field.fontSize * fontSizeRatio;

          let fontStyle = '';
          if (field.isBold) fontStyle += 'bold ';
          if (field.isItalic) fontStyle += 'italic ';
          ctx.font = `${fontStyle}${fontSizeOriginal}px ${field.fontFamily}`;
          ctx.fillStyle = field.color;
          ctx.textBaseline = 'top';
          ctx.textAlign = field.textAlign as CanvasTextAlign;

          const paddingOriginal = FIELD_PADDING_DISPLAY_PX * fontSizeRatio;
          const textWidth = ctx.measureText(text).width;
          const xPos =
            field.textAlign === 'center'
              ? field.x + paddingOriginal + textWidth / 2
              : field.textAlign === 'right'
                ? field.x + paddingOriginal + textWidth
                : field.x + paddingOriginal;
          const yPos = field.y + paddingOriginal;

          ctx.fillText(text, xPos, yPos);
        }
      });

      resolve(canvas);
    };

    img.onerror = () => reject(new Error('Failed to load template image'));
    img.src = templateImage;
  });
};

export const generateAllCertificates = async (
  templateImage: string,
  recipients: RecipientData[],
  fields: TemplateField[],
  onProgress?: (current: number, total: number) => void,
  layoutDisplayWidth?: number | null,
  layoutDisplayHeight?: number | null
): Promise<void> => {
  const zip = new JSZip();
  const total = recipients.length;

  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    onProgress?.(i + 1, total);

    try {
      const canvas = await generateCertificateCanvas(
        templateImage,
        recipient,
        fields,
        layoutDisplayWidth,
        layoutDisplayHeight
      );
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png');
      });
      
      const baseName = String(recipient.Name ?? recipient.name ?? `recipient_${i + 1}`).replace(/[<>:"/\\|?*]/g, '_').trim() || `recipient_${i + 1}`;
      const fileName = `certificate_${i + 1}_${baseName}.png`;
      zip.file(fileName, blob);
    } catch (error) {
      console.error(`Failed to generate certificate for recipient ${i + 1}:`, error);
    }
  }
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'certificates.zip');
};