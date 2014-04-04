#/bin/bash

set -e

url_emberjs='https://github.com/emberjs/starter-kit/archive/v1.5.0.zip'
wget $url_emberjs
unzip v1.5.0.zip
rm v1.5.0.zip
cp -vR starter-kit-1.5.0/* .
rm -r starter-kit-1.5.0/
git checkout .

url_raphaeljs='https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael.js'
cd js/libs
wget $url_raphaeljs
cd -

exit
#EOF
