



Hey!

So, my project, was inspired by the overall look of Netflix since, i find it very visually appealing. This webapp is designed for the movie buffs who are interested in finding out more about movies. 

How to install the project:

1) Install bun.

2) Upon unzipping the folder, navigate to movie-app and run an integrated terminal.

3) Then, Install dependencies w/ Bun: 
    bun install

4) Run the development server:
    bun dev

5) Open browser and navigate to:
    http://localhost:3000
    
    alternatively, in your integrated terminal simply, control + click on the link


Some of My Design Decisions: 

 1) Lazy loading overlay for Details of Movie:
    
    Instead of a full page navigation to another page upon clicking on a movie, an overlay (DetailsCard) is lazily loaded as an overlay, this decision was taken to allow for a lighter  initial page load. Moreover, the lack of full page navigation to another page gives a smoother feel to the transition into listing the details of the selected movie. Additionally, this avoids disrupting the user's current context. However, a trade off to this approach is related to SEO which comes as a consequence of search engines not crawling modal content unless it's on a URL route.  

2) Server Side Rendering (SSR) for the Home Page:
    The home page in this application mainly consists of dynamic elements that reflect what movies are currently trending. This is subject to change due to changes in the trending list. Therefore, using SSR will help give us a faster first load time since it will send pre-rendered HTML which will help improve Time to First Paint. Moreover, it is important to note that SSR will also help search engine optimization (SEO) since the homepage will be more easily indexed. It is important to mention that, if there is heavy customer personalization on the homepage, this wouldn't really help much since, we would still need to rehydrate for the client. 
    

3) Error Debugging:
    Error Debugger wrapped around the DetailsCard when loading it in from the MoovieCard component. This is to ensure that while attempting to load in the required 

4) Environment Variables(Public):
    Env variables to store the API_KEY, this is not to offer any security since I am using NEXT_PUBLIC which makes my API_KEY available to the users of the app. However, this was implemented for seperation of concerns, flexability/extensibility (if I were to change the API key etc), and cleaner deployment. The reason behind not making it private is the required usage of it in the browser of the user to make API calls. Additioanlly, I did not feel like there's a need to protect this particular API key since this is read-only and no sensitive data is being transmitted. 

5) Using Link instead of <a href>:
    The reasoning behind this is because with <Link> it avoids a full page refresh which in turn offers performance gains. This is done through pre-fetching of page. Additionally, sometimes throughout the program, I use router.push() this is usually done when I am navigating after a button click. 

6) NavBar Wrapper:
    This component was created to be able to wrap the NavBar and not render it in future developments such as a possible addition of Login/Signup. 

7) Tailwind +globals.css:
    - Tailwind is used throughout the program for the ability to develop directly in the JSX which simplified development, moreover, helped simplify handling responsive design due to tailwind's built in features such as md: lg: which helps change design based on screen size. Moreover, a globals.css was used to handle animations using @keyframes and also to style certain HTML elements that persisted globally. 

Challenges faced:

- Dynamic overlay with useEffect:
    Had a couple of issues trying to create the overlay of the DetailsCard to provide more information. Wanted it to be responsive to users clicking outside the overlay or pressing the 'esc' key to exit the overlay. I ended up adding a useEffect  and added event listeners for key down and handleClickOutside (custom function)

- Effects of Adding to Favourites/Removing from Favourites:
    In the AddFavourite/RemoveFavourite component, I added a state that is toggled based on if the button of add/remove favourite is clicked, then, conditionally rendered a div with custom css properties that had a child Ant Design component(Icon). The custom css design employed @keyframes to help set moving animations in place. 

- Making the app accessible:
    I do not have much experience in adding accessible features. Due to me currently being very busy at my current job, unfortunately, I was unable to carry out enough research to complete this section. However, I will for sure research this more and understand how to implemnt such features. 
    


Bonuses:
 - Filtering by genres. 
 - Trending movies for the homepage
 - Trending shows for the homepage
 
Some Potential Improvements(Future Work):
 
- Add more  cacheing securely. For this project, I avoided furthering the  cacheing is because I wanted to ensure that if I used it, it was going to be in a secure way to avoid web cache poisoning attacks. However, I wanted to explore cacheing the homepage as it shows the trending page which is not likely to change very frequently thus, it would speed up navigating to this page from the favourites page. 

-  Potentially use memoisation to store info regarding filtering of movies based on genre to speed up the retrieval of the filter operation. 

- User authentication to personalize the application for users.

Thank you, 
    Ali Fakhreldin



Note: I left the original README.MD below if you need it

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

Before running the application, you need to set up your TMDB API key:

1. Get your API key from [TMDB Settings](https://www.themoviedb.org/settings/api)
2. Create a `.env.local` file in the root directory
3. Add your API key to the file:
   ```
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
