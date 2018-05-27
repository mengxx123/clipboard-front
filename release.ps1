git checkout master
git merge dev
git push origin master
git checkout dev

Write-Host 'Press any key to quit!' -NoNewline
$null = [Console]::ReadKey('?')