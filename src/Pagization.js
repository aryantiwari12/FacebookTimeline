import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav style={{ marginTop: "-4%", marginLeft: "55%" }}>
        <div className="pagination">
          {pageNumbers.map((number) => (
            <div key={number} className="page-item active">
              <a
                style={{
                  outline: "none ",
                  color: "black",
                  fontWeight: "bold",
                  border: "none ",
                  margin: "2px",
                  backgroundColor:'orange',
                  boxShadow:'none'
                }}
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </div>
          ))}
        </div>
       
      </nav>
    </>
  );
};

export default Pagination;
