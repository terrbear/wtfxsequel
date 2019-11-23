
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
* support deleting connections
* validate connections on backend
* test connectivity
* little spinner on save button to indicate saved
* autoclear status
* in-table quick search
* resize-able table headers
* switch to immutable
* show which db is selected on lefthand side
* split out db connection to its own module
* husky
* support running highlighted query
* proper logger

before sharing:
* host bootstrap internally
* about text

later:
* support dark mode
* dynamodb support

bugs:
* creating new window from a new window isn't sized right
* creating a new window creates 2 new windows
* sticky headers show a bit of the content underneath when they scroll past
* format int8 as numbers


notes:
streaming: https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example#from-database

