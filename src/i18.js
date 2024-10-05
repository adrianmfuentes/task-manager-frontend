import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Website Index (under construction)": "Website Index (under construction)",
          "Login": "Login",
          "Register": "Register",
          "Create Task": "Create Task",
          "My Tasks": "My Tasks",
          "Create Project": "Create Project",
          "My Projects": "My Projects",
          "Log Out": "Log Out",
          "Language": "Language",
          "Select Language": "Select Language",
          "Task": "Task",
          "Description:": "Description:",
          "Due Date:": "Due Date:",
          "Complete": "Complete",
          "Edit": "Edit",
          "Delete": "Delete",
          "errorFetchingProjectData": "Error fetching project data.",
          "errorUpdatingProject": "Error updating project.",
          "Failed to delete project. Please try again.": "Failed to delete project. Please try again.",
          "Project marked as completed": "Project marked as completed",
          "Project deleted": "Project deleted",
          "Error": "Error",
          "Welcome to the project management app": "Welcome to the project management app",
          "Project Name": "Project Name",
          "Project Description": "Project Description",
          "Due Date": "Due Date",
          "Create": "Create",
          "Cancel": "Cancel",
          "Edit Project": "Edit Project",
          "Update": "Update",
          "Email": "Email",
          "Password": "Password",
          "Sign In": "Sign In",
          "Sign Out": "Sign Out",
          "Password Confirmation": "Password Confirmation",
          "User": "User",
          "Role": "Role",
          "Save": "Save",
          "Failed to fetch tasks. Please try again.": "Failed to fetch tasks. Please try again.",
          "Task deleted": "Task deleted",
          "Task marked as completed": "Task marked as completed",
          "Failed to delete task. Please try again.": "Failed to delete task. Please try again.",
          "Failed to mark task as completed. Please try again.": "Failed to mark task as completed. Please try again.",
          "Welcome to TaskMaster!": "Welcome to TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Simplify project and task management with TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Create your account or log in now to start organizing your life efficiently and productively.",
        }
      },
      es: {
        translation: {
          "Website Index (under construction)": "Indice del sitio web (bajo construcción)",
          "Login": "Iniciar sesión",
          "Register": "Registrar",
          "Create Task": "Crear tarea",
          "My Tasks": "Mis Tareas",
          "Create Project": "Crear Proyecto",
          "My Projects": "Mis Proyectos",
          "Log Out": "Cerrar Sesión",
          "Language": "Idioma",
          "Select Language": "Seleccionar Idioma",
          "Task": "Tarea",
          "Description:": "Descripción:",
          "Due Date:": "Fecha de Vencimiento:",
          "Complete": "Completar",
          "Edit": "Editar",
          "Delete": "Eliminar",
          "errorFetchingProjectData": "Error al obtener los datos del proyecto.",
          "errorUpdatingProject": "Error al actualizar el proyecto.",
          "Failed to delete project. Please try again.": "Error al eliminar el proyecto. Por favor, inténtalo de nuevo.",
          "Project marked as completed": "Proyecto marcado como completado",
          "Project deleted": "Proyecto eliminado",
          "Error": "Error",
          "Welcome to the project management app": "Bienvenido a la aplicación de gestión de proyectos",
          "Project Name": "Nombre del Proyecto",
          "Project Description": "Descripción del Proyecto",
          "Due Date": "Fecha de Vencimiento",
          "Create": "Crear",
          "Cancel": "Cancelar",
          "Edit Project": "Editar Proyecto",
          "Update": "Actualizar",
          "Email": "Correo Electrónico",
          "Password": "Contraseña",
          "Sign In": "Iniciar Sesión",
          "Sign Out": "Cerrar Sesión",
          "Password Confirmation": "Confirmación de Contraseña",
          "User": "Usuario",
          "Role": "Rol",
          "Save": "Guardar",
          "Failed to fetch tasks. Please try again.": "Error al obtener las tareas. Por favor, inténtalo de nuevo.",
          "Task deleted": "Tarea eliminada",
          "Task marked as completed": "Tarea marcada como completada",
          "Failed to delete task. Please try again.": "Error al eliminar la tarea. Por favor, inténtalo de nuevo.",
          "Failed to mark task as completed. Please try again.": "Error al marcar la tarea como completada. Por favor, inténtalo de nuevo.",
          "Welcome to TaskMaster!": "¡Bienvenido a TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Simplifica la gestión de proyectos y tareas con TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Crea tu cuenta o inicia sesión ahora para comenzar a organizar tu vida de forma eficiente y productiva.",
        }
      },
      fr: {
        translation: {
          "Website Index (under construction)": "Index du site web (en construction)",
          "Login": "Se connecter",
          "Register": "S'inscrire",
          "Create Task": "Créer une tâche",
          "My Tasks": "Mes tâches",
          "Create Project": "Créer un projet",
          "My Projects": "Mes projets",
          "Log Out": "Se déconnecter",
          "Language": "Langue",
          "Select Language": "Sélectionner la langue",
          "Task": "Tâche",
          "Description:": "Description :",
          "Due Date:": "Date d'échéance :",
          "Complete": "Terminer",
          "Edit": "Modifier",
          "Delete": "Supprimer",
          "errorFetchingProjectData": "Erreur lors de la récupération des données du projet.",
          "errorUpdatingProject": "Erreur lors de la mise à jour du projet.",
          "Failed to delete project. Please try again.": "Échec de la suppression du projet. Veuillez réessayer.",
          "Project marked as completed": "Projet marqué comme terminé",
          "Project deleted": "Projet supprimé",
          "Error": "Erreur",
          "Welcome to the project management app": "Bienvenue dans l'application de gestion de projet",
          "Project Name": "Nom du projet",
          "Project Description": "Description du projet",
          "Due Date": "Date d'échéance",
          "Create": "Créer",
          "Cancel": "Annuler",
          "Edit Project": "Modifier le projet",
          "Update": "Mettre à jour",
          "Email": "E-mail",
          "Password": "Mot de passe",
          "Sign In": "Se connecter",
          "Sign Out": "Se déconnecter",
          "Password Confirmation": "Confirmation du mot de passe",
          "User": "Utilisateur",
          "Role": "Rôle",
          "Save": "Enregistrer",
          "Failed to fetch tasks. Please try again.": "Échec de la récupération des tâches. Veuillez réessayer.",
          "Task deleted": "Tâche supprimée",
          "Task marked as completed": "Tâche marquée comme terminée",
          "Failed to delete task. Please try again.": "Échec de la suppression de la tâche. Veuillez réessayer.",
          "Failed to mark task as completed. Please try again.": "Échec de la marque de la tâche comme terminée. Veuillez réessayer.",
          "Welcome to TaskMaster!": "Bienvenue à TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Simplifiez la gestion de projets et de tâches avec TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Créez votre compte ou connectez-vous maintenant pour commencer à organiser votre vie de manière efficace et productive.",
        }
      },
      de: {
        translation: {
          "Website Index (under construction)": "Website Index (im Aufbau)",
          "Login": "Anmelden",
          "Register": "Registrieren",
          "Create Task": "Aufgabe erstellen",
          "My Tasks": "Meine Aufgaben",
          "Create Project": "Projekt erstellen",
          "My Projects": "Meine Projekte",
          "Log Out": "Abmelden",
          "Language": "Sprache",
          "Select Language": "Sprache auswählen",
          "Task": "Aufgabe",
          "Description:": "Beschreibung:",
          "Due Date:": "Fälligkeitsdatum:",
          "Complete": "Abschließen",
          "Edit": "Bearbeiten",
          "Delete": "Löschen",
          "errorFetchingProjectData": "Fehler beim Abrufen der Projektdaten.",
          "errorUpdatingProject": "Fehler beim Aktualisieren des Projekts.",
          "Failed to delete project. Please try again.": "Fehler beim Löschen des Projekts. Bitte versuchen Sie es erneut.",
          "Project marked as completed": "Projekt als abgeschlossen markiert",
          "Project deleted": "Projekt gelöscht",
          "Error": "Fehler",
          "Welcome to the project management app": "Willkommen in der Projektmanagement-App",
          "Project Name": "Projektname",
          "Project Description": "Projektbeschreibung",
          "Due Date": "Fälligkeitsdatum",
          "Create": "Erstellen",
          "Cancel": "Abbrechen",
          "Edit Project": "Projekt bearbeiten",
          "Update": "Aktualisieren",
          "Email": "E-Mail",
          "Password": "Passwort",
          "Sign In": "Anmelden",
          "Sign Out": "Abmelden",
          "Password Confirmation": "Passwortbestätigung",
          "User": "Benutzer",
          "Role": "Rolle",
          "Save": "Speichern",
          "Failed to fetch tasks. Please try again.": "Fehler beim Abrufen der Aufgaben. Bitte versuchen Sie es erneut.",
          "Task deleted": "Aufgabe gelöscht",
          "Task marked as completed": "Aufgabe als abgeschlossen markiert",
          "Failed to delete task. Please try again.": "Fehler beim Löschen der Aufgabe. Bitte versuchen Sie es erneut.",
          "Failed to mark task as completed. Please try again.": "Fehler beim Markieren der Aufgabe als abgeschlossen. Bitte versuchen Sie es erneut.",
          "Welcome to TaskMaster!": "Willkommen bei TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Vereinfachen Sie das Projekt- und Aufgabenmanagement mit TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Erstellen Sie Ihr Konto oder melden Sie sich jetzt an, um Ihr Leben effizient und produktiv zu organisieren.",
        }
      },
      it: {
        translation: {
          "Website Index (under construction)": "Indice del sito web (in costruzione)",
          "Login": "Accedi",
          "Register": "Registrati",
          "Create Task": "Crea attività",
          "My Tasks": "Le mie attività",
          "Create Project": "Crea progetto",
          "My Projects": "I miei progetti",
          "Log Out": "Disconnetti",
          "Language": "Lingua",
          "Select Language": "Seleziona lingua",
          "Task": "Attività",
          "Description:": "Descrizione:",
          "Due Date:": "Data di scadenza:",
          "Complete": "Completa",
          "Edit": "Modifica",
          "Delete": "Elimina",
          "errorFetchingProjectData": "Errore nel recupero dei dati del progetto.",
          "errorUpdatingProject": "Errore nell'aggiornamento del progetto.",
          "Failed to delete project. Please try again.": "Impossibile eliminare il progetto. Per favore, riprova.",
          "Project marked as completed": "Progetto contrassegnato come completato",
          "Project deleted": "Progetto eliminato",
          "Error": "Errore",
          "Welcome to the project management app": "Benvenuto nell'app di gestione dei progetti",
          "Project Name": "Nome del progetto",
          "Project Description": "Descrizione del progetto",
          "Due Date": "Data di scadenza",
          "Create": "Crea",
          "Cancel": "Annulla",
          "Edit Project": "Modifica progetto",
          "Update": "Aggiorna",
          "Email": "Email",
          "Password": "Password",
          "Sign In": "Accedi",
          "Sign Out": "Disconnetti",
          "Password Confirmation": "Conferma password",
          "User": "Utente",
          "Role": "Ruolo",
          "Save": "Salva",
          "Failed to fetch tasks. Please try again.": "Impossibile recuperare le attività. Per favore, riprova.",
          "Task deleted": "Attività eliminata",
          "Task marked as completed": "Attività contrassegnata come completata",
          "Failed to delete task. Please try again.": "Impossibile eliminare l'attività. Per favore, riprova.",
          "Failed to mark task as completed. Please try again.": "Impossibile contrassegnare l'attività come completata. Per favore, riprova.",
          "Welcome to TaskMaster!": "Benvenuto in TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Semplifica la gestione di progetti e attività con TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Crea il tuo account o accedi ora per iniziare a organizzare la tua vita in modo efficiente e produttivo.",
        }
      },
      pl: {
        translation: {
          "Website Index (under construction)": "Indeks strony (w budowie)",
          "Login": "Zaloguj się",
          "Register": "Zarejestruj się",
          "Create Task": "Utwórz zadanie",
          "My Tasks": "Moje zadania",
          "Create Project": "Utwórz projekt",
          "My Projects": "Moje projekty",
          "Log Out": "Wyloguj się",
          "Language": "Język",
          "Select Language": "Wybierz język",
          "Task": "Zadanie",
          "Description:": "Opis:",
          "Due Date:": "Termin:",
          "Complete": "Zakończ",
          "Edit": "Edytuj",
          "Delete": "Usuń",
          "errorFetchingProjectData": "Błąd podczas pobierania danych projektu.",
          "errorUpdatingProject": "Błąd podczas aktualizacji projektu.",
          "Failed to delete project. Please try again.": "Nie udało się usunąć projektu. Spróbuj ponownie.",
          "Project marked as completed": "Projekt oznaczony jako zakończony",
          "Project deleted": "Projekt usunięty",
          "Error": "Błąd",
          "Welcome to the project management app": "Witaj w aplikacji do zarządzania projektami",
          "Project Name": "Nazwa projektu",
          "Project Description": "Opis projektu",
          "Due Date": "Termin",
          "Create": "Utwórz",
          "Cancel": "Anuluj",
          "Edit Project": "Edytuj projekt",
          "Update": "Zaktualizuj",
          "Email": "Email",
          "Password": "Hasło",
          "Sign In": "Zaloguj się",
          "Sign Out": "Wyloguj się",
          "Password Confirmation": "Potwierdzenie hasła",
          "User": "Użytkownik",
          "Role": "Rola",
          "Save": "Zapisz",
          "Failed to fetch tasks. Please try again.": "Nie udało się pobrać zadań. Spróbuj ponownie.",
          "Task deleted": "Zadanie usunięte",
          "Task marked as completed": "Zadanie oznaczone jako zakończone",
          "Failed to delete task. Please try again.": "Nie udało się usunąć zadania. Spróbuj ponownie.",
          "Failed to mark task as completed. Please try again.": "Nie udało się oznaczyć zadania jako zakończone. Spróbuj ponownie.",
          "Welcome to TaskMaster!": "Witaj w TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Uprość zarządzanie projektami i zadaniami z TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Utwórz swoje konto lub zaloguj się teraz, aby zacząć efektywnie i produktywnie organizować swoje życie.",
        }
      },
      ru: {
        translation: {
          "Website Index (under construction)": "Индекс сайта (в разработке)",
          "Login": "Войти",
          "Register": "Зарегистрироваться",
          "Create Task": "Создать задачу",
          "My Tasks": "Мои задачи",
          "Create Project": "Создать проект",
          "My Projects": "Мои проекты",
          "Log Out": "Выйти",
          "Language": "Язык",
          "Select Language": "Выберите язык",
          "Task": "Задача",
          "Description:": "Описание:",
          "Due Date:": "Срок:",
          "Complete": "Завершить",
          "Edit": "Редактировать",
          "Delete": "Удалить",
          "errorFetchingProjectData": "Ошибка при получении данных проекта.",
          "errorUpdatingProject": "Ошибка при обновлении проекта.",
          "Failed to delete project. Please try again.": "Не удалось удалить проект. Пожалуйста, попробуйте снова.",
          "Project marked as completed": "Проект помечен как завершенный",
          "Project deleted": "Проект удален",
          "Error": "Ошибка",
          "Welcome to the project management app": "Добро пожаловать в приложение управления проектами",
          "Project Name": "Название проекта",
          "Project Description": "Описание проекта",
          "Due Date": "Срок",
          "Create": "Создать",
          "Cancel": "Отмена",
          "Edit Project": "Редактировать проект",
          "Update": "Обновить",
          "Email": "Электронная почта",
          "Password": "Пароль",
          "Sign In": "Войти",
          "Sign Out": "Выйти",
          "Password Confirmation": "Подтверждение пароля",
          "User": "Пользователь",
          "Role": "Роль",
          "Save": "Сохранить",
          "Failed to fetch tasks. Please try again.": "Не удалось получить задачи. Пожалуйста, попробуйте снова.",
          "Task deleted": "Задача удалена",
          "Task marked as completed": "Задача помечена как завершенная",
          "Failed to delete task. Please try again.": "Не удалось удалить задачу. Пожалуйста, попробуйте снова.",
          "Failed to mark task as completed. Please try again.": "Не удалось пометить задачу как завершенную. Пожалуйста, попробуйте снова.",
          "Welcome to TaskMaster!": "Добро пожаловать в TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Упростите управление проектами и задачами с помощью TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Создайте свою учетную запись или войдите в систему, чтобы начать эффективно и продуктивно организовывать свою жизнь.",
        }
      },
      zh: {
        translation: {
          "Website Index (under construction)": "网站索引（建设中）",
          "Login": "登录",
          "Register": "注册",
          "Create Task": "创建任务",
          "My Tasks": "我的任务",
          "Create Project": "创建项目",
          "My Projects": "我的项目",
          "Log Out": "登出",
          "Language": "语言",
          "Select Language": "选择语言",
          "Task": "任务",
          "Description:": "描述：",
          "Due Date:": "截止日期：",
          "Complete": "完成",
          "Edit": "编辑",
          "Delete": "删除",
          "errorFetchingProjectData": "获取项目数据时出错。",
          "errorUpdatingProject": "更新项目时出错。",
          "Failed to delete project. Please try again.": "删除项目失败。请重试。",
          "Project marked as completed": "项目标记为完成",
          "Project deleted": "项目已删除",
          "Error": "错误",
          "Welcome to the project management app": "欢迎使用项目管理应用程序",
          "Project Name": "项目名称",
          "Project Description": "项目描述",
          "Due Date": "截止日期",
          "Create": "创建",
          "Cancel": "取消",
          "Edit Project": "编辑项目",
          "Update": "更新",
          "Email": "电子邮件",
          "Password": "密码",
          "Sign In": "登录",
          "Sign Out": "登出",
          "Password Confirmation": "密码确认",
          "User": "用户",
          "Role": "角色",
          "Save": "保存",
          "Failed to fetch tasks. Please try again.": "获取任务时出错。请重试。",
          "Task deleted": "任务已删除",
          "Task marked as completed": "任务已完成",
          "Failed to delete task. Please try again.": "删除任务失败。请重试。",
          "Failed to mark task as completed. Please try again.": "标记任务为完成失败。请重试。",
          "Welcome to TaskMaster!": "欢迎来到 TaskMaster！",
          "Simplify project and task management with TaskMaster.": "使用 TaskMaster 简化项目和任务管理。",
          "Create your account or log in now to start organizing your life efficiently and productively.": "创建您的帐户或立即登录以开始高效和富有成效地组织您的生活。",
        }
      },
      hi: {
        translation: {
          "Website Index (under construction)": "वेबसाइट अनुक्रमणिका (निर्माणाधीन)",
          "Login": "लॉग इन करें",
          "Register": "पंजीकरण करें",
          "Create Task": "कार्य बनाएँ",
          "My Tasks": "मेरे कार्य",
          "Create Project": "प्रोजेक्ट बनाएँ",
          "My Projects": "मेरे प्रोजेक्ट",
          "Log Out": "लॉग आउट करें",
          "Language": "भाषा",
          "Select Language": "भाषा चुनें",
          "Task": "कार्य",
          "Description:": "विवरण:",
          "Due Date:": "समय सीमा:",
          "Complete": "पूरा करें",
          "Edit": "संपादित करें",
          "Delete": "हटाएं",
          "errorFetchingProjectData": "प्रोजेक्ट डेटा प्राप्त करने में त्रुटि।",
          "errorUpdatingProject": "प्रोजेक्ट को अपडेट करने में त्रुटि।",
          "Failed to delete project. Please try again.": "प्रोजेक्ट को हटाने में विफल। कृपया पुनः प्रयास करें।",
          "Project marked as completed": "प्रोजेक्ट को पूरा किया गया",
          "Project deleted": "प्रोजेक्ट हटाया गया",
          "Error": "त्रुटि",
          "Welcome to the project management app": "प्रोजेक्ट प्रबंधन ऐप में आपका स्वागत है",
          "Project Name": "प्रोजेक्ट का नाम",
          "Project Description": "प्रोजेक्ट का विवरण",
          "Due Date": "समय सीमा",
          "Create": "बनाएँ",
          "Cancel": "रद्द करें",
          "Edit Project": "प्रोजेक्ट संपादित करें",
          "Update": "अपडेट करें",
          "Email": "ईमेल",
          "Password": "पासवर्ड",
          "Sign In": "साइन इन करें",
          "Sign Out": "साइन आउट करें",
          "Password Confirmation": "पासवर्ड पुष्टि",
          "User": "उपयोगकर्ता",
          "Role": "भूमिका",
          "Save": "सहेजें",
          "Failed to fetch tasks. Please try again.": "कार्य प्राप्त करने में विफल। कृपया पुनः प्रयास करें।",
          "Task deleted": "कार्य हटाया गया",
          "Task marked as completed": "कार्य को पूरा किया गया",
          "Failed to delete task. Please try again.": "कार्य को हटाने में विफल। कृपया पुनः प्रयास करें।",
          "Failed to mark task as completed. Please try again.": "कार्य को पूरा करने के लिए चिह्नित करने में विफल। कृपया पुनः प्रयास करें।",
          "Welcome to TaskMaster!": "TaskMaster में आपका स्वागत है!",
          "Simplify project and task management with TaskMaster.": "TaskMaster के साथ परियोजना और कार्य प्रबंधन को सरल बनाएं।",
          "Create your account or log in now to start organizing your life efficiently and productively.": "अपना खाता बनाएं या तुरंत लॉगिन करें ताकि आप अपने जीवन को कुशलतापूर्वक और उत्पादकता से व्यवस्थित कर सकें।",
        }
      },
      ar: {
        translation: {
          "Website Index (under construction)": "فهرس الموقع (تحت الإنشاء)",
          "Login": "تسجيل الدخول",
          "Register": "تسجيل",
          "Create Task": "إنشاء مهمة",
          "My Tasks": "مهامي",
          "Create Project": "إنشاء مشروع",
          "My Projects": "مشاريعي",
          "Log Out": "تسجيل الخروج",
          "Language": "لغة",
          "Select Language": "اختيار اللغة",
          "Task": "مهمة",
          "Description:": "الوصف:",
          "Due Date:": "تاريخ الاستحقاق:",
          "Complete": "إكمال",
          "Edit": "تعديل",
          "Delete": "حذف",
          "errorFetchingProjectData": "حدث خطأ أثناء جلب بيانات المشروع.",
          "errorUpdatingProject": "حدث خطأ أثناء تحديث المشروع.",
          "Failed to delete project. Please try again.": "فشل في حذف المشروع. يرجى المحاولة مرة أخرى.",
          "Project marked as completed": "تم وضع علامة على المشروع كا مكتمل",
          "Project deleted": "تم حذف المشروع",
          "Error": "خطأ",
          "Welcome to the project management app": "مرحبًا بك في تطبيق إدارة المشاريع",
          "Project Name": "اسم المشروع",
          "Project Description": "وصف المشروع",
          "Due Date": "تاريخ الاستحقاق",
          "Create": "إنشاء",
          "Cancel": "إلغاء",
          "Edit Project": "تعديل المشروع",
          "Update": "تحديث",
          "Email": "البريد الإلكتروني",
          "Password": "كلمة المرور",
          "Sign In": "تسجيل الدخول",
          "Sign Out": "تسجيل الخروج",
          "Password Confirmation": "تأكيد كلمة المرور",
          "User": "المستخدم",
          "Role": "الدور",
          "Save": "حفظ",
          "Failed to fetch tasks. Please try again.": "فشل في جلب المهام. يرجى المحاولة مرة أخرى.",
          "Task deleted": "تم حذف المهمة",
          "Task marked as completed": "تم وضع علامة على المهمة كمكتملة",
          "Failed to delete task. Please try again.": "فشل في حذف المهمة. يرجى المحاولة مرة أخرى.",
          "Failed to mark task as completed. Please try again.": "فشل في وضع علامة على المهمة كمكتملة. يرجى المحاولة مرة أخرى.",
          "Welcome to TaskMaster!": "مرحبًا بكم في TaskMaster!",
          "Simplify project and task management with TaskMaster.": "بسّط إدارة المشاريع والمهام مع TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "قم بإنشاء حسابك أو تسجيل الدخول الآن لبدء تنظيم حياتك بكفاءة وإنتاجية.",        
        }
      },
      kg: {
        translation: {
          "Website Index (under construction)": "Tindèti ya mu Internet (yàkukukama)",
          "Login": "Kwa kikuta",
          "Register": "Dindama",
          "Create Task": "Sangila kintwadi",
          "My Tasks": "Bintwadi biami",
          "Create Project": "Sangila projekti",
          "My Projects": "Biprojekti biami",
          "Log Out": "Kuta ku Inzì",
          "Language": "Inzì",
          "Select Language": "Tàlà inzì",
          "Task": "Kintwadi",
          "Description:": "Tsìmbila:",
          "Due Date:": "Nsìku ya luvundilò:",
          "Complete": "Kavala",
          "Edit": "Lomba",
          "Delete": "Futula",
          "errorFetchingProjectData": "Tìmèdi ve kukupeta kintwadi ya projekti.",
          "errorUpdatingProject": "Tìmèdi ve kukulombolola projekti.",
          "Failed to delete project. Please try again.": "Kintwadi ya futuka projekti ve tinda. Sambila futuka mbòtama.",
          "Project marked as completed": "Projekti yasàkamini ke kukavala",
          "Project deleted": "Projekti yafutukini",
          "Error": "Mbevù",
          "Welcome to the project management app": "Mwèleke mu lutuma lwa projekti",
          "Project Name": "Dzina ya projekti",
          "Project Description": "Tsìmbila ya projekti",
          "Due Date": "Nsìku ya luvundilò",
          "Create": "Sangila",
          "Cancel": "Futa",
          "Edit Project": "Lomba projekti",
          "Update": "Lombolola",
          "Email": "Imeili",
          "Password": "Kùmbu",
          "Sign In": "Kwa kikuta",
          "Sign Out": "Kuta",
          "Password Confirmation": "Lomba kùmbu",
          "User": "Lùntu",
          "Role": "Luama",
          "Save": "Tìkà",
          "Failed to fetch tasks. Please try again.": "Tìmèdi ve kukupeta bintwadi. Sambila nzingila mbòtama.",
          "Task deleted": "Kintwadi yafutukini",
          "Task marked as completed": "Kintwadi yasàkamini ke kavala",
          "Failed to delete task. Please try again.": "Tìmèdi ve kufutuka kintwadi. Sambila futuka mbòtama.",
          "Failed to mark task as completed. Please try again.": "Tìmèdi ve kusàka kintwadi ke kavala. Sambila nzingila mbòtama.",
          "Welcome to TaskMaster!": "Mwakire mu TaskMaster!",
          "Simplify project and task management with TaskMaster.": "Fungura ugucunga imishinga n'ibikorwa na TaskMaster.",
          "Create your account or log in now to start organizing your life efficiently and productively.": "Sakaza konti yawe cyangwa winjire none kugira ngo utangire gutegura ubuzima bwawe neza kandi ku buryo bwiza.",        
        }
      },
    },
    lng: 'en',
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // Leaving it to React
    }
  }
);

export default i18n;
