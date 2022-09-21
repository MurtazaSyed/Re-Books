import React,{Component} from 'react';

class HomeBook extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    return(
        <div className="container mt-4 home text-center align-self-center">
        <br/><br/><br/>
            <div className="row mt-3 darkbg text-center justify-content-center">
            <h1 align="center">BOOKMENIA</h1>
            </div>
            <div className="row darkbg">

        <br/><br/><br/>
        <br/><br/><br/>
</div>
<div className="row darkbg justify-content-center">

<br/>
<br/>
    </div>
    <br/><br/>
    <br/><br/><br/>
</div>
);
}

}

export default HomeBook;