/**
 * @fileoverview
 * https://source.chromium.org/chromium/chromium/src/+/master:ui/file_manager/externs/volume_info.js
 */

/**
 * Represents each volume, such as "drive", "download directory", each "USB
 * flush storage", or "mounted zip archive" etc.
 * @interface
 */
class VolumeInfo {
  constructor() {
    /** @type {VolumeManagerCommon.VolumeType} */
    this.volumeType;

    /** @type {string} */
    this.volumeId;

    /**  @type {VolumeManagerCommon.Source} */
    this.source;

    /**
     * @type {FilesAppEntry}
     */
    this.prefixEntry;
  }
}
