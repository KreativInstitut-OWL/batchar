import { useRef, useState, useEffect } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Preview from "./Preview";
import DraggableInputMenu from "./DraggableInputMenu";
import AssetOptions from "./AssetOptions";
import { useLanguage } from "../LanguageProvider";
import ui from "../content/ui";
import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

function DraggableInput({
  id,
  index,
  lastIndex,
  file,
  dragIndex,
  setDragIndex,
  removeFile,
  moveFile,
  updateFileMetadata,
  isAssetSection,
}: {
  id: string;
  index: number;
  lastIndex: number;
  file: File;
  dragIndex: number | null;
  setDragIndex: Function;
  dragStatus: boolean;
  setDragStatus: Function;
  removeFile: Function;
  moveFile: Function;
  updateFileMetadata: Function;
  isAssetSection: boolean;
}) {
  const { language } = useLanguage();
  const uiText = language === "en" ? ui.en : ui.de;

  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [edge, setEdge] = useState<Edge | null>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [assetOptions, setAssetOptions] = useState<boolean>(false);
  const [imageRotation, setImageRotation] = useState<number>(0);
  const [faceCamera, setFaceCamera] = useState<boolean>(false);
  const [spacing, setSpacing] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const newMetadata = {
      rotation: imageRotation,
      faceCam: faceCamera,
      spacing: spacing,
    };
    updateFileMetadata(id, newMetadata);
  }, [imageRotation, faceCamera, spacing]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      onDragStart: () => {
        setDragging(true);
        setDragIndex(index);
      },
      onDrop: () => {
        setDragging(false);
        setDragIndex(null);
      },
    });
  }, [dragIndex, index]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: ({ input, element }) => {
        const data = {};
        return attachClosestEdge(data, {
          input,
          element,
          allowedEdges: ["top", "bottom"],
        });
      },
      onDrag: (args) => {
        const thisEdge = extractClosestEdge(args.self.data);
        setEdge(thisEdge);
      },
      onDragEnter: (args) => {
        setIsDraggedOver(true);
        const thisEdge = extractClosestEdge(args.self.data);
        setEdge(thisEdge);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
        setEdge(null);
      },
      onDrop: (args) => {
        setIsDraggedOver(false);
        const thisEdge = extractClosestEdge(args.self.data);
        const dropIndex = () => {
          if (index === lastIndex && thisEdge === "top") {
            return index - 1;
          }
          if (index === lastIndex && thisEdge === "bottom") {
            return index;
          }
          if (thisEdge === "top") {
            return index;
          }
          if (thisEdge === "bottom") {
            return index + 1;
          }
        };

        moveFile(dragIndex, dropIndex());
        setEdge(null);
      },
    });
  }, [dragIndex, index]);

  return (
    <div
      className={`draggable-input ${dragging ? "dragging" : ""} ${
        isDraggedOver ? "isDraggedOver" : ""
      } ${edge ? "edge-" + edge : ""}`}
      ref={ref}
      onClick={() => {
        menu && setMenu(false);
      }}
    >
      <div className="draggable-input-header">
        <p>
          {isAssetSection ? uiText.asset : uiText.markerDescriptor} {index + 1}
        </p>
        {isAssetSection && (
          <button
            className={`draggable-input-toggle-options ${
              assetOptions ? "active" : ""
            }`}
            onClick={() => {
              setAssetOptions(!assetOptions);
              setMenu(false);
            }}
          >
            Options
          </button>
        )}
        <button
          className={`draggable-input-toggle-options ${menu ? "active" : ""}`}
          onClick={() => {
            setMenu(!menu);
            setAssetOptions(false);
          }}
        >
          ...
        </button>
      </div>
      <Preview src={id} id={id} alt={file.name} fileType={file.type} />
      {isAssetSection && assetOptions && (
        <AssetOptions
          uiText={uiText}
          imageRotation={imageRotation}
          setImageRotation={setImageRotation}
          spacing={spacing}
          setSpacing={setSpacing}
          faceCamera={faceCamera}
          setFaceCamera={setFaceCamera}
        />
      )}
      {menu && (
        <DraggableInputMenu
          index={index}
          lastIndex={lastIndex}
          removeFile={removeFile}
          moveFile={moveFile}
          setMenu={setMenu}
          uiText={uiText}
        />
      )}
    </div>
  );
}

export default DraggableInput;
