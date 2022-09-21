import React,{Component} from 'react';
import {Row,Col, Card, CardText, CardHeader, CardFooter, CardBody,CardTitle } from 'reactstrap';
import Loading from './LoaderBook';
function RenderBook({book,isAdmin,toggleEditModal,changeSelected}) {
    if (book != null)
        return(
        <Card>
       
       <CardHeader tag="h3">{book.name} &nbsp; &nbsp; &nbsp;&nbsp;
       {isAdmin?(<span className="fa fa-pencil Option" onClick={()=>{changeSelected(book._id);toggleEditModal();}}/>):(<React.Fragment/>)}
        </CardHeader>
        <CardBody>
          <CardTitle align="right"> - {book.author}</CardTitle>
          <CardText>
              <b> Page: </b> {book.page} <br/><br/>
              <b> Price: </b> {book.price} <br/><br/>
      </CardText><br/>
        </CardBody>
        <CardFooter className="text-muted">
        <Row>
        <Col md={6}></Col>
        Created at : {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric',minute: 'numeric', hour12: true }).format(new Date( Date.parse(book.createdAt)))}
        <Col md={6}>
        Last updated at : {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit',hour: 'numeric',minute: 'numeric', hour12: true}).format(new Date( Date.parse(book.updatedAt)))} 
        </Col>
        </Row>
        </CardFooter>
        </Card>
        );
    else
        return(
            <div></div>
        );
        }


class DetailBook extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
      }
render(){
    if (this.props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.errMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.errMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
        return(
    
            <div className="container full">
            <div className="row heading">
              <div className="col-12">
              <br/>        <br/>
              <RenderBook book={this.props.book} isAdmin={this.props.isAdmin}
                        toggleEditModal={this.props.toggleEditModal}
                        changeSelected={this.props.changeSelected}>
                  </RenderBook>
    
            <br/>
            </div>
        </div>
      </div>
        );
}

}

export default DetailBook;