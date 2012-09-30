#!/bin/sh
set -e -u

d=Forsythe-$(date "+%Y-%m-%d%n")

mkdir -p $d

cp *.otf $d

zip $d.zip $d/*
rm -rf $d
