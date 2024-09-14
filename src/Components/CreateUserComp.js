import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";
import { Button, Card, Col, Input, Row, Typography, Alert} from "antd";

let CreateUserComp = (props) => {
    let {createNotification} = props

    let [email, setEmail] = useState(null)
    let [message, setMessage] = useState("")
    let [password, setPassword] = useState(null)
    let [error, setError] = useState({})

    let navigate = useNavigate()

    useEffect(() => {
        checkInputErrors()
    }, [email, password])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if(email == "" || email?.length < 3 || (email != null && !emailPattern.test(email))){
            updatedErrors.email = "Incorrect email format"
        }

        if(password != null){
            if(password == "" || password?.length < 5){
                updatedErrors.password = "Incorrect password, maybe too short"
            }
        }     

        setError(updatedErrors)
    }

    let changeEmail = (e) => {
        let email = e.currentTarget.value
        setEmail(email)
    }

    let changePassword = (e) => {
        let password = e.currentTarget.value
        setPassword(password)
    }

    let clickCreate = async (e) => {
        let res = await fetch(backendUrl + "/users", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email : email,
                password : password
            })
        })

        if (res.ok)
        {
            createNotification("success", "User created")
            navigate("/login")
        }
        else
        {
            let jsonData = await res.json()
            let finalErrorMsg = ""

            if(Array.isArray(jsonData.errors))
            {
                jsonData.errors.forEach(element => { finalErrorMsg += element.error + " " });
                setMessage(finalErrorMsg)
            }
            else 
            {
                setMessage(jsonData.errors)
            }
        }
    }

    let {Text} = Typography

    return (
        <Row align='middle'justify='center' style={{minHeight: "70vh"}}>
            {message != "" && <Alert type="error" message={ message }/>}
            
            <Col>
                <Card title='Register' style={{minWidth: '300px', maxWidth: '500px'}}>
                    <Input size="large" type="text" placeholder="name" onChange={changeEmail}/>
                    {error.name && <Text type="danger">{error.name}</Text>}

                    <Input style={{marginTop: "10px"}} size="large" 
                        type="text" placeholder="password" onChange={changePassword}/>
                    {error.password && <Text type="danger">{error.password}</Text>}
                    
                    <Button style={{marginTop: "10px"}} type="primary" 
                        onClick={clickCreate} block>Register</Button>
                </Card>
            </Col>
        </Row>       
    )
}

export default CreateUserComp;