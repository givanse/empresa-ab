#!/bin/bash

set -e

if [[ -z $1 ]] ; then
    echo "No file received."
    exit 1
fi

file=$1
output_file=$file'.json'
echo 'Formating '$file' to '$output_file

tmp_file='file.tmp'
# remove headers line
tail -n +2 $file > $tmp_file

echo "{" > $output_file

sed -re "s/(.*),(.*),(.*),(.*),(.*),(.*),(.*)/{\"date\":\"\1\", \"open\":\"\2\", \"high\":\"\3\", \"low\":\"\4\", \"close\":\"\5\", \"vol\":\"\6\", \"adjc\":\"\7\"}/" $tmp_file >> $output_file

echo "}" >> $output_file
rm $tmp_file

wc -l $file
wc -l $output_file

exit
#EOF
