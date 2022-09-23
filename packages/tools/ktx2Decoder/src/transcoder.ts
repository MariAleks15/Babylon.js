/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import type { WASMMemoryManager } from "./wasmMemoryManager";
import type { KTX2FileReader, IKTX2_ImageDesc } from "./ktx2FileReader";

/**
 * @internal
 */
export enum sourceTextureFormat {
    ETC1S,
    UASTC4x4,
}

/**
 * @internal
 */
export enum transcodeTarget {
    ASTC_4x4_RGBA,
    BC7_RGBA,
    BC3_RGBA,
    BC1_RGB,
    PVRTC1_4_RGBA,
    PVRTC1_4_RGB,
    ETC2_RGBA,
    ETC1_RGB,
    RGBA32,
}

/**
 * @internal
 */
export class Transcoder {
    public static CanTranscode(src: sourceTextureFormat, dst: transcodeTarget, isInGammaSpace: boolean): boolean {
        return false;
    }

    public static Name = "Transcoder";

    public getName(): string {
        return Transcoder.Name;
    }

    public initialize(): void {}

    public needMemoryManager(): boolean {
        return false;
    }

    public setMemoryManager(memoryMgr: WASMMemoryManager): void {}

    public transcode(
        src: sourceTextureFormat,
        dst: transcodeTarget,
        level: number,
        width: number,
        height: number,
        uncompressedByteLength: number,
        ktx2Reader: KTX2FileReader,
        imageDesc: IKTX2_ImageDesc | null,
        encodedData: Uint8Array
    ): Promise<Uint8Array | null> {
        return Promise.resolve(null);
    }
}
