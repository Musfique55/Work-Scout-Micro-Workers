# Work Scout Website
# Live Link : https://work-scout-3a179.web.app
# Server Side : https://github.com/Musfique55/Work-scout-server

# Admin Login Info
# Email : admin@gmail.com
# Password : Admincheck#

# Features of the website
 
- Role-Based Access Control:
   Users are assigned roles: Worker, Task-Creator, or Admin.
   Different dashboards and functionalities based on user roles.

- Responsive Design:
  The platform is responsive for mobile, tablet, and desktop views.
  Dashboard is also made responsive.

- User Authentication:
  Secure user registration and login using JWT.
  Email and Google login options.

- Navbar and Footer:
  Navbar with dynamic navigation options based on user login status.
  Footer with website logo and clickable social media icons.

- Home Page:
  Hero section with a slider.
  Features section highlighting key platform features.
  How It Works section with steps to use the platform.
  Top Earners section showing top workers.
  Testimonial section with user feedback in a slider format.

- Task Management for Workers:
  View available tasks with detailed descriptions.
  Submit completed tasks for review.
  Withdraw coins earned by completing tasks.
  Receive notifications about earnings and withdrawals.

- Task Management for Task-Creators:
  Create tasks with specific instructions, deadlines, and reward amounts.
  Review task submissions and approve or reject them.
  Pay workers for completed tasks using platform coins.
  Purchase coins to facilitate task payments.
  Report workers to Admin for issues.

- Admin Dashboard:
  Modify user roles and address reported issues.
  Manage platform integrity by deleting tasks and users.
  View and handle withdrawal requests from users.

- Payment and Withdrawal System:
  Workers can withdraw coins for real money.
  Task-Creators can purchase coins using Stripe.
  Payment history tracking for Task-Creators.

- Notification System:
  Users receive notifications for various actions (e.g., task approval, earnings).
  Notifications are stored and displayed in descending order based on time.

# Packages-

- React
- React Router
- React Hook Form
- Swiper js
- React Icons
- React Countdown
- React DatePicker
- Firebase
- Tanstack Query
- Axios
- Sweet Alert

## Running the Project Locally
 Follow these steps to set up the project on your local environment:

## Clone The Repository
```bash
git clone <repository-url>
cd <project-folder>
```
## Running the Project Locally
Follow these steps to set up the project on your local environment:

## Install Dependencies
Navigate to the client-side folder and install the required dependencies:
```bash
npm install
```
## Update API URLs
In the project files where useAxiosPublic and useAxiosSecure are defined, update the URLs to point to localhost for your local backend.

## Start the Development Server
To start the server, run:
```bash
npm start
```
## Make Changes to the Website
Now you can make changes to the website. The development server will automatically reload to reflect your updates.
