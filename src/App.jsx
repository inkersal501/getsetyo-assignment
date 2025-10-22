import { useState } from 'react'
import './App.css'
import { PostList } from './components/PostList'
import { ProductList } from './components/ProductList'
import PaginatedList from './components/PaginatedList';

function App() { 
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex space-between">
        <ProductList setSearch={setSearch}/>
        <PostList search={search}/>
        <PaginatedList />
    </div>
    </>
  )
}

export default App
