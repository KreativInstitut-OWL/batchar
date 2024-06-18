export type FileType = {
  id: string;
  file: File;
  meta?: {
    rotation: number;
    faceCam: boolean;
    spacing: number;
  };
};

export type ErrorState = {
  [key: string]: string;
};

export type UiText = {
  [lang: string]: UiTextLang;
};

export type UiTextLang = {
  cta: string;
  markers: string;
  markerDescriptor: string;
  image: string;
  images: string;
  file: string;
  files: string;
  asset: string;
  assets: string;
  dropzone: string;
  select: string;
  calculatingMarkers: string;
  bundleFiles: string;
  assetOptions: {
    heading: string;
    angle: string;
    flat: string;
    diagonally: string;
    perpendicular: string;
    faceCam: string;
    spacing: string;
  };
  move: {
    up: string;
    down: string;
    top: string;
    last: string;
    delete: string;
  };
  deleteAll: string;
  errors: {
    noInput: string;
    missingPair: string;
    notValid: string;
  };
};
