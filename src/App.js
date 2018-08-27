import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
  books: []
  }

//after the component is mounted in the DOM, the books are loaded and the state is set
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books})
    })
  }

  changeCategory = (book, category) => {
    BooksAPI.update(book, category).then(() => {
      book.shelf = category
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }))
    })
  } 
//rendering the two Components
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => 
          ( <ListBooks 
            books={this.state.books}
            onChangeCategory={this.changeCategory}
            />)
        }/>
        <Route path='/search' render={ () =>
          (<SearchPage 
            books={this.state.books}
            onChangeCategory={this.changeCategory}
            />)
        }/>
      </div>
    )
  }
}

export default BooksApp
