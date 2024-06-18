const ui = {
  de: {
    cta: "Batch",
    markers: "Marker",
    markerDescriptor: "Tracking-Marker für Asset ",
    image: "Bild",
    images: "Bilder",
    file: "Datei",
    files: "Dateien",
    asset: "Asset",
    assets: "Assets",
    dropzone: "Ziehe Deine Dateien per Drag & Drop hierher",
    select: "Wähle Deine Dateien",
    calculatingMarkers: "Berechne Tracking-Marker...",
    bundleFiles: "AR-Batch packen...",
    assetOptions: {
      heading: "Darstellungsoptionen",
      angle: "Winkel Asset zu Marker",
      flat: "Flach (0°)",
      diagonally: "Schräg (45°)",
      perpendicular: "Senkrecht (90°)",
      faceCam: "Asset Richtung Kamera ausrichten",
      spacing: "Abstand ziwschen Asset und Marker",
    },
    move: {
      up: "Nach oben bewegen",
      down: "Nach unten bewegen",
      top: "An den Anfang bewegen",
      last: "An das Ende bewegen",
      delete: "Löschen",
    },
    deleteAll: "Alle löschen",
    errors: {
      noInput: "Bitte lade mindestens ein Asset und einen Marker hoch",
      missingPair: "Bitte lade für jedes Asset einen Marker hoch",
      notValid:
        "Dieses Dateiformat wird momentan nicht unterstützt. Die folgenden Dateien wurden nicht hochgeladen:",
    },
  },
  en: {
    cta: "Batch",
    markers: "Markers",
    markerDescriptor: "Tracking marker for file ",
    image: "Image",
    images: "Images",
    file: "File",
    files: "Files",
    asset: "Asset",
    assets: "Assets",
    dropzone: "Drop your files here",
    select: "Select files manually",
    calculatingMarkers: "Calculating tracking markers...",
    bundleFiles: "Batching AR files...",
    assetOptions: {
      heading: "Display options",
      angle: "Angle between Asset and Marker",
      flat: "Flat (0°)",
      diagonally: "Angled (45°)",
      perpendicular: "Vertical (90°)",
      faceCam: "Asset faces camera",
      spacing: "Space between Asset and Marker",
    },
    move: {
      up: "Move up",
      down: "Move down",
      top: "Move to the top",
      last: "Move to the end",
      delete: "Delete",
    },
    deleteAll: "Delete all",
    errors: {
      noInput: "Please upload at least one asset and one marker",
      missingPair: "Please upload a marker for each asset",
      notValid:
        "This file type is currently not supported. The following files were not uploaded: ",
    },
  },
};

export default ui;