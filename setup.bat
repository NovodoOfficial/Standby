@echo off
cd /d "%~dp0"
cd "standby-resources"
python setup.py
echo Click enter to continue
pause
