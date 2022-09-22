import React,{Component} from 'react';
import {Button, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors  } from 'react-redux-form';
import Loading from './LoaderBook';

const required = (val) => val && val.length;
const requiredNum = (val) => !!(val);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxVal = (len) => (val) => !(val) || (val<= len);
const minVal = (len) => (val) => (val) && (val>= len);
const isNumber = (val) => !isNaN(Number(val));

class CreateBook extends Component {

    constructor(props){
        super(props);
        this.state={
        }

    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    let uniqueIsbn=(val) =>(!this.props.books.some((book)=>(book.isbn===val)))
    let uniqueName=(val) =>(!this.props.books.some((book)=>(book.name===val)))

    if (this.props.booksLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.booksErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
 return (
    <div className="container">
    <div className="row justify-content-center heading">
    <div className="col-12">
  <h3 align="center">  Add a book</h3>
  </div>
    </div>
    <div className="row row-content justify-content-center">
    <LocalForm onSubmit={(values) => {
        this.props.postBook(values.name, values.author, values.price, values.pages);
    }}>
                    <Row className="form-group">
                                <Label htmlFor="name" md={2}>Name </Label>
                                <Col md={4}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name of book"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3),uniqueName
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 2 characters',
                                            uniqueName: ' There exists a book with this name already'
                                        }}
                                     />
                                </Col>
                                 <Label htmlFor="author" md={2}>Authors </Label>
                                <Col md={4}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Name of authors"
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
                                            minLength: ' Must be greater than 2 characters'
                                        }}
                                     />
                                </Col>

                                <Col md={4}>
                                    <Control.text model=".price" id="author" name="price"
                                        placeholder="Price"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(1)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".price"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 1 characters'
                                        }}
                                     />
                                </Col>

                                <Col md={4}>
                                    <Control.text model=".pages" id="author" name="pages"
                                        placeholder="Total Pages"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(1)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".pages"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be greater than 1 characters'
                                        }}
                                     />
                                </Col>
                            </Row>


                          <Row className="align-self-center">
                          <Col className="text-center">
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                        </Col>
                        </Row>
                    </LocalForm>
                    </div>
                <br/>
    </div>
 );

}

}

export default CreateBook;