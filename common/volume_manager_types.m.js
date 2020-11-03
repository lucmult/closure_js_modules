/**
 * @fileoverview
 * https://source.chromium.org/chromium/chromium/src/+/master:ui/file_manager/base/js/volume_manager_types.js
 * @suppress {uselessCode} Temporary suppress because of the export for the
 *   namespace.
 */

/**
 * Namespace for common types.
 */
const VolumeManagerCommon = {};

/**
 * Type of a root directory.
 * @enum {string}
 * @const
 */
VolumeManagerCommon.RootType = {
  // Root for a downloads directory.
  DOWNLOADS: 'downloads',

  // Root for a drive volume.
  DRIVE: 'drive',
};


/**
 * The type of each volume.
 * @enum {string}
 * @const
 */
VolumeManagerCommon.VolumeType = {
  DRIVE: 'drive',
  DOWNLOADS: 'downloads',
};

/**
 * Source of each volume's data.
 * @enum {string}
 * @const
 */
VolumeManagerCommon.Source = {
  FILE: 'file',
  DEVICE: 'device',
  NETWORK: 'network',
  SYSTEM: 'system'
};

export {VolumeManagerCommon};
