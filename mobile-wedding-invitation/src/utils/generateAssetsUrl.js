export default function generateAssetsUrl({
  filename,
  format,
  small = false,
  music = false,
}) {
  const imageUrl = `${import.meta.env.VITE_CLOUDFRONT_URL}/images/${filename}${small ? '_w360' : ''}.${format}`;
  const musicUrl = `${import.meta.env.VITE_CLOUDFRONT_URL}/music/${filename}.${format}`;

  return music ? musicUrl : imageUrl;
}
