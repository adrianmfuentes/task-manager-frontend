import React, { useEffect, useState} from "react";
import { backendUrl } from "../Globals";
import { timestampToDate } from "../Utils";
import { Link, useNavigate } from "react-router-dom";
import { Card, List } from "antd";

const ItemsComp = () => {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, []);
    
    const getItems = async () => {
        let response = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey"));

        if (response.status === 401) {
            navigate("/login");
            return;
        }

        if (response.ok) {
            let jsonData = await response.json();
            setTasks(jsonData);
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.error);
        }
    }
    

    return (
        <>
            <Card style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Tasks</Card>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <List grid={ { gutter: 16, xs: 1, sm:2, md: 4, lg:4, xl: 6, xxl: 6 }} 
                dataSource={tasks} renderItem={(task) => (
                <List.Item>
                    <Card hoverable title={task.name} style={{height: "300px"}}>
                        <Link to={"/item/" + task.id}>
                            <p className="description">Description: {task.description}</p>
                            <p className="date">Time finish: {timestampToDate(task.dateFinish)}</p>
                        </Link>                        
                    </Card>
                </List.Item>)}>

            </List>
        </>
    );
}

export default ItemsComp;
