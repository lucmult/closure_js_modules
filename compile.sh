#!/bin/bash

# External files/binaries
JAVA=~/chromium/src/third_party/jdk/current/bin/java
CLOSURE_JAR=~/chromium/src/third_party/closure_compiler/compiler/compiler.jar

$JAVA  -jar -Xms1024m -client -XX:+TieredCompilation $CLOSURE_JAR \
  --jscomp_error=accessControls \
  --jscomp_error=checkTypes \
  --jscomp_error=checkVars \
  --jscomp_error=constantProperty \
  --jscomp_error=deprecated \
  --jscomp_error=externsValidation \
  --jscomp_error=globalThis \
  --jscomp_error=invalidCasts \
  --jscomp_error=misplacedTypeAnnotation \
  --jscomp_error=missingProperties \
  --jscomp_error=missingReturn \
  --jscomp_error=nonStandardJsDocs \
  --jscomp_error=suspiciousCode \
  --jscomp_error=undefinedNames \
  --jscomp_error=undefinedVars \
  --jscomp_error=unknownDefines \
  --jscomp_error=uselessCode \
  --jscomp_error=visibility \
  --compilation_level=SIMPLE_OPTIMIZATIONS \
  --extra_annotation_name=attribute \
  --extra_annotation_name=demo \
  --extra_annotation_name=element \
  --language_in=ECMASCRIPT_2017 \
  --language_out=ECMASCRIPT5_STRICT \
  --chrome_pass \
  --chrome_pass=false \
  --polymer_pass \
  --jscomp_off=duplicate \
  --checks-only \
  --module_resolution=BROWSER_WITH_TRANSFORMED_PREFIXES \
  --browser_resolver_prefix_replacements="chrome://resources/=./" \
  --browser_resolver_prefix_replacements="//resources/=./" \
  --js_module_root=./ \
  --js_output_file gen/closure_compile_jsmodules.js \
  --externs=externs/polymer-1.0.js \
  --js \
    externs/files_app_entry_interfaces.m.js \
    externs/volume_info.m.js \
    common/volume_manager_types.m.js \
    common/files_app_entry_types.m.js

# --externs=externs/volume_info.js \
# --externs=externs/volume_manager_types.js \
# --externs=externs/files_app_entry_types.js \
