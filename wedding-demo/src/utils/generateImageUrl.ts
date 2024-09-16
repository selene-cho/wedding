export default function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: {
  filename: string;
  format: 'jpg' | 'webp';
  option?: string;
}) {
  return `https://res.cloudinary.com/dujczvb62/image/upload/${option}/v1726324004/wedding-demo/${format}/${filename}.${format}`;
}
