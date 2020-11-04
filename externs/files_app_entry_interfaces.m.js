/**
 * @fileoverview
 * These interfaces have to be extracted from the
 * common/files_app_entry_types.m.js because some externs refer to them.
 *
 * Note that the FakeEntry wasn't an interface, but we created one to be able to
 * refer to it in the externs.
 */

/**
 * @interface
 */
export class FilesAppEntry {
  constructor() {
  }
}

/**
 * @interface
 */
export class FilesAppDirEntry extends FilesAppEntry {}

/**
 * @interface
 */
export class FakeEntry extends FilesAppDirEntry {}
