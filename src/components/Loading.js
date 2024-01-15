import React from 'react'

function Loading({ show }) {
    return show && (

        <div className="spinner-border text-info text-center " role="status">
            <span className="visually-hidden">Loading...</span>
           
        </div>

    )
}

export default Loading