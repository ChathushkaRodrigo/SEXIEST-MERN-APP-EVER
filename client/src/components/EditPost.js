import React, { PureComponent } from 'react'
import axios from 'axios';
class EditPost extends PureComponent {
    constructor(props){
        super(props);

        this.state ={
            topic:"",
            description:"",
            postCatagory:""
        }

    }


    handleInputChange = (e)=>{
        const {name,value} = e.target;
        this.setState({
            ...this.setState,
            [name]:value
        })
    }

onSubmit =(e)=>{
    
    e.preventDefault();
    const id=this.props.match.params.id;
    const {topic,description,postCatagory} = this.state;

    const data={
        topic:topic,
        description:description,
        postCatagory:postCatagory
    }
    console.log(data);

axios.put(`http://localhost:8000/posts/update/${id}`,data).then((res)=>{
  if(res.data.success){
      alert("Post Updated Successfully")
    this.setState({
            topic:"",
            description:"",
            postCatagory:""

    })
  }
})



   
}

    componentDidMount(){
        const id=this.props.match.params.id;
    
        axios.get(`http://localhost:8000/post/${id}`).then((res)=>{
            if(res.data.success){
               
               this.setState({


                   topic:res.data.post.topic,
                   description:res.data.post.description,
                   postCatagory:res.data.post.postCatagory
               });
    
               
        }
    });
    }
    



    render(){

        return(
                      <div>
                          <h1>Edit Post</h1>
         <form>
        <div className="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">topic</label>
          <div class="col-sm-10">
            <input type="text"  id="staticEmail" name="topic" onChange={this.handleInputChange} value={this.state.topic} placeholder="Enter topic"/>
      
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassword"  className="col-sm-2 col-form-label">Description</label>
          <div  className="col-sm-10">
            <input type="text" className="form-control" id="inputPassword" name="description" placeholder="Enter description" value={this.state.description} onChange={this.handleInputChange} />
      
      
          </div>
        </div>
      
      
        <div className="form-group row">
          <label for="catagory"  className="col-sm-3 col-form-label">Post Catagory</label>
          <div  className="col-sm-10">
            <input type="text" className="form-control" id="postCatagory" name="postCatagory" placeholder="Enter Catagory" value={this.state.postCatagory} onChange={this.handleInputChange} />
          </div>
        </div>
        
      
      
        <button className="btn btn-success" type="submit" onClick={this.onSubmit}>   Update Post </button>
      
      
                      
      
      </form>
      
       </div>
      
      
      
      
            )
          }
}

export default EditPost