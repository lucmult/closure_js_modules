# Reproduce Closure Compilation error

This reproduces the compilation error that we're facing in ChromeOS
File Manager.
https://chromium-review.googlesource.com/c/chromium/src/+/2515805

```
../../third_party/closure_compiler/compiler/compiler.jar --jscomp_error=accessControls --jscomp_error=checkTypes --jscomp_error=checkVars --jscomp_error=constantProperty --jscomp_error=deprecated --jscomp_error=externsValidation --jscomp_error=globalThis --jscomp_error=invalidCasts --jscomp_error=misplacedTypeAnnotation --jscomp_error=missingProperties --jscomp_error=missingReturn --jscomp_error=nonStandardJsDocs --jscomp_error=suspiciousCode --jscomp_error=undefinedNames --jscomp_error=undefinedVars --jscomp_error=unknownDefines --jscomp_error=uselessCode --jscomp_error=visibility --compilation_level=SIMPLE_OPTIMIZATIONS --extra_annotation_name=attribute --extra_annotation_name=demo --extra_annotation_name=element --language_in=ECMASCRIPT_2017 --language_out=ECMASCRIPT5_STRICT --chrome_pass --polymer_pass --jscomp_off=duplicate --js_module_root=../../ui/webui/resources/ --js_module_root=gen/ui/webui/resources/ --module_resolution=BROWSER_WITH_TRANSFORMED_PREFIXES --browser_resolver_prefix_replacements="chrome://resources/=./" --browser_resolver_prefix_replacements="//resources/=./" --chrome_pass=false --externs=../../third_party/closure_compiler/externs/chrome.js --externs=../../third_party/closure_compiler/externs/chrome_extensions.js --externs=../../third_party/closure_compiler/externs/file_manager_private.js --externs=../../third_party/closure_compiler/externs/file_system_provider.js --externs=../../ui/file_manager/file_manager/common/js/files_app_entry_types.js --externs=../../ui/file_manager/base/js/volume_manager_types.js --externs=../../ui/file_manager/externs/volume_info.js --externs=../../third_party/closure_compiler/externs/polymer-1.0.js --js_output_file gen/ui/file_manager/file_manager/common/js/closure_compile_jsmodules.js --js gen/ui/webui/resources/js/assert.m.js gen/ui/file_manager/base/js/volume_manager_types.m.js gen/ui/file_manager/file_manager/common/js/files_app_entry_types.m.js --checks-only
gen/ui/file_manager/file_manager/common/js/files_app_entry_types.m.js:640:4: ERROR - [JSC_TYPE_MISMATCH] assignment to property prefixEntry of VolumeInfo
found   : FilesAppEntry$$module$gen$ui$file_manager$file_manager$common$js$files_app_entry_types_m
required: (FilesAppEntry|null)
  640|     this.volumeInfo_.prefixEntry = /* @type {!FilesAppEntry} */ (entry);
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1 error(s), 0 warning(s), 96.6% typed
```

## Background Information

We're gradually migrating our JS code to JS modules. To be able gradually
migrate to modules we're generating the JS modules from the traditional scripts
and keeping the traditional script running until all files have JS modules when
we'll be able to switch to JS modules.

We also use Closure externs to isolate our background page implementation from
the foreground page.  Basically foreground page can't instantiate
objects/implementation from background page (and vice-versa).  However some types
are shared by both so to allow the type checking via Closure compiler we
specify such types in externs.  Some libraries/functions used by both
(foreground and background) live in the "common" directory.

## Reproducing locally

1.  Checkout the [broken-type-check
    branch](https://github.com/lucmult/closure_js_modules/tree/broken-type-check):
    `$ git checkout broken-type-check`.
2.  Adjust the path for Java and Closure JAR in the `compile.sh`.
3.  From the root of this repository run `./compile.sh`.

The expected error is:

```bash
$ ./compile.sh

common/files_app_entry_types.m.js:79:4: ERROR - [JSC_TYPE_MISMATCH] assignment to property prefixEntry of VolumeInfo
found   : FilesAppEntry$$module$files_app_entry_types_m
required: (FilesAppEntry|null)
  79|     this.volumeInfo_.prefixEntry = /* @type {!FilesAppEntry} */ (entry);
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1 error(s), 0 warning(s), 93.6% typed

```

## How we worked around the problem

As part of our build step we have the option to generate a JS module from a
traditional script (or extern file), so we used this feature to generate a JS
module for the affected externs and instead of using this module as extern we
use it as a regular JS module.

The one side effect is that the externs now are part of the runtime, whereas
before it would only referred at compile time.  But this is a minor thing since
they don't carry any implementation.

See the changes for this workaround in this diff:
[broken-type-check](https://github.com/lucmult/closure_js_modules/compare/broken-type-check...main)
