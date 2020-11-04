/**
 * @fileoverview
 * https://source.chromium.org/chromium/chromium/src/+/master:ui/file_manager/externs/volume_info.js
 */

import * as wrappedVolumeManagerCommon from '../common/volume_manager_types.m.js';
const {VolumeManagerCommon} = wrappedVolumeManagerCommon;
import {FilesAppEntry} from './files_app_entry_interfaces.m.js';

/**
 * Represents each volume, such as "drive", "download directory", each "USB
 * flush storage", or "mounted zip archive" etc.
 * @interface
 */
export class VolumeInfo {
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
