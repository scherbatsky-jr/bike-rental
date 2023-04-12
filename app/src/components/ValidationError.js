import "../assets/css/components/validationError.scss"

function ValidatonError({message}) {

  return (
    <span className="validation-error">{
      typeof message == 'string' || message instanceof String ?
        message :
        " "
    }</span>
  )
}

export default ValidatonError;
