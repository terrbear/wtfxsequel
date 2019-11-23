
You might have to rebuild the electron deps after installing

Starting the app:
npx electron .
and
npm start

features / todo:
* syntax highlighting on queries pane
* sidebar showing tables from db connection
* auto-browse by clicking on tables
* schema viewer
* download as csv
* stream data to table
* support connections through ssh
* resize automagically and line up with pixel heights/widths
* menu options for new window / run query
* format nulls as greyed out / null word
* prettier borders / shadows or something
* support deleting connections
* support adding connections
* validate connections on backend
* test connectivity
* test with no connections
* little spinner on save button to indicate saved
* autoclear status
* in-table quick search
* resize-able table headers
* only submit the last query

before sharing:
* host bootstrap internally
* about text

later:
* support dark mode
* dynamodb support

bugs:
* creating new window from a new window isn't sized right
* creating a new window creates 2 new windows

notes:
streaming: https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example#from-database

