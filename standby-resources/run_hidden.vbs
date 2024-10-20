Set WshShell = CreateObject("WScript.Shell")

relativePath = "run.bat"

currentDirectory = WshShell.CurrentDirectory

If Right(currentDirectory, 1) <> "\" Then
    currentDirectory = currentDirectory & "\"
End If

absolutePath = currentDirectory & relativePath

WshShell.Run Chr(34) & absolutePath & Chr(34), 0, False
