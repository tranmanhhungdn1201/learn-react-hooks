import React, { useState, useEffect } from 'react';
import './App.css';
import queryString from 'query-string';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm';

function App() {
  const [todolist, setTodoList] = useState([
    { id: 1, title: 'title 1'},
    { id: 2, title: 'title 2'},
    { id: 3, title: 'title 3'},
    { id: 4, title: 'title 4'}
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  });

  useEffect(() => {
    async function fetchPostList(){
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
          console.log('Fail to fetch post list: ', error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  function handleFiltersChange(newFilters){
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    })
    console.log('new filters: ', newFilters);
  }

  function handlePageChange(newPage){
    console.log('New page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage
    });
  }

  function handleTodoClick(todo){
    const index = todolist.findIndex(x => x.id === todo.id);
    if(index < 0) return;
    const newTodoList = [...todolist];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues){
    const newTodo = {
      id: todolist.length +1,
      ...formValues
    };
    const newTodoList = [...todolist, newTodo];
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>Reat hooks - PostList</h1>
      <PostFiltersForm onSubmit={handleFiltersChange}/>
      <PostList posts={postList}/>
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      {/* <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList
        todos={todolist}
        onTodoClick={handleTodoClick}
      /> */}
    </div>
  );
}

export default App;
