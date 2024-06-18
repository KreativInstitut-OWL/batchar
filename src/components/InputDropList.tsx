import { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function InputDropList() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      throw new Error("ref not set correctly");
    }

    return dropTargetForElements({
      element: el,
    });
  }, []);

  return <div ref={ref}>Drop elements on me!</div>;
}

export default InputDropList;
