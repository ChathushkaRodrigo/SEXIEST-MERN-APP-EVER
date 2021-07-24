import React, { Component } from 'react';
import axios from 'axios';


export default class PostDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post:{}
        };
    }

componentDidMount(){
    const id=this.props.match.params.id;

    axios.get(`http://localhost:8000/post/${id}`).then((res)=>{
        if(res.data.success){
           
           this.setState({
               post: res.data.post
           });

           
    }
});
}

    render() {

        const {topic,description,postCatagory}=this.state.post; 
        return (
            <div>
                Post Details
                        <center> <h4>{topic}</h4> </center>
                     
                        <dl className="row">
                        <dt className="col-sm-3">Description :</dt>
                        <dd className="col-sm-9">{description}</dd>

                        <dt className="col-sm-3">Category :</dt>
                        <dd className="col-sm-9"> {postCatagory} </dd>
  
                        </dl>

            </div>
        )
    }
}

