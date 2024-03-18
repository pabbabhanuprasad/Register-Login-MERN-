function Validation(values){
    console.log("values",values);
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/


    if(values.name === ""){
        error.name="Name should not be empty"
    }else{
        error.name=""
    }

    if(values.email === ""){
        error.email="Email should not be empty"
    }else if(!email_pattern.test(values.email)){
        error.email="Email pattern not match"
    }else{
        error.email=""
    }

    if(values.password === ""){
        error.password="Password should not be empty"
    }else{
        error.password=""
    }
    return error;
}
export default Validation;