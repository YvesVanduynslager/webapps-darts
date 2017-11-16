@echo setting environment variables...
@echo off
set /P DARTS_BACKEND_SECRET=< app-env
@echo Inhoud van DARTS_BACKEND_SECRET = %DARTS_BACKEND_SECRET%