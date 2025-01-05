export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const convertFileToBase64 = (
  file: File,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const base64ToFile = (
  base64: string,
  defaultFileName: string = 'uploadedFile.jpg',
): File => {
  const mimeType = base64.match(/data:(.*?);/)?.[1] || 'image/jpeg';

  const fileName = base64.match(/name=([^;]+);?/)?.[1] || defaultFileName;

  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};
