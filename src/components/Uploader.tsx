import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import DraggableInput from "./DraggableInput";
import Dropzone from "./Dropzone";
import { FileType } from "../../types/types";
import { validExtensions } from "../content/supported-upload-media";

function Uploader({
  files,
  setFiles,
  sectionName,
  isAssetSection,
}: {
  files: FileType[];
  setFiles: Dispatch<SetStateAction<FileType[]>>;
  sectionName: string;
  isAssetSection: boolean;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragStatus, setDragStatus] = useState<boolean>(false);

  const addFiles = (files: FileList | File[]) => {
    if (!files) return;

    const fileList = Array.from(files)
      .filter((file) => {
        const parts = file.name.split(".");
        const extension = parts.length > 1 ? parts.pop()!.toLowerCase() : "";
        return validExtensions.includes(extension);
      })
      .map((file) => ({
        id: URL.createObjectURL(file),
        file,
        meta: {
          rotation: 0,
          faceCam: false,
          spacing: 0,
        },
      }));

    setFiles((prevFiles: FileType[]) => [...prevFiles, ...fileList]);
  };

  function moveFile(startIndex: number | null, finishIndex: number) {
    if (
      startIndex === null ||
      startIndex < 0 ||
      startIndex >= files.length ||
      finishIndex < 0 ||
      finishIndex >= files.length ||
      startIndex === finishIndex
    ) {
      return;
    }

    setFiles((prevFiles: FileType[]) => {
      const newFiles = [...prevFiles];
      const targetFile = newFiles.splice(startIndex, 1)[0];
      newFiles.splice(finishIndex, 0, targetFile);
      return newFiles;
    });
  }

  function removeFile(index: number) {
    setFiles((prevFiles: FileType[]) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  }

  const updateFileMetadata = (
    id: string,
    metadata: { rotation: number; faceCam: boolean; spacing: number },
  ) => {
    setFiles((prevFiles) => {
      return prevFiles.map((file) => {
        if (file.id === id) {
          return {
            ...file,
            meta: {
              ...file.meta,
              ...metadata,
            },
          };
        }
        return file;
      });
    });
  };

  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => {
        setIsDraggedOver(false);
      },
    });
  }, []);

  return (
    <div
      className={`markers upload-form ${isDraggedOver ? "isDraggedOver" : ""}`}
    >
      <h2>{sectionName}</h2>
      {files != null &&
        files.map(({ id, file }, index) => (
          <DraggableInput
            key={id}
            index={index}
            lastIndex={files.length - 1}
            id={id}
            file={file}
            dragIndex={dragIndex}
            setDragIndex={setDragIndex}
            dragStatus={dragStatus}
            setDragStatus={setDragStatus}
            moveFile={moveFile}
            updateFileMetadata={updateFileMetadata}
            removeFile={removeFile}
            isAssetSection={isAssetSection}
          />
        ))}
      <Dropzone addFiles={addFiles} isAssetSection={isAssetSection} />
    </div>
  );
}

export default Uploader;
