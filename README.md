
Hosted Website: https://hanabi-hyuga.onrender.com/login

The objective of the Project was to create an Event and Venue Management System where venue owners/event hosts can create events or place listings and customers can make reservations for the same.

**Summary of Performance and Outcomes:**

**Project Functonalities:**
1.	Owners and Users can successfully create an account by selecting their role.
2.	Owners can create new venues for booking or new activities and set parameters like location, cost, capacity, details, etc. They can also update or delete them. If an event/activity is deleted, then the registered users receive an email notification about the same.
3.	Users can search by (sports)venues, activities, or players. Any reservation done appears under “My Reservations” section where user can see past and upcoming reservations. Users receive booking confirmation via email.
4.	Payment integration has been set up via Stripe.
5.	The website is hosted using onRender.
6.	Additional features of selecting light/dark theme for UI and inviting someone for an event/activity(user functionality) have also been incorporated.



**To run the Code:**
1. Add your own keys.js file in server/Controller which contains Mongodburl, GoogleOauth, captcha Keys.
2. Add your own keys.js file in Frontend/src which contains GoogleOauth Keys, Captcha Keys.
3. Add your own email id, password in post functions in server.js.

