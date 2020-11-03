/**
 * @fileoverview
 * https://source.chromium.org/chromium/chromium/src/+/master:ui/file_manager/file_manager/common/js/files_app_entry_types.js
 * @suppress {externsValidation}
 */

/**
 * @interface
 */
class FilesAppEntry {
  constructor() {
  }
}

/**
 * @interface
 */
class FilesAppDirEntry extends FilesAppEntry {}


/**
 * @implements FilesAppDirEntry
 */
class FakeEntry {}

/**
 * @implements FilesAppDirEntry
 */
class EntryList {
  /**
   * @param {string} label: Label to be used when displaying to user, it should
   *    already translated.
   * @param {VolumeManagerCommon.RootType} rootType root type.
   * @param {!VolumeInfo} volumeInfo
   */
  constructor(label, rootType, volumeInfo) {
    /** @private {string} */
    this.label_ = label;

    /** @private {VolumeManagerCommon.RootType} root type. */
    this.rootType_ = rootType;

    this.children_ = [];

    /** @private {!VolumeInfo} */
    this.volumeInfo_ = volumeInfo;
  }

  /**
   * Removes the first volume with the given type.
   * @param {!VolumeManagerCommon.VolumeType} volumeType desired type.
   * @return {boolean} if entry was removed.
   */
  removeByVolumeType(volumeType) {
    const childIndex = this.children_.findIndex(childEntry => {
      return childEntry.volumeType === volumeType;
    });

    if (childIndex !== -1) {
      this.children_.splice(childIndex, 1);
      return true;
    }
    return false;
  }

  /**
   * @param {!FilesAppEntry} entry
   */
  setPrefix(entry) {
    this.volumeInfo_.prefixEntry = /* @type {!FilesAppEntry} */ (entry);
  }
}
