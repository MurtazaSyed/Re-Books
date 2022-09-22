import React, {Component} from 'react';
import Header from './NavbarBook.js';

import Home from './HomeBook.js';
import Booklist from './ListBooks.js';
import Search from './Search.js';
import BookDetail from './DetailBook.js';
import Profile from './Profile.js';
import AddBook from './CreateBook.js';

import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Modal,ModalBody,ModalHeader,Button, Label, Col, Row} from 'reactstrap';
import { postBook, fetchBooks, editBook, deleteBook,loginUser, logoutUser, 
  registerUser, editUser, editPassword, fetchUsers} from '../redux/Action_Create';
import { Control, LocalForm, Errors  } from 'react-redux-form';

const required = (val) => val && val.length;
const requiredNum = (val) => !!(val);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxVal = (len) => (val) => !(val) || (val<= len);
const minVal = (len) => (val) => (val) && (val>= len);
const isNumber = (val) => !isNaN(Number(val));

const mapStateToProps= (state)=>{
  return{
    books: state.books,
    auth: state.auth,
    users: state.users
  };
}

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => { dispatch(fetchBooks())},
  fetchUsers: () => { dispatch(fetchUsers())},
  postBook: (name, author, price, pages) => dispatch(postBook(name, author, price, pages)),
  editBook: (_id, name, author, price, pages) => dispatch(editBook(_id, name, author, price, pages)),
  deleteBook: (_id) =>  dispatch(deleteBook(_id)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  registerUser: (creds) => dispatch(registerUser(creds)),
  editUser: (_id, firstname, lastname, roll, email) => dispatch(editUser(_id, firstname, lastname, roll, email)),
  editPassword : (_id,username,password) => dispatch(editPassword(_id,username,password)),
 
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchBooks();
    if(this.props.auth.isAuthenticated&&this.props.auth.userinfo.admin){
      this.props.fetchUsers();
    }
  }
    constructor(props){
        super(props);
        this.state={
          isDeleteModalOpen: false,
          isEditModalOpen: false,
          selectedBook: null
        };
        this.toggleDeleteModal=this.toggleDeleteModal.bind(this);
        this.toggleEditModal=this.toggleEditModal.bind(this);
        this.changeSelected=this.changeSelected.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
      }
    
      handleSubmitEdit(values) {
        this.toggleEditModal();
        this.props.editBook(this.state.selectedBook._id, values.name, values.author,
         values.price, values.pages);     
        }
    
    changeSelected(_id){
      this.setState({selectedBook:this.props.books.books.filter((book)=>(book._id===_id))[0]});
    }

    toggleDeleteModal(){
      this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen})
    }
    
    toggleEditModal(){
      this.setState({isEditModalOpen: !this.state.isEditModalOpen});
    }

    render(){
      const BookWithId = ({match}) => {
      let selectedBook=this.props.books.books.filter((book) => (book._id)===(match.params.bookId))[0]
      let notFoundErr=null;
      if(selectedBook===undefined){
      notFoundErr=("\n\n Error 404 :  Book not found");
      }  
      return(
          <BookDetail book={selectedBook}
          isLoading={this.props.books.isLoading}
          errMess={this.props.books.errMess||notFoundErr}
          toggleEditModal={this.toggleEditModal}
          changeSelected={this.changeSelected}
          isAdmin={(this.props.auth.userinfo==null)?false:(this.props.auth.userinfo.admin)}
          />
          );
      };
    
      const UserWithId = ({match}) => {
        let selectedUser=this.props.users.users.filter((user) => ((user._id)===(match.params.userId)))[0];
        let notFoundErr=null;
        if(selectedUser===undefined){
        notFoundErr=("\n\n Error 404 :  User not found");
        }  
        return(
          <div>UserDetail</div>
            );
        };
   
      const PrivateRouteCommon = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/home',
                state: { from: props.location }
              }} />
        )} />
      );

      const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.auth.isAuthenticated&&this.props.auth.userinfo.admin
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/home',
                state: { from: props.location }
              }} />
        )} />
      );

      const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.auth.isAuthenticated&&!this.props.auth.userinfo.admin
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/home',
                state: { from: props.location }
              }} />
        )} />
      );

    return ( 
          <div className="App">
          <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          registerUser={this.props.registerUser}
          />
          <Switch location={this.props.location}>
                      <Route exact path='/home' component={() => <Home />} />
                      <Route exact path='/search' component={() => <Search 
                      books={this.props.books.books}
                      booksLoading={this.props.books.isLoading}
                      booksErrMess={this.props.books.errMess}
                      isSignedIn={this.props.auth.isAuthenticated}
                      isAdmin={(this.props.auth.userinfo==null)?false:(this.props.auth.userinfo.admin)}
                      toggleEditModal={this.toggleEditModal}
                      toggleDeleteModal={this.toggleDeleteModal}
                      changeSelected={this.changeSelected}
                />}
                />

                      <Route exact path='/books' component={() => <Booklist
                      books={this.props.books.books}
                      booksLoading={this.props.books.isLoading}
                      booksErrMess={this.props.books.errMess}
                      isSignedIn={this.props.auth.isAuthenticated}
                      isAdmin={(this.props.auth.userinfo==null)?false:(this.props.auth.userinfo.admin)}
                      auth={this.props.auth}
                      toggleEditModal={this.toggleEditModal}
                      toggleDeleteModal={this.toggleDeleteModal}
                      changeSelected={this.changeSelected}/>}/>
                      <Route path='/books/:bookId' component={BookWithId} />
                      <PrivateRouteCommon exact path='/profile' component={() => <Profile
                      auth={this.props.auth}
                      editUser={this.props.editUser} 
                      editPassword={this.props.editPassword}/>
                      }
                      />
                       <PrivateRouteAdmin exact path='/add_book' component={() => <AddBook
                      isAdmin={(this.props.auth.userinfo==null)?false:(this.props.auth.userinfo.admin)}
                      postBook={this.props.postBook}
                      books={this.props.books.books}
                      booksLoading={this.props.books.isLoading}
                      booksErrMess={this.props.books.errMess}
                      />
                      }/>
                      <PrivateRoute exact path='/profile' component={() => <Profile
                      auth={this.props.auth}
                      editUser={this.props.editUser} />}
                      />
                    
                      <PrivateRouteAdmin path='/users/:userId' component={UserWithId}/>
                      <Redirect to="/home"/>
          </Switch>
        <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                     <ModalHeader toggle={this.toggleDeleteModal}>
                         Confirm Deletion
                     </ModalHeader>
                     <ModalBody>
                       Book details : <br/><br/>
                        Name : {this.state.selectedBook?this.state.selectedBook.name:''} <br/>
                        Authors : {this.state.selectedBook?this.state.selectedBook.author:''} <br/>
                        Page Number : {this.state.selectedBook?this.state.selectedBook.pages:''} <br/>
                        Price : {this.state.selectedBook?this.state.selectedBook.price:''} <br/> <br/>
                        Are you sure you wish to delete this book ? <br/><br/>
         <Button color="danger" onClick={()=>{
           this.props.deleteBook(this.state.selectedBook._id);
           this.toggleDeleteModal();}}>Yes</Button>{' '}  
         <Button color="warning" onClick={()=>{
           this.toggleDeleteModal();
         }}>No</Button>
                     </ModalBody>
          </Modal>
          {this.state.selectedBook?(
                 <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal}>
                     <ModalHeader toggle={this.toggleEditModal}>
                         Edit a book
                     </ModalHeader>
                     <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitEdit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="name" md={2}>Name </Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        defaultValue={this.state.selectedBook.name}
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                            //uniqueName: uniqueName(this.state.selectedBook.name)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters'
                                        }}
                                     />
                                </Col>
                            </Row>                    
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Authors </Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        defaultValue={this.state.selectedBook.author}
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="isbn" md={4}>Pages</Label>
                                <Col md={8}>
                                    <Control.text model=".pages" id="isbn" name="pages"
                                        defaultValue={this.state.selectedBook.pages}
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(1), maxLength: maxLength(6), isNumber
                                            //uniqueIsbn: uniqueIsbn(this.state.selectedBook.isbn)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".pages"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            

                                        }}
                                     />
                                </Col>
                            </Row>

                        <Row className="form-group">
                                <Label htmlFor="copies" md={6}> Prices</Label>
                                <Col md={6}>
                                    <Control.text model=".price" id="copies" name="price"
                                        defaultValue={this.state.selectedBook.price}
                                        className="form-control"
                                        validators={{
                                            requiredNum, minVal: minVal(1), isNumber
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".price"
                                        messages={{
                                            requiredNum: 'Required',
                                            minVal: 'Must be greater than 0',
                                            isNumber: 'Must be a number'
                                        }}
                                     />
                                </Col>
                            </Row>

                       

                     
                        
                          <Row>
                          <Col className="ml-auto mr-auto">
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                        </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
               
          </Modal>):(<React.Fragment/>)}

          </div>
           );     
    }
    }

    export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));