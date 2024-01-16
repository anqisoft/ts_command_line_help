@ECHO OFF
cd..
if exist types\*.d.ts (del /s/q/f types\*.d.ts)
start /B "" tsc --declaration -p .\ -t esnext --emitDeclarationOnly --outDir types\
ping 127.0.0.1 -n 3 >nul
echo please wait, and close me.
if exist  types\src\ (move types\src\*.d.ts types\ && rd types\src\)