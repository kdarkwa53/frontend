

const ErrorAlert = ({ msg, show }) => {
    return (
        show ? (
            <div className="ant-form-item-explain ant-form-item-explain-error" >
                <div style={{color: "red"}} role="alert">
                    {msg}
                </div>
            </div>
        ) : ""
    )
}

export default ErrorAlert
