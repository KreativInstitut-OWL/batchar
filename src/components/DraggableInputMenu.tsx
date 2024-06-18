function DraggableInputMenu({
  index,
  lastIndex,
  removeFile,
  moveFile,
  setMenu,
  uiText,
}: {
  index: number;
  lastIndex: number;
  removeFile: Function;
  moveFile: Function;
  setMenu: Function;
  uiText: {
    move: {
      up: string;
      down: string;
      top: string;
      last: string;
      delete: string;
    };
  };
}) {
  const moveButton = (index: number, newIndex: number) => {
    moveFile(index, newIndex);
    setMenu(false);
  };

  return (
    <div className="draggable-input-options">
      <button onClick={() => moveButton(index, 0)} disabled={index === 0}>
        {uiText.move.top}
        <span className="arrow arrow-top"></span>
      </button>
      <button
        onClick={() => {
          moveFile(index, index - 1);
          setMenu(false);
        }}
        disabled={index === 0}
      >
        {uiText.move.up}
        <span className="arrow arrow-up"></span>
      </button>
      <button
        onClick={() => {
          moveFile(index, index + 1);
          setMenu(false);
        }}
        disabled={index === lastIndex}
      >
        {uiText.move.down}
        <span className="arrow arrow-down"></span>
      </button>
      <button
        onClick={() => {
          moveFile(index, lastIndex);
          setMenu(false);
        }}
        disabled={index === lastIndex}
      >
        {uiText.move.last}
        <span className="arrow arrow-last"></span>
      </button>
      <button onClick={() => removeFile(index)}>
        {uiText.move.delete}
        <span className="arrow arrow-delete"></span>
      </button>
    </div>
  );
}

export default DraggableInputMenu;
