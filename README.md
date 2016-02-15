# coursefindr
Project for finding courses at Cal Poly SLO. Uses a database of all the current courses, scraped from schedules.calpoly.edu and catalog.calpoly.edu

Features:

-Load current Cal Poly courses by department, course number, or amount of units

-Select courses 

-Selected courses automatically save in the browser

-Sort and filter courses

-See stats about your selected courses

Known bugs:

-Http get requests do not update the view after completion

    -Workaround: use “fetch courses” button)

Angular uses gulp to run

PHP and MySQL both use servers run by MAMP