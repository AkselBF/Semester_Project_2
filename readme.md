# Semester project 2: Day-Night Auction
---

This is my project, and take on making an auction website. The way this site works and how to navigate it will be written down bellow.


## Getting started
---

These instructions will help you clone the project and run it.

### Clone project
```bash
git clone https://github.com/AkselBF/Semester_Project_2.git
```

### Running project
```bash
npm run tailwind
```

---

## Navigation
---

Here are a list of pages the site has:
* Startup page
* Profile page
* Home page
* Listings page
* Listing details

We'll go over what each pages are about and what you can do in each of them.

---
### Startup page

This is where the user registers then logs in. The accessibility in the entire site is more limited when a user is unregistered, but still usable.
Here's how you can register then log in.

1. Click on the register button, a form will appear.
2. fill the three first input at least. You will not be able to enter the data otherwise. The fourth input is optional.
3. Once the data is entered, click on the login button to make the login form appear.
4. Fill the inputs, and enter your profile page should you enter the information successfully.

You'll also notice the header will have one more option upon login.

---
### Profile page

This is the page accessible to registered users. User information should be written in it. The avatar will have a standard user image, should the user not enter an avatar upon registering. Among the user information, the credits are also visible. Be sure to remember it, considering this is your currency for this site to be able to place bids.
The user can also see the listing he/she makes.

---
### Home page

This is just an introductionary page, showing what the site is about and adding a bit of style to it. This page also leads to the listings page.

---
### Listings page

This is the page that contains all of the listings made by every user using the api for this project. If registered, the user can make their own listings for everyone to see. 
To create a new listing, you'll notice a blue + button on the bottom-right corner, only if the user is logged in. Click on the button to make the form appear. In this form:
1. Fill the name input. This makes the name for your listing
2. Fill the description input. This adds a description for said listing
3. Create the date by clicking on the calender. This makes the expiration date for the listing.
4. Optionally, fill the media url input. The url must be valid. Also, you'll notice there's a plus button at the right of the input. This allows the user to create more media-inputs, allowing them to make more than one image for their listing. Doing this creates a carousel of sorts in the listing details page.

In this page, the user can also search via the search bar, or sort the listings via date or number of bids.

This page also allows users to select and view the listings in detail. Upon clicking on one of them, it leads the user to the listing details.

---
### Listing details

This is the page when the user selects one listing for the listings page. Here, all the information regarding the listing is shown. 
* Live expiration date
* Seller information
* Listing name and information
* Bidders and the amount of bids
* Media image with carousel should the user make more than one image. The images can be selected to change the main image

In this page, the user can also place his/her own bid in an attempt to win this listing. The highest bidder is noted and updated. The user has to be logged in to be able to place bid. 
To place bid, just click on the place bid button, fill the input with a higher number than the last, and confirm. With this, the highest bidder will be you.

---
### Logging out

When logging out, the user is redirected back to the startup page. Their accessibility becomes more limited once again. You must login again to be able to access the profile page, add listings or place bids.

---