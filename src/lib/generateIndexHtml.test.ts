import generateIndexHTML from "./generateIndexHtml";

describe("generateIndexHTML", () => {
  it("should generate correct HTML content for given files", () => {
    const files = [
      { name: "file1.jpg", type: "image/jpg" } as File,
      { name: "file2.png", type: "image/png" } as File,
      { name: "file3.mp4", type: "video/mp4" } as File,
    ];
    const sizes = [
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
    ];
    const meta = [
      { rotation: 0, faceCam: false, spacing: 0 },
      { rotation: 0, faceCam: false, spacing: 0 },
      { rotation: 0, faceCam: false, spacing: 0 },
    ];

    const expectedResult = `<!DOCTYPE html>
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
<img id="asset0" src="./asset0.jpg" alt="asset0.jpg" />
<img id="asset1" src="./asset1.png" alt="asset1.png" />
<video id="asset2" src="./asset2.mp4" alt="asset2.mp4" loop="true" autoplay muted />
      </a-assets>
      <a-camera
        position="0 0 0"
        look-controls="enabled: false"
        cursor="fuse: false; rayOrigin: mouse;"
        raycaster="far: 10000; objects: .clickable"
        id="camera"
      ></a-camera>
<a-entity mindar-image-target="targetIndex: 0" id="entity0">
<a-plane
          position="0 0 0"
          rotation="0 0 0"
          width="1"
          height="1"
          id="plane0"
          color="#ffffff"
          src="#asset0"  
        ></a-plane>
</a-entity>
<a-entity mindar-image-target="targetIndex: 1" id="entity1">
<a-plane
          position="0 0 0"
          rotation="0 0 0"
          width="1"
          height="1"
          id="plane1"
          color="#ffffff"
          src="#asset1"  
        ></a-plane>
</a-entity>
<a-entity mindar-image-target="targetIndex: 2" id="entity2">
<a-plane
          position="0 0 0"
          rotation="0 0 0"
          width="1"
          height="1"
          id="plane2"
          color="#ffffff"
          src="#asset2"  
        ></a-plane>
</a-entity>

</a-scene>
    </body>
    </html>
  `;

    const result = generateIndexHTML(files, sizes, meta);
    expect(result).toBe(expectedResult);
  });
});
