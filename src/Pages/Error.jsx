import React from 'react'

const Error = ({error=null}) => {
  return (
    <div className="error">
        {
            error === null?
            <p>Somthing went wrong!.Please check your internet connetion and try again!</p>
            :
            <p>{error}</p>
        }
    </div>
  )
}

export default Error
