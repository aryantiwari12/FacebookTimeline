import React from "react";
import Pagination from '@mui/material/Pagination';
import { usePagination } from './../hooks/pagination';

const Pages = ({ data }) => {

    const [totalPages, startperpageindex, endPageindex, displaypage] = usePagination(10, data.length)

    return (
        <div>
            {
                (() => {
                    const displayPost = []
                    for (let i = startperpageindex; i <= endPageindex; i++) {
                        displayPost.push(
                            <div key={data[i].id}>
                                <h3><span>{i + 1}</span></h3>
                            </div>
                        )
                    }
                    return displayPost;
                })()
            }
            <Pagination color="primary" count={totalPages}
                onChange={(event, value) => displaypage(value)}
            />
        </div>
    )

}

export default Pages;