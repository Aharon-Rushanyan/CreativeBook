import React from 'react';


import './App.css';
import Book from './components/book/Book';

import HostingComponent from './components/login/Animatlogin'

import './App.css';

import Navbar from './components/Navbar/Navbar'
import User from './components/user/User'




const books = [
  {
    title: "Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and.",
    shortDescription: "Lorem Ipsum has been the industry's standard dummy",
    startDate: new Date(),
    endDate: new Date(),
    comments: ["hhhhh", "kkkk"],
    rate: 5,
    status: 1,
    page: 10,
    pages: 400,
    imageUrl:"https://images-eu.ssl-images-amazon.com/images/I/513XpOgZtiL.jpg",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garisa Markes",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and.",
    shortDescription: "Lorem Ipsum has been the industry's standard dummy",
    startDate: new Date(),
    endDate: new Date(),
    comments: ["hhhhh", "kkkk"],
    rate: 6,
    status: 1,
    page: 10,
    pages: 400,
    imageUrl:"https://s26162.pcdn.co/wp-content/uploads/2018/02/100_Years_First_Ed_Hi_Res-768x1153.jpg",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garisa Markes",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and.",
    shortDescription: "Lorem Ipsum has been the industry's standard dummy",
    startDate: new Date(),
    endDate: new Date(),
    comments: ["hhhhh", "kkkk"],
    rate: 6,
    status: 1,
    page: 10,
    pages: 400,
    imageUrl:"https://s26162.pcdn.co/wp-content/uploads/2018/02/100_Years_First_Ed_Hi_Res-768x1153.jpg",
  }
];
function App() {

  return (<div>

             <div className="App">
      <div className="appContainer">
        <div className="booksWrapper">
        {books.map((book, i) => {
          return <Book key={ i } book={book} />;
        })}
        </div>
      </div>
    </div>
  );
          <Navbar/>
    <HostingComponent />

    <User /></div>
  )
}



export default App;
