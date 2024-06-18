export default function generateIndexHTML(
  files: File[],
  sizes: { height: number; width: number }[],
  meta: { rotation: number; faceCam: boolean; spacing: number }[],
) {
  function getPositions(): number[] {
    const flatOffset = 0;
    const diagonalOffset = 0.5;
    const perpendicularOffset = 0.75;

    const newPositions: number[] = meta.map((entry) => {
      const rotation = entry.rotation;
      const spacing = entry.spacing / 100;
      if (rotation == 0) {
        return flatOffset + spacing;
      }
      if (rotation === 45) {
        return diagonalOffset + spacing;
      }
      if (rotation === 90) {
        return perpendicularOffset + spacing;
      }
      return 0;
    });
    return newPositions;
  }
  const positions = getPositions();

  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>AR Experience</title>
<script src="./aframe.min.js"></script>
<script src="./mindar-image-aframe.prod.js"></script>
    <script>
    AFRAME.registerComponent('look-at', {
  schema: { type: 'selector' },

  init: function () {},

  tick: function () {
    this.el.object3D.lookAt(this.data.object3D.position)
  }
})

    </script>
    </head>
    <body>
<a-scene
      mindar-image="imageTargetSrc: ./targets.mind;"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
${files
  .map((file, index) => {
    const id = `asset${index}`;
    const src = `${id}.${file.name.split(".").pop()}`;
    if (file.type.includes("image")) {
      return `<img id="${id}" src="./${src}" alt="${src}" />`;
    }
    if (file.type.includes("video")) {
      return `<video id="${id}" src="./${src}" alt="${src}" loop="true" autoplay muted />`;
    }
  })
  .join("\n")}
      </a-assets>
      <a-camera
        position="0 0 0"
        look-controls="enabled: false"
        cursor="fuse: false; rayOrigin: mouse;"
        raycaster="far: 10000; objects: .clickable"
        id="camera"
      ></a-camera>
${files
  .map((_, index) => {
    return `<a-entity mindar-image-target="targetIndex: ${index}" id="entity${index}">
<a-plane
          position="0 0 ${positions[index]}"
          rotation="${meta[index].rotation} 0 0"
          width="${sizes[index].width}"
          height="${sizes[index].height}"
          id="plane${index}"
          color="#ffffff"
          src="#asset${index}" ${
            meta[index].faceCam ? `look-at="#camera"` : " "
          }
        ></a-plane>
</a-entity>`;
  })
  .join("\n")}

</a-scene>
    </body>
    </html>
  `;
  return htmlContent;
}
