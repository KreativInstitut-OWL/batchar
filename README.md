# KIO BatchAR

BatchAR enables you to create augmented reality (AR) experiences that can be
hosted on your own server. No coding required: just drag and drop your tracking
markers and the corresponding assets that should be displayed when scanned into
the web app and click the "Batch" button. All the files will be processed
locally, in your browser and bundled into a zip file. After you upload the
contents of the unzipped folder into the root directory of your web server, the
experience will be available at your domain. Visit it with your smartphone,
allow camera access and scan your tracking markers.

Currently `png`, `jpg`, `jpeg`, `webp`, `mp4` & `mpeg` file formats are
supported. (Only the mentioned image formats work as tracking markers, though).
BatchAR has language support for German and English.

This repository hosts the open source version of KIO BatchAR. Our official
deployment of the app (with nothing more than a little bit of branding added)
is hosted here: https://batchar.kreativ.institute. Feel free to try it out.

## Development Guide

### Get the dev environment working

Since the app is built with react, clone the repo and run `npm install` if you
work with docker locally, `docker compose up -d` should run the BatchAR on
localhost:8000. Otherwise, `npm run dev` will do the trick as well.

### Create production build

To build the App, run `npm run build`. Since BatchAR by itself is a static app,
you can deploy the contents of the `dist` folder to any web server and it
should work. To preview the built version locally, run `npm run preview`.

### Directory Structure

- `/public` contains public assets.
  - `/public/js-includes` includes the necessary js libraries (a-frame and
    MindAR) that the finished AR experience will need. You could load those via
    a CDN, but to comply with EU regulation, we opted to just include the
    files.
- `/src` has the actual app. Here you will find components, helper functions,
  assets, tests etc.
  - `/src/content` contains the content that gets displayed in the app:
  - `/src/content/content.ts` holds the description text
  - `/src/content/ui.ts` holds the text of all ui elements. Currently, only
    German and English are supported, but feel free to contribute another
    language.
  - `/src/content/supported-upload-media.ts` controls wich media types are
    allowed for upload and processing.

## Contributions

You can modify the code to your hearts content. If there is a cool feature you
implemented, feel free to make a pull request.

Also, adding another language to the UI would be highly appreciated.

## Credits

This app is built with react using vite and relies heavily on
[MindAR](https://github.com/hiukim/mind-ar-js) by [ HiuKim Yuen
](https://github.com/hiukim). Huge thanks to him for his outstanding work! The
drag-and-drop functionality is achieved via atlassians [Pragmatic Drag &
Drop](https://github.com/atlassian/pragmatic-drag-and-drop).

BatchAR was made with love by [Conrad Dreyer](https://conraddreyer.com) at
[KIO](https://kreativ.institute).
