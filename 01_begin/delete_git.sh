#!/bin/bash

current_directory=$(pwd)

echo "현재 작업 디렉토리는: $current_directory"

# Iterate through each folder
# "$current_directory"/*/는 현재 작업 디렉토리 내에 있는 모든 하위 디렉토리를 나타냅니다.
for folder in "$current_directory"/*/; do
 for infolder in "$folder"/*/; do
  for ininfolder in "$infolder"/*/; do  
    echo "Updating dependencies in $ininfolder"
    cd "$ininfolder"
    rm -rf .git
  done  
 done  
done