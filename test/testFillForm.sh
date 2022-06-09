#! /bin/bash

inputs="ritika\n2021-02-21\ndrawing,painting,dancing\n9876567843\nGajvinayak Apartment\nFlat No.23"

expectedOutput='{"name":"ritika","dob":"2021-02-21","hobbies":["drawing","painting","dancing"],"telephoneNo":"9876567843","address":"Gajvinayak Apartment\nFlat No.23"}';

echo -e $inputs | node fillForm.js 1> /dev/null

echo -n ${expectedOutput} > expectedForm.json

diff details.json expectedForm.json

status=$?
result="FAIL"

if [[ $status == 0 ]]
then
    result="PASS"
fi

rm -r expectedForm.json
echo $result
