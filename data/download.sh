#!/bin/bash

set -e

# http://ar.finanzas.yahoo.com/q/hp?s=HOMEX.MX
wget http://ichart.finance.yahoo.com/table.csv?s=HOMEX.MX&d=1&e=24&f=2014&g=d&a=6&b=19&c=2004&ignore=.csv

mv table.csv\?s\=HOMEX.MX homex.csv

exit
#EOF
