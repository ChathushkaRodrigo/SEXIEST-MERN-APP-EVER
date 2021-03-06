/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { Component}from 'react';
import axios from 'axios';

export default class Home extends Component{

  constructor(props){
    super(props);
    this.state={
      posts:[]
    };

  }

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
   axios.get("http://localhost:8000/posts").then(res=>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      })
      
    }
  });
  
}
onDelete =(id)=>{
  
axios.delete(`http://localhost:8000/post/delete/${id}`).then((res) =>{

  alert("Deleted Successfully");

  this.retrievePosts();
})

}
filterData(posts,searchKey){
  const result = posts.filter((post) =>

    post.topic.toLowerCase().includes(searchKey)||
    post.description.toLowerCase().includes(searchKey) ||
    post.postCatagory.toLowerCase().includes(searchKey) 
  
  
  )
  this.setState({posts:result})

}

handleSearchArea= (e)=>{

  const searchKey = e.currentTarget.value;
  axios.get("http://localhost:8000/posts").then(res=>{
    if(res.data.success){
     this.filterData(res.data.existingPosts,searchKey)
      
    }
  });


}


  render(){
    return(
      <div className="container">
        <p>All Posts </p>
            <div className="col-lg-3 mt-2 mb-2">
              <input className="form-control" type="search " name="searchQuery" onChange={this.handleSearchArea}/>
            </div>




          <table class="table">
            <thead>
              <tr>
                <th scope="col" > #</th>
                <th scope="col" > Topic</th>
                <th scope="col" > Description</th>
                <th scope="col" > Post catagory</th>
                <th scope="col" > Action</th>
              
              </tr>

            </thead>

                <tbody>
                {this.state.posts.map((posts,index)=>(
                  <tr key={index}>
                    <th scope ="row"> {index+1}</th>
                    <td>
                      <a href={`/post/${posts._id}` } style={{textDecorationLine:'none'}}>
                    
                      {posts.topic}
                     </a>
                      </td> 
                    <td>{posts.description}</td>
                    <td>{posts.postCatagory}</td>
                    <td>
                    <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                      <i className="fas fa-edit " ></i> &nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" href={``} onClick={()=>this.onDelete(posts._id) }>
                      <i className="far fa-trash-alt " ></i> &nbsp;Delete
                    </a>
                    </td>
                  </tr>
                ))}

                  
                </tbody>


          </table>
                    <button className="btn btn-success"> <a href="/add" style={{textDecoration:'none',color:'white'}}> Create New Post </a> </button>

      </div>

    )

  }
} 