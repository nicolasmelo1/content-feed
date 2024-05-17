# Content Feed

This is a simple content feed that fetches data from an API, transforms and sorts and then displays it in a feed. The feed is paginated and has infinite scrolling, this means that it will behave similarly to a social media app like Twitter or Instagram.

## Live Demo

[Application](https://content-feed.vercel.app/)

- Visit `/swagger` to see the API documentation.

[Storybook](https://content-feed-storybook.vercel.app/)

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tanstack Virtual](https://tanstack.com/virtual/latest)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)

## Decisions

- First, the project uses Next.js since it was required by the challenge to use something that is server-side rendered. Next.js is a great choice for this since it is a very popular framework that is easy to use and has a lot of features that make it easy to build a server-side rendered application. For me, myself, I already have a lot of experience with Next.js so I chose it for this project.
- Tailwind CSS is newer for me. This is the third project that I have used it in and for me it's feeling like a charm. No issue and no complains on this tool. For quick prototyping, I think this is the best choice.
- My main goal was to nail all of the basic requirements well. Really well. I could add more features, make the UI more appealing and all that. But you don't need a fancy interface to create a great product. One example is [Hacker News](https://news.ycombinator.com/). It's a very simple interface but it's a great product. So I focused on the basic requirements and nailed them.
- First: The goal of this project is to build a content-feed, something like Instagram. Instagram has infinite scrolling and pagination. If you load everything on the page all at once when you scroll too much data your application will start to get slugish and have performance issues. So we already prevented that by using Tanstack Virtual. This takes care of virtualizing the list and only rendering the items that are visible on the screen. So it will not fetch all of the images and data at once, but it will only fetch the data that is visible on the screen. This will make the application much faster and more performant.
- Second: Before actually building the feed and the application I have set-up storybook. I have used in a couple projects now and I LOVE it. Imagine the following: you are building an onboarding, your onboarding has 5 steps. You change the page on the last step. Then you'll have to go through the first 4 steps to get to the last step. With storybook, you can just go to the last step and see how it looks. It's a great tool for developing UI components. So I have set-up storybook and created a couple of stories for the components that I was going to build. This way I could develop the components in isolation and test them out before actually building the application.
- Third: Nail down the testing so no edge case gets missing. I have used Jest for testing. And used Storybook to automate the testing on the component level.

## Improvements and Known issues

- If you scroll to the bottom and the API fails for some reason or returns an Empty array it will keep retrying indefinitely. I would add caching on the front end to fix that so it doesn't keep retrying indefinitely.
- You can't sort the data. As you can't on Instagram and on X/Twitter. My focus was to keep it simple.

## Nice features

- Once you click on a "content" can press `ESC` to go back to the content feed.
- We create a unique URL for each content. So you can share the URL with someone and they will be able to see the content that you are seeing. (Because of how picsum.photos works the picture will not be the same, but the content will be the same)

## Project structure

- `app/` - The main application code, used by Next.js, there's not much here.
- `components/` - The components that are used in the application. Each component has its own folder with the component file a stories file and MAYBE can contain a layout. `layouts` are used when the `component` make any I/O operation, like fetching data from an external service for example. By separating between layout and component we can test the component by mocking the I/O operation entirely. On Storybook we should NEVER make an I/O operation. We should always mock it so testing gets easier.
- `page/` - We can't use the `pages` folder in Next.js because it's a reserved folder. So I have created a `page` folder. This folder contains the pages of the application. It has the same structure as the `components` folder. Each page has its own folder with the page file, a stories file, and MAYBE a layout.
- `utils/` - Contains utility functions that are used either on the frontend or the backend.

## Getting Started

1. Create a `.env.local` file in the root of the project and add the following:

```bash
API_HOST=https://stoplight.io
HOST=http://localhost:3000
```

2. Run the following commands in order:

```bash
# Install dependencies
pnpm i
# run the dev server
pnpm run dev
```

3. (optional) On another terminal run the following command to start Storybook:

```bash
pnpm run storybook
```

The application will live on [http://localhost:3000](http://localhost:3000). Open in your browser to see the result.

The Storybook application will live on [http://localhost:6006](http://localhost:6006). Open in your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Storybook, take a look at the following resources:

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction) - learn about Storybook features and API.
- [Learn Storybook](https://storybook.js.org/tutorials/) - an interactive Storybook tutorial.
