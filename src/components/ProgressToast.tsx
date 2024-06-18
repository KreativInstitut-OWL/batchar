function ProgressToast({
  progress,
  uiText,
}: {
  progress: number;
  uiText: { calculatingMarkers: string; bundleFiles: string };
}) {
  return (
    <div
      className={`info info-progress ${progress > 99 ? "fade-out" : "fade-in"}`}
    >
      <p>{progress < 50 ? uiText.calculatingMarkers : uiText.bundleFiles}</p>
      <p>{progress.toFixed(2)}%</p>

      <progress value={progress} max={100}></progress>
    </div>
  );
}
export default ProgressToast;
