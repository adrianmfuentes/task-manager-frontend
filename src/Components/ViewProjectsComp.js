import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { convertDateTimeToReadableFormat } from "../Utils";
import { useNavigate } from "react-router-dom";
import { Button, Card, List, Checkbox, message } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import '../Css/ViewProjects.css'; 

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
        <div role="main" className="projects-container">
            <Card
                className="projects-header"
                tabIndex={0}
                aria-label="Project List Header"
            >
                {t("My Projects")} {/* Usar traducción */}
            </Card>

            {messageText && <h3 aria-live="assertive" className="error-message">{messageText}</h3>}

            <List
                className="project-list"
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                dataSource={projects}
                renderItem={(project) => (
                    <List.Item>
                        <Card
                            hoverable
                            title={project.name}
                            aria-label={`Project: ${project.name}`}
                            className="project-card"
                        >
                            <p className="project-description">
                                <strong>{t("Description:")}</strong> {project.description} {/* Usar traducción */}
                            </p>
                            <p className="due-date">
                                <strong>{t("Due Date:")}</strong> {convertDateTimeToReadableFormat(project.dateFinish)} {/* Usar traducción */}
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

                            <div className="project-actions">
                                {/* Completar proyecto */}
                                <Button
                                    onClick={() => completeProject(project.id)}
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    aria-label={`Mark ${project.name} as completed`}
                                    className="project-action-button"
                                >
                                    {t("Complete")} {/* Usar traducción */}
                                </Button>

                                {/* Editar proyecto */}
                                <Button
                                    onClick={() => editProject(project.id)}
                                    icon={<EditOutlined />}
                                    aria-label={`Edit ${project.name}`}
                                    className="project-action-button"
                                >
                                    {t("Edit")} {/* Usar traducción */}
                                </Button>

                                {/* Eliminar proyecto */}
                                <Button
                                    onClick={() => deleteProject(project.id)}
                                    icon={<DeleteOutlined />}
                                    danger
                                    aria-label={`Delete ${project.name}`}
                                    className="project-action-button"
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