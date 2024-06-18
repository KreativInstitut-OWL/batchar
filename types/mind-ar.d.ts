declare module "mind-ar/src/image-target/compiler-base" {
  export class CompilerBase {
    constructor();
    compileTrack(args: any): Promise<any>;
    compileImageTargets(images: any, onProgress: any): Promise<any>;
    exportData(): Promise<any>;
  }
}

declare module "mind-ar/src/image-target/compiler" {
  import { CompilerBase } from "mind-ar/src/image-target/compiler-base";
  export class Compiler extends CompilerBase {
    constructor();
    compileTrack(args: any): Promise<any>;
    compileImageTargets(images: any, onProgress: any): Promise<any>;
    exportData(): Promise<any>;
  }
}
