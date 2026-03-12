#!/bin/bash

SOURCE_DIR="/Users/ericyang/Downloads/新增包含項目的檔案夾"
DEST_DIR="$SOURCE_DIR/portfolio-site/assets/images"

mkdir -p "$DEST_DIR"

echo "開始轉換與複製圖片..."

# 處理檔案（不區分大小寫的副檔名比對）
for file in "$SOURCE_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    extension="${filename##*.}"
    name="${filename%.*}"
    
    # 轉小寫以方便比對
    ext_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    if [[ "$ext_lower" == "heic" || "$ext_lower" == "dng" ]]; then
      echo "轉換 $filename 為 JPG..."
      sips -s format jpeg "$file" --out "$DEST_DIR/$name.jpg" > /dev/null
    elif [[ "$ext_lower" == "jpg" || "$ext_lower" == "jpeg" || "$ext_lower" == "png" || "$ext_lower" == "webp" ]]; then
      echo "複製 $filename..."
      cp "$file" "$DEST_DIR/"
    else
      echo "略過 $filename (格式不支援網頁直接顯示或非圖片)"
    fi
  fi
done

echo "轉換完成！"
