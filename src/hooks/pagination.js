import {usestate} from "react";


export const usePagination=(perPageRecords,totalPageRecords)=>{
    
    const totalPages=Math.ceil(totalPageRecords/perPageRecords)
    const [startperpageindex,setstartPageIndex]=usestate(0)
    const [endPageindex,setEndPageIndex]=usestate(perPageRecords-1)
    const [currentPageIndex,setCurrentpageIndex]=usestate(1)

    // function

    const displaypage=(pageNo)=>{
        setCurrentpageIndex(pageNo)
        let end_page_index=(perPageRecords*pageNo)-1
        let start_page_index=[perPageRecords*pageNo]-perPageRecords
        setstartPageIndex(start_page_index)

        if(end_page_index > totalPageRecords){
            setEndPageIndex(totalPageRecords-1)
        }else{
            setEndPageIndex(end_page_index)
        }
    }
    return{
        totalPages,startperpageindex,endPageindex,currentPageIndex,displaypage
    }
}