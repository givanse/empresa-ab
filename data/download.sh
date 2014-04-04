#!/bin/bash

set -e

download_file='homex.csv'

# http://ar.finanzas.yahoo.com/q/hp?s=HOMEX.MX
download_url='http://ichart.finance.yahoo.com/table.csv?s=HOMEX.MX&d=1&e=24&f=2014&g=d&a=6&b=19&c=2004&ignore=.csv'

wget -O $download_file $download_url

./format.sh "$download_file"

exit
#EOF
