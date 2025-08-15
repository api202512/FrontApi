@echo off
REM Script para hacer commit y push con fecha y hora

REM Obtener fecha y hora actuales
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (
    set day=%%a
    set month=%%b
    set year=%%c
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set hour=%%a
    set minute=%%b
)

REM Pedir mensaje al usuario
set /p msg="Escribe el mensaje del commit: "

REM Agregar todos los cambios
git add .

REM Hacer commit con el mensaje + fecha y hora
git commit -m "%msg% - %day%/%month%/%year% %hour%:%minute%"

REM Subir a la rama actual
git push origin HEAD

pause
