function Preview({
  src,
  alt,
  fileType,
  id,
}: {
  src: string;
  alt: string;
  fileType: string;
  id: string;
}) {
  return (
    <div className="preview">
      {fileType.includes("image") && <img id={id} src={src} alt={alt} />}
      {fileType.includes("video") && <video id={id} src={src} controls />}
    </div>
  );
}

export default Preview;
