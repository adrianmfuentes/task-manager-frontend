import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Alert, Button, Card, Col, Input, Row, Typography } from "antd";

let CreateItemComp = (props) => {
    let {createNotification} = props

    let [message, setMessage] = useState("")
    let [task, setTask] = useState({})
    let [error, setError] = useState({})

    let navigate = useNavigate()

    useEffect(() => {
        checkInputErrors()
    }, [task])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if(task.name == "" || task.name?.length < 2){
            updatedErrors.name = "Incorrect name for item"
        }
    
        if(task.description == "" || task.description?.length < 5){
            updatedErrors.description = "Incorrect description, maybe too short"
        }

        if(task.dateFinish < new Date().getTime()){
            updatedErrors.dateFinish = "Incorrect date, must be greater or equal than current date"
        }

        setError(updatedErrors)
    }

    let changeProperty = (propertyName, e) => {
        let taskNew = {...task, [propertyName] : e.currentTarget.value}
        setTask(taskNew)
    }

    let changeDate = (e) => {
        let value = e.currentTarget.value
        let timestamp = Date.parse(value)

        let itemNew = {...task, dateFinish : timestamp}
        setTask(itemNew)
    }

    let clickCreate = async () => {
        if(_.isEqual(error, {})){
            let res = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey"), {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(task)
            })
    
            if (res.ok)
            {
                createNotification("success", "Item created")
                navigate("/myItems")
            }
            else
            {
                let jsonData = await res.json()
                setMessage(jsonData.error)
            }
        }
        else
        {
            setMessage("Cannot execute your request, you have errors")
        }
    }

    let {Text} = Typography

    return (
        <Row align='middle' justify='center' style={{minHeight: "70vh"}}>
            {message != "" && <Alert type="error" message={ message }/>}
            
            <Col>
                <Card title='Register' style={{minWidth: '300px', maxWidth: '500px'}}>
                    <Input size="large" type="text" 
                            placeholder="name" onChange={e => changeProperty("name", e)}/>
                    {error.name && <Text type="danger">{error.name}</Text>}

                    <Input style={{marginTop: "10px"}} size="large" type="text" 
                            placeholder="description" onChange={e => changeProperty("description", e)}/>
                    {error.description && <Text type="danger">{error.description}</Text>}

                    <Input style={{marginTop: "10px"}} size="large" 
                            type="datetime-local" onChange={changeDate}/>
                    {error.dateFinish && <Text type="danger">{error.dateFinish}</Text>}

                    <Button style={{marginTop: "10px"}} type="primary" onClick={clickCreate} 
                        block>Create task</Button>
                </Card>
            </Col>
        </Row>     
    )
}

export default CreateItemComp;