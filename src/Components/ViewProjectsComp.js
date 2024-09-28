import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { formatDate } from "../Utils";
import { useNavigate } from "react-router-dom";
import { Button, Card, List, Checkbox, message } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next'; // Importar useTranslation

const ProjectsComp = ({ createNotification }) => {
    const { t } = useTranslation(); // Inicializar la traducción
    const [projects, setProjects] = useState([]); // Estado para mantener los proyectos
    const [messageText, setMessageText] = useState(""); // Estado para mensajes de error
    const navigate = useNavigate(); // Hook para navegación

    const getItems = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/projects?apiKey=${localStorage.getItem("apiKey")}`);
            if (response.status === 401) {
                navigate("/login");
                return;
            }
            if (response.ok) {
                const jsonData = await response.json();
                setProjects(jsonData); // Actualizar el estado de los proyectos
            } else {
                const jsonData = await response.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText(t("errorFetchingProjectData")); // Usar traducción
        }
    }, [navigate, t]);

    const markSubtaskComplete = async (subtaskId, projectId, currentSubtask) => {
        const updatedSubtask = {
            ...currentSubtask,
            completed: !currentSubtask.completed // Alternar estado de completado
        };
    
        try {
            const response = await fetch(`${backendUrl}/subtasks/${projectId}/subtasks/${subtaskId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify(updatedSubtask), // Enviar subtask actualizado
            });
    
            if (response.ok) {
                message.success(t(`Subtask marked as ${updatedSubtask.completed ? 'completed' : 'incomplete'}`)); // Usar traducción
                getItems(); // Refrescar la lista después de actualizar
            } else {
                const jsonData = await response.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText(t("errorUpdatingProject")); // Usar traducción
        }
    };
    
    useEffect(() => {
        getItems(); // Obtener proyectos al montar el componente
    }, [getItems]);

    // Navegar a la página de edición del proyecto
    const editProject = (id) => {
        navigate(`/project/edit/${id}`);
    };

    // Eliminar proyecto
    const deleteProject = async (id) => {
        try {
            const res = await fetch(`${backendUrl}/projects/${id}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
                createNotification("success", t("Project deleted")); // Usar traducción
                setMessageText(""); 
            } else {
                const jsonData = await res.json();
                setMessageText(jsonData.error || t("Failed to delete project. Please try again.")); // Usar traducción
            }
        } catch (error) {
            setMessageText(t("Failed to delete project. Please try again.")); // Usar traducción
        }
    };

    // Completar proyecto
    const completeProject = async (id) => {
        try {
            const res = await fetch(`${backendUrl}/projects/${id}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            });

            if (res.ok) {
                createNotification("success", t("Project marked as completed")); // Usar traducción
                getItems(); // Refrescar la lista de proyectos
            } else {
                const jsonData = await res.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText(t("Failed to mark project as completed. Please try again.")); // Usar traducción
        }
    };

    return (
        <div role="main" style={{ padding: "10px" }}>
            <Card
                style={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    backgroundColor: "#f0f2f5",
                }}
                tabIndex={0}
                aria-label="Project List Header"
            >
                {t("My Projects")} {/* Usar traducción */}
            </Card>

            {messageText && <h3 aria-live="assertive" style={{ color: "red" }}>{messageText}</h3>}

            <List
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                dataSource={projects}
                renderItem={(project) => (
                    <List.Item>
                        <Card
                            hoverable
                            title={project.name}
                            aria-label={`Project: ${project.name}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: "16px",
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <p style={{ color: "#555", marginBottom: "10px" }}>
                                <strong>{t("Description:")}</strong> {project.description} {/* Usar traducción */}
                            </p>
                            <p style={{ fontWeight: "bold", color: "#888" }}>
                                <strong>{t("Due Date:")}</strong> {formatDate(project.dateFinish)} {/* Usar traducción */}
                            </p>

                            <List
                                size="small"
                                bordered
                                dataSource={project.subtasks}
                                renderItem={(subtask) => (
                                    <List.Item>
                                        <Checkbox
                                            onChange={() => markSubtaskComplete(subtask.id, project.id, subtask)}
                                            checked={subtask.completed}
                                        >
                                            <span style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}>
                                                {subtask.task}
                                            </span>
                                        </Checkbox>
                                    </List.Item>
                                )}
                                style={{ marginTop: "10px" }}
                            />

                            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                                {/* Completar proyecto */}
                                <Button
                                    onClick={() => completeProject(project.id)}
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    aria-label={`Mark ${project.name} as completed`}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    {t("Complete")} {/* Usar traducción */}
                                </Button>

                                {/* Editar proyecto */}
                                <Button
                                    onClick={() => editProject(project.id)}
                                    icon={<EditOutlined />}
                                    aria-label={`Edit ${project.name}`}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    {t("Edit")} {/* Usar traducción */}
                                </Button>

                                {/* Eliminar proyecto */}
                                <Button
                                    onClick={() => deleteProject(project.id)}
                                    icon={<DeleteOutlined />}
                                    danger
                                    aria-label={`Delete ${project.name}`}
                                    style={{ flex: 1 }}
                                >
                                    {t("Delete")} {/* Usar traducción */}
                                </Button>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default React.memo(ProjectsComp);
