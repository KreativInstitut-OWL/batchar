import { useEffect, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { UiTextLang } from "../../types/types";

function AssetOptions({
  uiText,
  imageRotation,
  setImageRotation,
  faceCamera,
  setFaceCamera,
  spacing,
  setSpacing,
}: {
  uiText: UiTextLang;
  imageRotation: number;
  setImageRotation: Function;
  faceCamera: boolean;
  setFaceCamera: Function;
  spacing: number;
  setSpacing: Function;
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      canDrag: () => false,
    });
  }, []);

  const handleImageRotation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rotation = parseInt(event.target.value);
    setImageRotation(rotation);
  };

  const handleFaceCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaceCamera(event.target.checked);
  };

  const handleSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
    const elementSpacing = parseInt(event.target.value);
    setSpacing(elementSpacing);
  };

  return (
    <div ref={ref}>
      <div className="draggable-input-options asset-options">
        <h4>{uiText.assetOptions.heading}</h4>
        <ul>
          <li className={faceCamera ? "disabled" : ""}>
            {uiText.assetOptions.angle}
            <select
              disabled={faceCamera}
              name="rotation"
              onChange={handleImageRotation}
              value={imageRotation}
            >
              <option value="0">{uiText.assetOptions.flat}</option>
              <option value="45">{uiText.assetOptions.diagonally}</option>
              <option value="90">{uiText.assetOptions.perpendicular}</option>
            </select>
          </li>
          <li>
            <label htmlFor="face-camera">{uiText.assetOptions.faceCam}</label>
            <input
              type="checkbox"
              name="face-camera"
              onChange={handleFaceCamera}
              checked={faceCamera}
            />
          </li>
          <li>
            <label htmlFor="spacing">
              {uiText.assetOptions.spacing}: {spacing}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              name="spacing"
              onChange={handleSpacing}
              value={spacing}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AssetOptions;
