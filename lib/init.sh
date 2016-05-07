#!/bin/bash

git -C $1 init
touch $1/README.md
git -C $1 add $1
git -C $1 commit -m "origin"
git -C $1 remote add origin $2
git -C $1 push origin master
