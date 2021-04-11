import React from "react";
import SimilarContainer from "./Stock Detail/SimilarContainer.js";
import StockInfo from './Stock Detail/StockInfo.js'


const StockDetail = ({handleSearchRequest, addToWishlist}) => {
  // let history = useHistory();


  return (
    <div>
     <StockInfo addToWishlist={addToWishlist}/>
     <SimilarContainer 
     handleSearchRequest={handleSearchRequest}/>
    </div>
  );
};

export default StockDetail;
