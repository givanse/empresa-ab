#!/bin/bash

set -e

if [[ -z $1 ]] ; then
    echo "No file received."
    exit 1
fi

file=$1
output_file=$file'.json'
tmp_file='file.tmp'

echo 'Formating '$file' to '$output_file

# remove CSV headers
tail -n +2 $file > $tmp_file

echo "[" > $output_file

# process each record
sed -re "s/(.*),(.*),(.*),(.*),(.*),(.*),(.*)/{\"date\":\"\1\", \"open\":\"\2\", \"high\":\"\3\", \"low\":\"\4\", \"close\":\"\5\", \"vol\":\"\6\", \"adjc\":\"\7\"},/" $tmp_file >> $output_file

# handle last comma
echo "{}" >> $output_file

echo "]" >> $output_file

# clean up
rm $tmp_file

wc -l $file
wc -l $output_file

exit
#EOF
