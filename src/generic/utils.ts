import { Readable } from 'stream';

export function base64ToBlob(base64: string): Blob {
  const binaryString = window.atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const byteArrays = [];

  for (let offset = 0; offset < binaryString.length; offset += 512) {
    const slice = binaryString.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeString });
  return blob;
}

export function bufferToStream(buffer: Buffer): Readable {
  const stream: Readable = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
