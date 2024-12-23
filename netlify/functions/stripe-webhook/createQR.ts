import QRCode from 'qrcode';

export async function createQR(text: string): Promise<string | undefined> {
  try {
    return await QRCode.toDataURL(text, {
      width: 250,
      margin: 2,
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return undefined;
  }
}
