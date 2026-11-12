import { DOWNLOAD_REVOKE_DELAY } from '../constants/browser';
export function downloadFile(contents: BlobPart, filename: string, mimeType: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: mimeType }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), DOWNLOAD_REVOKE_DELAY);
}
