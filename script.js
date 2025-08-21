// --- Lógica para el cambio de tema ---
const themeToggle = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('theme-icon-light');
const darkIcon = document.getElementById('theme-icon-dark');
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const toggleTheme = (isDark) => {
    if (isDark) {
        document.body.classList.add('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
        localStorage.setItem('theme', 'light');
    }
};

if (userTheme === 'dark' || (!userTheme && systemTheme)) {
    toggleTheme(true);
} else {
    toggleTheme(false);
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark');
    toggleTheme(!isDarkMode);
});

// --- Lógica para el cambio de idioma ---
const langToggle = document.getElementById('lang-toggle');
const langIconEs = document.getElementById('lang-icon-es');
const langIconEn = document.getElementById('lang-icon-en');
const translations = {
    es: {
        your_name_header: "Tu Nombre",
        nav_about: "Sobre mí",
        nav_projects: "Proyectos",
        nav_contact: "Contacto",
        hero_title: "Hola, soy [Tu Nombre]",
        hero_subtitle: "Un científico de datos apasionado por transformar datos complejos en soluciones impactantes y decisiones estratégicas.",
        contact_me_btn: "Contáctame",
        about_title: "Sobre mí",
        about_p: "Soy un analista de datos con experiencia en machine learning, visualización de datos y modelado estadístico. Mi objetivo es utilizar mis habilidades para resolver problemas complejos y generar valor a través de los datos. Me encanta aprender nuevas tecnologías y aplicarlas en proyectos desafiantes.",
        skills_title: "Mis Habilidades",
        projects_title: "Proyectos Destacados",
        p1_title: "Análisis de Sentimiento en Redes Sociales",
        p1_desc: "Modelo de NLP para clasificar la polaridad de tweets sobre un producto, utilizando LSTM y Transformers.",
        view_code: "Ver Código →",
        view_article: "Artículo →",
        p2_title: "Predicción de Fuga de Clientes (Churn)",
        p2_desc: "Desarrollo de un modelo de clasificación (XGBoost) para predecir qué clientes tienen mayor probabilidad de abandonar un servicio.",
        view_code_2: "Ver Código →",
        p3_title: "Sistema de Recomendación de Películas",
        p3_desc: "Implementación de un sistema de recomendación híbrido combinando filtrado colaborativo y basado en contenido.",
        view_code_3: "Ver Código →",
        view_demo: "Demo →",
        p4_title: "Dashboard Interactivo de Ventas",
        p4_desc: "Creación de un dashboard en Tableau para visualizar KPIs de ventas en tiempo real y facilitar la toma de decisiones.",
        view_dashboard: "Ver Dashboard →",
        contact_title: "Hablemos",
        contact_p: "Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes alguna pregunta o simplemente quieres saludar, no dudes en contactarme.",
        send_email_btn: "Enviar un correo",
        footer_text: "© 2024 [Tu Nombre]. Todos los derechos reservados."
    },
    en: {
        your_name_header: "Your Name",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_title: "Hello, I'm [Your Name]",
        hero_subtitle: "A passionate data scientist focused on transforming complex data into impactful solutions and strategic decisions.",
        contact_me_btn: "Contact Me",
        about_title: "About Me",
        about_p: "I am a data analyst with experience in machine learning, data visualization, and statistical modeling. My goal is to use my skills to solve complex problems and generate value through data. I love learning new technologies and applying them to challenging projects.",
        skills_title: "My Skills",
        projects_title: "Featured Projects",
        p1_title: "Social Media Sentiment Analysis",
        p1_desc: "NLP model to classify the polarity of tweets about a product, using LSTM and Transformers.",
        view_code: "View Code →",
        view_article: "Article →",
        p2_title: "Customer Churn Prediction",
        p2_desc: "Development of a classification model (XGBoost) to predict which customers are most likely to leave a service.",
        view_code_2: "View Code →",
        p3_title: "Movie Recommendation System",
        p3_desc: "Implementation of a hybrid recommendation system combining collaborative and content-based filtering.",
        view_code_3: "View Code →",
        view_demo: "Demo →",
        p4_title: "Interactive Sales Dashboard",
        p4_desc: "Creation of a dashboard in Tableau to visualize sales KPIs in real-time and facilitate decision-making.",
        view_dashboard: "View Dashboard →",
        contact_title: "Let's Talk",
        contact_p: "I am open to new opportunities and collaborations. If you have any questions or just want to say hello, feel free to contact me.",
        send_email_btn: "Send an Email",
        footer_text: "© 2024 [Your Name]. All rights reserved."
    }
};

const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });
    
    // Lógica para mostrar/ocultar la bandera correcta
    if (lang === 'es') {
        langIconEs.classList.remove('hidden');
        langIconEn.classList.add('hidden');
    } else {
        langIconEs.classList.add('hidden');
        langIconEn.classList.remove('hidden');
    }
    
    localStorage.setItem('language', lang);
};

langToggle.addEventListener('click', () => {
    const currentLang = localStorage.getItem('language') || 'es';
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
});

// Cargar idioma al iniciar
const savedLang = localStorage.getItem('language') || 'es';
setLanguage(savedLang);
