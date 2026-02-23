@echo off
echo ======================================
echo  Delicias da Xia Tan - Servidor Local
echo ======================================
echo.
echo Iniciando servidor em http://localhost:8080
echo Pressione Ctrl+C para parar
echo.

npx http-server . -p 8080 -o
