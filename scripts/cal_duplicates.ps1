# Define the directories
$dir1 = "resources\Assets\Female3DCG\ItemMisc"
$dir2 = "resources\Assets\Female3DCG\ItemMisc\TapedHands"

# Get the list of files in each directory
$files1 = Get-ChildItem -Path $dir1 -Filter "玩偶_*.png"
$files2 = Get-ChildItem -Path $dir2 -Filter "玩偶_*.png"

# Create a hashtable to store file hashes
$hashTable1 = @{}
$hashTable2 = @{}

# Compute the hash for each file in the first directory
foreach ($file in $files1) {
    $hash = Get-FileHash -Path $file.FullName -Algorithm SHA256
    $hashTable1[$file.Name] = $hash.Hash
}

# Compute the hash for each file in the second directory
foreach ($file in $files2) {
    $hash = Get-FileHash -Path $file.FullName -Algorithm SHA256
    $hashTable2[$file.Name] = $hash.Hash
}

# Compare the hashes and output the results
foreach ($fileName in $hashTable1.Keys) {
    if ($hashTable2.ContainsKey($fileName)) {
        if ($hashTable1[$fileName] -eq $hashTable2[$fileName]) {
            Write-Output "File '$fileName' is identical in both directories."
            Remove-Item -Path "$dir2\$fileName"
        }
        else {
            Write-Output "File '$fileName' is different in the two directories."
        }
    }
}