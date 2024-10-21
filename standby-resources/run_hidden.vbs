Set WshShell = CreateObject("WScript.Shell")

currentDirectory = WshShell.CurrentDirectory & "\"
relativePath = "run.bat"

absolutePath = currentDirectory & relativePath

WshShell.Run Chr(34) & absolutePath & Chr(34), 0, False
