#!/bin/sh
convert $1 -sampling-factor 4:2:0 -strip -quality 60 -interlace JPEG -colorspace RGB $2
