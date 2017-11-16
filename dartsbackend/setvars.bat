@echo setting environment variables...
@echo off
set /P DARTS_SECRET=< app-env
@echo Inhoud van DARTS_SECRET = %DARTS_SECRET%