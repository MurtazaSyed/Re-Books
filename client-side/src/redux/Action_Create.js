import * as ActionTypes from './actionType';
import {baseUrl} from '../baseUrl'

export const addBook = (book) => ({
  type: ActionTypes.ADD_BOOK,
  payload: book
});

export const postBook = (name, author, price, pages) => (dispatch) => {
    const newBook = {
      name: name, author: author, price: price, pages: pages
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'books', {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        }
     //   ,        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { alert('Book has been added successfully');
      return  dispatch(addBook(response));})
    .catch(error =>  { alert('Your book could not be added\nError: '+error.message); });
};

export const editBook = (_id, name, author, price, pages) => (dispatch) => {

  const newBook = {
    name: name, author: author,price: price,page: pages 
  };
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'books/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => (dispatch(editBookdispatch(response))))
  .catch(error =>  {  
  alert('Your book could not be edited\nError: '+error.message); });
};

export const editPassword = (_id,username,password) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'users/password/' + _id, {
    method: "PUT"
  //  ,     credentials: 'same-origin'
    ,      body: JSON.stringify({password: password}),
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    } })
.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText+'\n ');
      error.response = response;
      throw error;
    }
  },
  error => {
        throw error;
  })
.then(response => response.json())
.then(response => { 
  let newCreds={username: username, password: password};
  localStorage.removeItem('creds');
  localStorage.setItem('creds', JSON.stringify(newCreds));
  alert('Password changed successfully');
  return dispatch(editPasswordDispatch(newCreds));})
.catch(error =>  {  
alert('Your password could not be changed\nError: '+error.message); });
}

export const editUser = (_id, username, email) => (dispatch) => {

  const newUser = {
    username: username,
email: email  };
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'users/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    localStorage.removeItem('userinfo');
    localStorage.setItem('userinfo', JSON.stringify(response));
    return dispatch(editUserdispatch(response));})
  .catch(error =>  {  
  alert('Your profile could not be edited\nError: '+error.message+'\n May be someone has already registered with that Roll No. or Email'); });
};

export const deleteBook = (_id) => (dispatch) => {
  
  const bearer = 'Bearer ' + localStorage.getItem('token');    
  return fetch(baseUrl + 'books/' + _id, {
      method: "DELETE"
    //  ,       credentials: "same-origin"
      ,       headers: {
        'Authorization': bearer
      }
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(deleteBookdispatch(response)))
  .catch(error =>  {alert('Your book could not be deleted\nError: '+error.message); });
};

export const fetchBooks = () => (dispatch) => {
    dispatch(booksLoading(true));
    return fetch(baseUrl+'books')
        .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(books => dispatch(addBooks(books)))
    .catch(error => dispatch(booksFailed(error.message)));
}


export const fetchUsers = () => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  dispatch(usersLoading(true));
  return fetch(baseUrl+'users',{
    headers: {
      'Authorization': bearer
    }
  })
      .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(users => dispatch(addUsers(users)))
  .catch(error => dispatch(usersFailed(error.message)));
}


export const booksLoading = () => ({
    type: ActionTypes.BOOKS_LOADING
});

export const booksFailed = (errmess) => ({
    type: ActionTypes.BOOKS_FAILED,
    payload: errmess
});

export const addBooks = (books) => ({
    type: ActionTypes.ADD_BOOKS,
    payload: books
});

export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users
});

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING
});

export const editBookdispatch = (books) => ({
  type: ActionTypes.EDIT_BOOK,
  payload: books
});

export const returnBookdispatch = (issue) => ({
  type: ActionTypes.RETURN_ISSUE,
  payload: issue
});

export const editUserdispatch = (USER) => ({
  type: ActionTypes.EDIT_USER,
  payload: USER
});

export const editPasswordDispatch = (CREDS) => ({
  type: ActionTypes.EDIT_PASSWORD,
  payload: CREDS
})

export const deleteBookdispatch = (resp) => ({
  type: ActionTypes.DELETE_BOOK,
  payload: resp
});

export const requestLogin = (creds) => {
  return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
  }
}

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token,
      userinfo: response.userinfo
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}

export const loginUser = (creds) => (dispatch) => {

  dispatch(requestLogin(creds));
  return fetch(baseUrl + 'users/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok) {
          return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
      },
      error => {
          throw error;
      })
  .then(response => response.json())
  .then(response => {
      if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('creds', JSON.stringify(creds));
          localStorage.setItem('userinfo', JSON.stringify(response.userinfo));    
         // dispatch(fetchIssues(!response.userinfo.admin));      
          if(response.userinfo.admin) {
            dispatch(fetchUsers())
          }
          setTimeout(()=>{
            logoutUser();
            alert('Your JWT token has expired. \nPlease log in again to continue.');
           },3600*1000);
          // Dispatch the success action
          dispatch(receiveLogin(response));
      
      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => {
    alert(error.message+'\n'+"Username and password didn't match");
     return dispatch(loginError(error.message));})
};

export const registerUser = (creds) => (dispatch) => {


  return fetch(baseUrl + 'users/signup', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok) {
          return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
      },
      error => {
          throw error;
      })
  .then(response => response.json())
  .then(response => {
      if (response.success) {
          // If Registration was successful, alert the user
          alert('Registration Successful');
        }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => alert(error.message+'\n'+
      'May be someone has already registered with that username, email or Roll No.\nTry Entering a new username,email or Roll No. '))
};



export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess
});


export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}


export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');  
  localStorage.removeItem('userinfo');  
  dispatch(receiveLogout())
}