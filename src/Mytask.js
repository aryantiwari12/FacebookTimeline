import axios from "axios";
import IMAGEE from "./img/1.jpg";
import IMAGEE1 from "./img/2.png";
import IMAGEE2 from "./img/13.png";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";



const API_ROOT="http://139.59.47.49:4004"; // MAIN ROOT API

export default function Mytask() {

  const [file, setFile] = useState(null);
  const [name, setname] = useState("");
  const [slectedDate, setSlectedDate] = useState();
 


  function onupload(e) {
    const url = `${API_ROOT}/api/upload/image`;
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
      
        .post(`${API_ROOT}/api/post`, {   
          post: name,
          background: response.data.filename,
        })
        .then((res) => {
          console.log(res);

        });
    });
  }
  const [data, setdata] = useState([]);
 
  function getuser() {
    axios.get(`${API_ROOT}/api/posts?limit=10&start=1&orderby=0${slectedDate ? `&date=${formatDate(slectedDate)}` : ''}`)
      .then((resp) => {
        setdata(resp.data);
      });
  }

  useEffect(() => {
    getuser()
  
  }, [slectedDate]);

  const formatDate = (date) => {
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
const DeleteUser = (id) => {
    axios.delete(`${API_ROOT}/api/post/delete/${id}`)
      .then(res => {
        console.log(res);
        getuser()
        console.log(data);
      })
  }
const updateuser = (id) => {
    const link = `${API_ROOT}/api/upload/image`;
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(link, formData, config).then((response) => {
      console.log(response);
      axios.put(`${API_ROOT}/api/post`, {
        id: id,
        post: name,
        background: response.data.filename
      })
        .then((res) => {
          console.log(res);
          getuser()
        })
    })
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
          <hr class="color12" size="5" />
        </div>
      </div>
      <div class="container shadow p-3 mb-5 bg-body rounded bg-white">
        <div class="row">
          <div class="col-sm-4  text-center">
            <img src={IMAGEE1} width={50} alt="" />
          </div>
          <div class="col-sm-8 text-end">
            <input style={{ backgroundColor: "#eeeee4" }}
              type="text"
              class="form-control rounded-pill"
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
            <h1>Posts</h1>
          </div>
          <div className="col-sm-8 p-2 text-end">
            <button style={{ backgroundColor: "#eeeee4" }}
              class="btn  text-black"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Filters
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

                        <DatePicker
                          placeholderText={new Date()}
                          selected={slectedDate}
                          onChange={Date => setSlectedDate(Date)}
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
                      data-bs-dismiss="modal" >
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
                <span className="p-2 text-dark fw-bold">Jurry Luis</span>
              </div>
              <div className="col-sm-8 text-end">
                <input type="image" src={IMAGEE2} class="www" data-bs-toggle="modal" data-bs-target={`#exampleModal${res.id}`} alt="" />
                <div class="modal fade" id={`exampleModal${res.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-secondary" id="exampleModalLabel1">CRUD operation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
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
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          id="input-image"
                          accept="image/*"
                          class="btn btn-secondary w-25 float-start mt-2"
                        />
                        <button type="button" class="btn btn-success mt-2 m-2" onClick={(e) => { e.preventDefault(); updateuser(res.id) }}>update</button>
                        <button type="button" class="btn btn-danger mt-2 m-2" onClick={() => DeleteUser(res.id)}>Delete</button>
                      </div>
                      <div class="modal-footer">
                       <button type="button" class="btn btn-primary  w-100" aria-label="Close" data-bs-dismiss="modal" >Done</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h6 class="text-start">{formatDate(res.created_at)}</h6>
           <h4 class="centered text-center  w-25"><span class="boxx bg-white p-1">{res.post}</span></h4>
            <img
              src={`${API_ROOT}/api/profile_image?profile_image=${res.background}`}
              class="w-100 rounded p-2"
              height={250}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

