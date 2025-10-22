# Dynamic Fetching, Filterable List and Paginated List

## Overview

This project demonstrates three key React components:

1. **Dynamic Filterable List** — implements data fetching, client-side filtering, and reusable hooks.
2. **Paginated List** — implements mock API pagination with a loading spinner, error handling, and a 'Back to Top' button.

####
These components are designed to test and showcase React fundamentals including state management, hooks, URL synchronization, and clean UI rendering.

---

## 1. Dynamic Filterable List

### Core Features

* **Mocked Product Data:** Uses a predefined array of products with `name`, `category`, and `price`.
* **List/Grid Display:** Renders the products in a responsive grid.
* **Text Input Filter:** Filters products by name (case-insensitive).
* **Category Dropdown Filter:** Filters by product category.
 
* **Price Range Slider:** Allows adjusting min/max price range to filter products.
* **URL Query Persistence:** All filters are stored in query parameters to enable deep linking.
* **Reusable Hook – `useFetch(url)`:**

  * Caches fetched data in a `Map` to prevent redundant network requests.
  * Returns `{ data, error, loading, retry }`.
  * Supports retrying a failed request.



## 2.  **`<PostList />`:**

  * Uses the `useFetch` hook.
  * Fetches data from `https://httpbin.org/delay/2?query=abcd`.
  * Displays post titles or JSON output with retry functionality.

---

## 3. Paginated List

### Core Features

* Fetches paginated data from a mock API (`https://jsonplaceholder.typicode.com/posts`).
* Displays posts in a list format.
* Implements **“Load More”** functionality to fetch additional pages.
* Includes **error handling** and a **loading spinner**.

### Key Concepts

* Controlled pagination via `_page` and `_limit` query parameters.
* Managing loading and error states gracefully.
* Smooth scroll-to-top behavior using the native `window.scrollTo()` API.

---
###  Tech Stack

* React (Functional Components)
* React Hooks (`useState`, `useEffect`, `useMemo`)
* URLSearchParams for query persistence
* Fetch API
* Tailwind CSS for styling (optional)

### File Structure

```
src/
├── hooks/
│   └── useFetch.js
├── components/
│   ├── ProductList.jsx
│   └── PostList.jsx
|   └── PaginatedList.jsx
├── App.jsx
└── main.jsx
```

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/inkersal501/getsetyo-assignment.git
cd getsetyo-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

### 4. Open in Browser

Visit: [Live Demo](https://getsetyo-assignment.vercel.app/)

---
 

### 👨‍💻 Author

**Inkersal Mahendran** [Visit Profile](https://www.linkedin.com/in/inkersal-mahendran/)
