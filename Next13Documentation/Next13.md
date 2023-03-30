# Next.js Walkthrough

## Setup

To get started with creating your first next app, run the following command:

```bash
npx create-next-app@latest --experimental-app <your-app-name>
```

Then run:

```bash
cd <your-app-name>/

npm run dev
```

## Pages

_To create a new page, follow these steps:_

1. Create a new folder called '**_/app/example/_**'.
2. Next, create a new file inside that folder and call it '**_page.jsx_**' you can use '.js' or '.tsx' as well.
3. Inside '**_page.jsx_**' paste the following code:

```javascript
export default function Example() {
  return <h1>Example</h1>;
}
```

_It's **THAT** easy!_ Just by creating a file, you now have a route that leads to the page it represents! (_http://localhost:3000/about_)

## Layout

To create a custom layout for this component, create a new file called '**_/app/example/layout.jsx_**'

```javascript
export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <nav>Example Navbar</nav>
      <main>{children}</main>
    </>
  );
}
```

## Loading

To create a custom loading state for this component, create a new file called '**_/app/example/loading.jsx_**'

```javascript
export default function Loading() {
  return <h1>Loading...</h1>;
}
```

## Error

To create component-level error handling, create a new file called '**_/app/example/error.jsx_**' and paste in the following code block:

```javascript
"use client"; // Error components must be Client components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error,
  reset: () => void,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
```

You can test this by purposely thowing an error in the '**_page.jsx_**' file in the same directory.

This is how to throw an error:

```javascript
throw Error("What the heck man???");
```

## Fetching Data

To learn about data fetching lets start by creating a new '**_/lib/_**' function to keep our data fetching functions in.

Inside '**_/lib/_**', add '**_getAllUsers.js_**' and past in the following code:

```javascript
export default async function getAllUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) throw new Error("failed to fetch users");

  return res.json();
}
```

This function can now be used by importing it with:

```javascript
import getAllUsers from "@/lib/getAllUsers";
```

## Dynamic Routing

Lets say you have a '**_/app/users/page.js_**' page for displaying a list of users. If you wanted to display one page dynamically based on the user id, you could create a dynamic page. To create a dynamic page, you would simply create a new folder called '**_/app/users/[userId]/_**' and add your '**_page.jsx_**' inside.

inside '**_/app/users/[userId]/page.jsx_**', paste the following code:

```javascript
export default async function UserPage({ params: { userId } }) {
  return <div>{userId}</div>;
}
```

Now you are dynamically generating a page based on the userID!

### ISS:

To add Incremental site generation to a request, you can add '**{ next: { revalidate: 60 } }**' to the fetch function after the url. Heres an example:

```javascript
// this will check the data the data every 60 seconds and refetch it if necessary
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
  next: { revalidate: 60 },
})
```
