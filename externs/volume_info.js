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

    /**
     * The volume's fake entries such as Recent, Offline, Shared with me, etc...
     * in Google Drive.
     * @type {Object<!FakeEntry>}}
     */
    this.fakeEntries;

    /**  @type {VolumeManagerCommon.Source} */
    this.source;
  }
}
