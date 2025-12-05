#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
cgitb.enable()  # debug 用，出错会显示

print("Content-Type: text/plain; charset=utf-8")
print()  # 必须的空行

form = cgi.FieldStorage()

print("=== Form Data Received ===\n")

for key in form.keys():
    value = form.getvalue(key)
    print(f"{key} = {value!r}")

# 文件字段（如果有）
if "avatar" in form:
    fileitem = form["avatar"]
    if fileitem.filename:
        print("\n--- Uploaded File ---")
        print(f"filename: {fileitem.filename}")
        print(f"size: {len(fileitem.file.read())} bytes")
