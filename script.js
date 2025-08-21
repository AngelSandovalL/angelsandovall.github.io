document.addEventListener('DOMContentLoaded', () => {

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
    const skillsContainer = document.getElementById('skills-container');
    const experienceContainer = document.getElementById('experience-container');
    const projectsContainer = document.getElementById('projects-container');


    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            return null;
        }
    };

    const setLanguage = async (lang) => {
        const translations = await loadTranslations(lang);
        if (!translations) return;

        document.documentElement.lang = lang;
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations.main[key]) {
                element.innerText = translations.main[key];
            }
        });
        
        // Actualizar título de la página
        document.title = translations.main.page_title;

        // Lógica para mostrar/ocultar la bandera correcta
        if (lang === 'es') {
            langIconEs.classList.remove('hidden');
            langIconEn.classList.add('hidden');
        } else {
            langIconEs.classList.add('hidden');
            langIconEn.classList.remove('hidden');
        }
        
        // Renderizar habilidades dinámicamente
        skillsContainer.innerHTML = '';
        translations.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 text-sm font-medium px-3 py-1.5 rounded-full';
            skillTag.innerText = skill;
            skillsContainer.appendChild(skillTag);
        });

        // Renderizar experiencia dinámicamente
        experienceContainer.innerHTML = '';
        translations.experience.forEach(job => {
            const descriptionPoints = job.description.map(point => `<li>${point}</li>`).join('');
            const highlight = job.highlight ? `<p class="mt-4 font-semibold accent-text">${translations.main.highlight_prefix}: <span class="font-normal text-slate-600 dark:text-slate-400">${job.highlight}</span></p>` : '';

            const experienceCard = `
                <div class="card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold">${job.title}</h3>
                        <span class="text-sm font-medium text-slate-500 dark:text-slate-400 text-right">${job.date}</span>
                    </div>
                    <h4 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">${job.company}</h4>
                    <ul class="experience-card-description text-slate-600 dark:text-slate-400">
                        ${descriptionPoints}
                    </ul>
                    ${highlight}
                </div>
            `;
            experienceContainer.innerHTML += experienceCard;
        });

        // Renderizar proyectos dinámicamente
        projectsContainer.innerHTML = '';
        translations.projects.forEach(project => {
            const projectCard = `
                <div class="card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-56 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">
                            ${project.description}
                        </p>
                        <div class="flex space-x-4">
                            <a href="${project.code_url}" target="_blank" class="font-medium accent-text hover:underline">${translations.main.view_code_btn} &rarr;</a>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.innerHTML += projectCard;
        });


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
});
