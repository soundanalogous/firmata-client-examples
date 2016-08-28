#!/bin/sh

ret=0
count=0
wt=0
while [ $ret -eq 0 ]
do
  node mega-test.js
  ret=$?
  count=$(($count+1))
  echo 'Count ' $count
  wt=$(shuf -i 1-10 -n 1)
  echo 'waiting ' $wt 'sec. to restart...'
  sleep $wt
done
