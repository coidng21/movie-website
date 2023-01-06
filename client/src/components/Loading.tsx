import React, { Fragment } from "react";

const LoadingPage = (() => {
    return (
        <Fragment>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <p style={{margin: "8px"}}>Loading...<br/>
                Please Reload or Direct to </p>
                <a href={`/`} className="detail-btn"><button style={{margin: '8px'}}>Main Page</button></a>
            </div>
        </Fragment>
    )
})

export default LoadingPage;