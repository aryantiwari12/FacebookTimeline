import axios from "axios";
import IMAGEE from "./img/1.jpg";
import IMAGEE1 from "./img/2.png";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
// import Moment from 'moment';



// import _ from 'lodash';
// import Pagination from "./Pagization";


// const pagesize=10;
export default function Mytask() {
  
  const [file, setFile] = useState(null);
  const [name, setname] = useState("");
  // const [data, setdata] = useState([]);
  
  
  // const [paginated,setpaginated]=useState()
  // // const [post,setpost]=useState(" ")
  // const [currentPage, setCurrentPage] = useState(1);
  const [slectedDate, setSlectedDate] = useState();
  // const [postsPerPage] = useState(6);

  // const [background,setbackground]=useState("")
  // const [post,setpost]=useState("")
  // const [created_at,setcreated_at]=useState("")

  // const items={username,post,background};

  
 function onupload(e) {
    const url = "http://139.59.47.49:4004/api/upload/image";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
   
    
   axios.post(url, formData, config).then((response) => {
      console.log(response);
      axios
        .post("http://139.59.47.49:4004/api/post", {
          post: name,
          background: response.data.filename,
          
          
          
        })
        .then((res) => {
          console.log(res);
        });
      });
   }
   const [data, setdata] = useState([]);
  useEffect(() => {
    // const [data, setdata] = useState([]);
    axios
      .get(`http://139.59.47.49:4004/api/posts?limit=10&start=1&orderby=0`)
      .then((resp) => {
        setdata(resp.data);
        
        
        // setpaginated(_(resp.data).slice(0).take(pagesize).value())
        console.log(resp);
      });
  }, []);

  
  // const pagecount=data?Math.ceil(data.length/pagesize):0;
  // if(pagecount===1) return null;
  // const pages=_.range(1,pagecount+1);
  //get  current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  //  const pagination=(pageNo)=>{
  //    setCurrentPage(pageNo);
  //    const startindex=(pageNo-1)*pagesize;
  //    const pagizatedpost=_(data).slice(startindex).take(pagesize).value();
  //    setpaginated(pagizatedpost)
  //  }
  const formatDate=(date)=> {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const api=()=>{
    axios.get(`http://139.59.47.49:4004/api/posts?limit=10&start=1&date=${formatDate(slectedDate)}&orderby=0`)
    .then((resp)=>{
      // const formatDate = Moment().format('DD-MM-YYYY')
      // created_at.split('T')
      console.log(resp)
    },[])
  }

  return (
    <div className="container shadow p-3 mb-5 bg-body rounded rounded p-2">
      <div class="card mb-3">
        <img src={IMAGEE} class="card-img-top " height={250} alt="..." />
        <div class="card-body">
          <img src={IMAGEE1} class="img1" height={100} alt="" />
          <h3>Jurry Luis </h3>
          <hr />
          <h4 class="text-primary">Timeline</h4>
        </div>
      </div>
      <div class="container shadow p-3 mb-5 bg-body rounded bg-white">
        <div class="row">
          <div class="col-sm-4  text-center">
            <img src={IMAGEE1} width={50} alt="" />
          </div>
          <div class="col-sm-8 text-end">
            <input
              type="text"
              class="form-control"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              placeholder="What's on your mind?"
              aria-label="Username"
            />
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog ">
                <div class="modal-content">
                  <div class="modal-header text-center">
                    <h5 class="modal-tittle">Create Post </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="col-sm-4 text-center p-2">
                      <img src={IMAGEE1} height={20} alt="" />
                      <span className="p-2">Jurry Luis</span>
                    </div>
                    <div id="image-upload" class="shadow  bg-body rounded">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        class="text-center"
                      />
                      <img
                        src={file ? URL.createObjectURL(file) : ""}
                        class="w-100 h-100 border-0 text-dark"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      id="input-image"
                      accept="image/*"
                      class="btn btn-success w-100"
                    />
                    <button
                      type="button"
                      onClick={onupload}
                      
                      class="btn btn-success w-100"
                      data-bs-dismiss="modal"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container shadow p-3 mb-5 bg-body rounded bg-white">
        <div className="row">
          <div className="col-sm-4 ">
            <h1>POST</h1>
          </div>
          <div className="col-sm-8 p-2 text-end">
            <button
              class="btn bg-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Fillter
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Post filter
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="text-center">
                      <h6>Use filter to find Post on your timeline. </h6>
                      <p>This will not effect how other see your Timeline</p>
                      <span>
                        Go To:
                        {/* <input type="date"  /> */}
                        <DatePicker 
                        placeholderText={new Date()}
                        selected={slectedDate} 
                        onChange={Date=>setSlectedDate(Date)}
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                        filterDate={(Date) => Date.getDay()}
                        isClearable
                        showYearDropdown
                        scrollableMonthYearDropdown
                        />
                      </span>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary w-100"
                      data-bs-dismiss="modal" 
                      // onClick={() =>{`http://139.59.47.49:4004/api/posts?limit=10&start=1&date=${date}&orderby=0`}}
                      //  onClick={`http://139.59.47.49:4004/api/posts?limit=10&start=1&date=${date}&orderby=0`}
                       onClick={api}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {data.map((res) => {
        return (
          <div className="container shadow p-3 mb-5 bg-body rounded text-start mt-5 bg-white">
            <div className="row">
              <div className="col-sm-4 text-center p-2" id="page">
                <img src={IMAGEE1} height={50} alt="" />
                <span className="p-2">jarry Goan</span>
              </div>
              <div className="col-sm-8 text-end ">
                <h1>...</h1>
              </div>
            </div>
            <h6 class="text-start">{res.created_at}</h6>
            <h4 className="centered">{res.post}</h4>
            <img
              src={`http://139.59.47.49:4004/api/profile_image?profile_image=${res.background}`}
              class="w-100 rounded p-2"
              height={250}
              alt=""
            />
          </div>


        );
      })}
         
         {/* <nav>
           <ul class="pagination justify-content-center">
          
           {
             pages.map((page)=>(
              <li className={
                page===currentPage? "page-item active":"page-item"
              }>
                <p className="page-link"
                onClick={()=>pagination(page)}
                >{page}</p>
              </li>
             ))
           }
            
           <li class="page-item">
            <a class="page-link" href="!#">Next</a>
           </li>
          </ul>
</nav> */}





    </div>
  );
}
