#!/bin/bash

git -C $1 add $1
git -C $1 branch $2
git -C $1 checkout $2
git -C $1 commit -m 'add'
git -C $1 push origin $2