import React, { useState, useEffect, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, List, DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useTranslation } from 'react-i18next'; // Importamos el hook de traducción

const { Text } = Typography;

const EditProjectComp = ({ createNotification }) => {
    const { t } = useTranslation(); // Usamos el hook de traducción
    const { projectId } = useParams(); // Obtener ID del proyecto desde la URL
    const [project, setProject] = useState({ name: "", description: "", finishDate: null, subtasks: [] });
    const [message, setMessage] = useState("");
    const [error, setError] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    // Obtener detalles del proyecto por ID
    const fetchProject = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/projects/${projectId}?apiKey=${localStorage.getItem("apiKey")}`);
            if (response.ok) {
                const data = await response.json();
                setProject({
                    name: data.title || "",
                    description: data.description || "",
                    finishDate: data.finishDate ? dayjs(data.finishDate) : null, 
                    subtasks: data.subtasks || []
                });
            } else {
                setMessage(t('errorFetchingProject')); // Mensaje traducido
            }
        } catch (error) {
            setMessage(t('failedToFetchProjectData')); // Mensaje traducido
        }
    }, [projectId, t]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    // Validar campos de entrada
    const checkInputErrors = useCallback(() => {
        const updatedErrors = {};
        if (touched.name && (!project.name || project.name.length < 2)) {
            updatedErrors.name = t('projectErrorTitle'); // Traducción del error
        }
        if (touched.description && (!project.description || project.description.length < 5)) {
            updatedErrors.description = t('projectErrorDescription'); // Traducción del error
        }
        if (touched.finishDate) {
            if (project.finishDate && !dayjs.isDayjs(project.finishDate)) {
                updatedErrors.finishDate = t('invalidDueDate'); // Traducción del error
            } else if (project.finishDate && project.finishDate.isBefore(dayjs())) {
                updatedErrors.finishDate = t('projectErrorDateFinish'); // Traducción del error
            }
        }
        setError(updatedErrors);
    }, [project, touched, t]);

    useEffect(() => {
        checkInputErrors();
    }, [project, checkInputErrors]);

    // Cambiar propiedad del proyecto
    const changeProperty = (propertyName, value) => {
        setProject((prevProject) => ({
            ...prevProject,
            [propertyName]: value,
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [propertyName]: true,
        }));
    };

    // Cambiar fecha de vencimiento
    const changeDate = (date) => {
        setProject((prevProject) => ({
            ...prevProject,
            finishDate: date ? date.valueOf() : null,
        }));
        setTouched((prevTouched) => ({ ...prevTouched, finishDate: true }));
    };

    // Cambiar subtarea
    const changeSubtask = (index, value) => {
        const updatedSubtasks = [...project.subtasks];
        updatedSubtasks[index].task = value;
        setProject((prevProject) => ({
            ...prevProject,
            subtasks: updatedSubtasks,
        }));
    };

    // Agregar nueva subtarea
    const addSubtask = () => {
        setProject((prevProject) => ({
            ...prevProject,
            subtasks: [...prevProject.subtasks, { task: "", created_at: null }],
        }));
    };

    // Manejar la edición del proyecto
    const clickEdit = async () => {
        if (isEmpty(error)) {
            try {
                const projectToSend = {
                    ...project,
                    finishDate: project.finishDate ? dayjs(project.finishDate).format('YYYY-MM-DD HH:mm:ss') : null
                };

                const res = await fetch(`${backendUrl}/projects/${projectId}?apiKey=${localStorage.getItem("apiKey")}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(projectToSend),
                });

                if (res.ok) {
                    createNotification("success", t('projectUpdatedSuccessfully')); // Notificación traducida
                    navigate("/myProjects");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error || t('failedToUpdateProject')); // Mensaje traducido
                }
            } catch {
                setMessage(t('errorUpdatingProject')); // Mensaje traducido
            }
        } else {
            setMessage(t('fixErrorsMessage')); // Mensaje traducido
        }
    };

    // Condición para deshabilitar el botón
    const isButtonDisabled = !project.name || !project.finishDate || !isEmpty(error);

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title={t('editProject')} bordered={false}>
                    
                    {/* Campo de nombre del proyecto */}
                    <Input
                        size="large"
                        placeholder={t('projectTitle')}
                        value={project.name}
                        onChange={(e) => changeProperty("name", e.target.value)}
                        aria-label={t('projectTitle')}
                    />
                    {error.name && <Text type="danger">{error.name}</Text>}

                    {/* Campo de descripción del proyecto */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder={t('projectDescription')}
                        value={project.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        aria-label={t('projectDescription')}
                    />
                    {error.description && <Text type="danger">{error.description}</Text>}

                    {/* Seleccionar fecha de vencimiento */}
                    <DatePicker
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        showTime
                        value={project.finishDate ? project.finishDate : null}
                        onChange={changeDate}
                        aria-label={t('selectDueDate')}
                    />
                    {error.finishDate && <Text type="danger">{error.finishDate}</Text>}

                    {/* Subtareas */}
                    <List
                        bordered
                        dataSource={project.subtasks}
                        renderItem={(subtask, index) => (
                            <List.Item key={index}>
                                <Input
                                    placeholder={`${t('subtask')} ${index + 1}`}
                                    value={subtask.task}
                                    onChange={(e) => changeSubtask(index, e.target.value)}
                                    style={{ width: "100%" }}
                                    aria-label={`${t('subtask')} ${index + 1}`}
                                />
                            </List.Item>
                        )}
                        style={{ marginTop: "10px" }}
                    />

                    {/* Botón para agregar subtarea */}
                    <Button
                        type="dashed"
                        onClick={addSubtask}
                        style={{ marginTop: "10px", width: "100%" }}
                    >
                        {t('addSubtask')}
                    </Button>

                    {/* Botón para editar el proyecto */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        onClick={clickEdit}
                        block
                        disabled={isButtonDisabled}
                    >
                        {t('editProject')}
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(EditProjectComp);
