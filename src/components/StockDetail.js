import React from "react";
import SimilarContainer from "./Stock Detail/SimilarContainer.js";
import StockInfo from './Stock Detail/StockInfo.js'


const StockDetail = ({handleSearchRequest}) => {
  // let history = useHistory();


  return (
    <div>
     <StockInfo/>
     <SimilarContainer handleSearchRequest={handleSearchRequest}/>
    </div>
  );
};

export default StockDetail;
