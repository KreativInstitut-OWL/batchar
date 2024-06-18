import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "../LanguageProvider";
import ui from "../content/ui";
import {
  containsFiles,
  getFiles,
} from "@atlaskit/pragmatic-drag-and-drop/external/file";
import { dropTargetForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter";
import { acceptedUploadMedia } from "../content/supported-upload-media";

function Dropzone({
  addFiles,
  isAssetSection,
}: {
  addFiles: (files: FileList | File[]) => void;
  isAssetSection: boolean;
}) {
  const { language } = useLanguage();
  const uiText = language === "en" ? ui.en : ui.de;

  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return; // Properly handle the case where files is null
    addFiles(files);
  };

  const handleFileDrop = (files: File[]) => {
    addFiles(files);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForExternal({
      element: el,
      canDrop: containsFiles,
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
      },
      onDrop: (source) => {
        const files = getFiles(source);
        const notValid: string[] = [];
        const validFiles = files.filter((file) => {
          const validAsset = acceptedUploadMedia.includes(file.type);
          const noValidMarker = !isAssetSection && !file.type.includes("image");
          const valid = validAsset && !noValidMarker;
          if (!valid) {
            notValid.push(file.name);
          }
          return valid;
        });

        handleFileDrop(validFiles);
        setIsDraggedOver(false);
        notValid.length != 0 &&
          alert(uiText.errors.notValid + notValid.join(", "));
      },
    });
  }, []);

  return (
    <div
      className={`dropzone  ${isDraggedOver ? "has-file-over-it" : ""}`}
      ref={ref}
    >
      <p>{uiText.dropzone}</p>
      <label>
        {uiText.select}
        <input
          type="file"
          multiple
          accept={acceptedUploadMedia
            .map((item) => {
              return item;
            })
            .join(",")}
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}

export default Dropzone;
