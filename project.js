document.addEventListener('DOMContentLoaded', () => {
    // --- Slider Logic ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function updateSlider() {
        if (!sliderWrapper || !prevBtn || !nextBtn || slides.length === 0) {
            return;
        }
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active-slide', index === currentIndex);
        });
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    updateSlider();

    // --- Modal Logic ---
    const courseModal = document.getElementById('course-modal');
    const courseCards = document.querySelectorAll('.course-card');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtopics = document.getElementById('modal-subtopics');
    const modalResources = document.getElementById('modal-resources');
    const resourceLinks = document.getElementById('resource-links');

    const courseData = {
        webdev: { title: "Web Development", subtopics: { frontend: { name: "Frontend" }, backend: { name: "Backend" }, fullstack: { name: "Full Stack" } } },
        ai: { title: "Artificial Intelligence", subtopics: { ai_concepts: { name: "AI Concepts" }, search_algos: { name: "Search Algorithms" }, expert_systems: { name: "Expert Systems" } } },
        ml: { title: "Machine Learning", subtopics: { ml_foundations: { name: "ML Foundations" }, deep_learning: { name: "Deep Learning" }, nlp: { name: "NLP" } } },
        cloud: { title: "Cloud Computing", subtopics: { aws: { name: "AWS" }, gcp: { name: "Google Cloud" }, azure: { name: "Azure" } } },
        api: { title: "API Development", subtopics: { rest_api: { name: "REST APIs" }, graphql: { name: "GraphQL" }, api_security: { name: "API Security" } } },
        dsa: { title: "Data Structures & Algorithms", subtopics: { java_dsa: { name: "Java DSA" }, python_dsa: { name: "Python DSA" } } },
        github: { title: "Git & GitHub", subtopics: { git_basics: { name: "Git Basics" }, branching: { name: "Branching & Merging" }, github_flow: { name: "GitHub Flow"} } }
    };
    
    // MODIFIED: All resource links have been updated to real, high-quality sources.
    const resourceData = {
        // Web Dev
        frontend: { yt: ["https://www.youtube.com/watch?v=G3e-cpL7ofc"], websites: ["https://developer.mozilla.org/en-US/docs/Web", "https://roadmap.sh/frontend"] },
        backend: { yt: ["https://www.youtube.com/watch?v=Oe421EPjeBE"], websites: ["https://nodejs.dev/en/learn/", "https://roadmap.sh/backend"] },
        fullstack: { yt: ["https://www.youtube.com/watch?v=7CqJreqjmcg"], websites: ["https://www.theodinproject.com/", "https://fullstackopen.com/en/"] },
        // AI
        ai_concepts: { yt: ["https://www.youtube.com/watch?v=JMUxB95CC_E"], websites: ["https://www.geeksforgeeks.org/what-is-artificial-intelligence/"] },
        search_algos: { yt: ["https://www.youtube.com/watch?v=4tYoVx0QoN0"], websites: ["https://www.geeksforgeeks.org/searching-algorithms/"] },
        expert_systems: { yt: ["https://www.youtube.com/watch?v=S-a2Z0v-w_w"], websites: ["https://www.javatpoint.com/expert-systems-in-artificial-intelligence"] },
        // ML
        ml_foundations: { yt: ["https://www.youtube.com/watch?v=i_LwzRVP7bg"], websites: ["https://developers.google.com/machine-learning/crash-course", "https://www.kaggle.com/learn/intro-to-machine-learning"] },
        deep_learning: { yt: ["https://www.youtube.com/watch?v=aircAruvnKk"], websites: ["https://www.deeplearning.ai/", "https://pytorch.org/tutorials/"] },
        nlp: { yt: ["https://www.youtube.com/watch?v=dIUTsAcKgdY"], websites: ["https://huggingface.co/learn/nlp-course", "https://web.stanford.edu/~jurafsky/slp3/"] },
        // Cloud
        aws: { yt: ["https://www.youtube.com/watch?v=SOTamWNgDKc"], websites: ["https://aws.amazon.com/training/"] },
        gcp: { yt: ["https://www.youtube.com/watch?v=CVtH-8_O22g"], websites: ["https://cloud.google.com/learn"] },
        azure: { yt: ["https://www.youtube.com/watch?v=NKEFWyqJ5XA"], websites: ["https://learn.microsoft.com/en-us/azure/"] },
        // API
        rest_api: { yt: ["https://www.youtube.com/watch?v=Q-B_j9-xQUw"], websites: ["https://restfulapi.net/", "https://www.postman.com/learning/api-fundamentals/"] },
        graphql: { yt: ["https://www.youtube.com/watch?v=ed8SzALpx1Q"], websites: ["https://graphql.org/learn/", "https://www.howtographql.com/"] },
        api_security: { yt: ["https://www.youtube.com/watch?v=T5R6Ddn4b3E"], websites: ["https://owasp.org/www-project-api-security/"] },
        // DSA
        java_dsa: { yt: ["https://www.youtube.com/watch?v=rZ41y93P2Qo"], websites: ["https://www.geeksforgeeks.org/data-structures/", "https://leetcode.com/"] },
        python_dsa: { yt: ["https://www.youtube.com/watch?v=pkYVOmU3MgA"], websites: ["https://www.programiz.com/dsa", "https://realpython.com/python-data-structures/"] },
        // Git & GitHub
        git_basics: { yt: ["https://www.youtube.com/watch?v=RGOj5yH7evk"], websites: ["https://git-scm.com/book/en/v2", "https://www.atlassian.com/git/tutorials/what-is-version-control"] },
        branching: { yt: ["https://www.youtube.com/watch?v=H5G_9jpz-rE"], websites: ["https://www.atlassian.com/git/tutorials/using-branches"] },
        github_flow: { yt: ["https://www.youtube.com/watch?v=RGOj5yH7evk"], websites: ["https://docs.github.com/en/get-started/quickstart/github-flow"] }
    };

    function openModal(courseId) {
        const cardElement = document.querySelector(`.course-card[data-course="${courseId}"]`);
        if (!cardElement || !courseId) return;

        const data = courseData[courseId];
        if (!data) return;
        
        modalTitle.textContent = data.title;
        modalSubtopics.innerHTML = ''; 
        for (const key in data.subtopics) {
            const button = document.createElement('button');
            button.className = 'subtopic-btn';
            button.textContent = data.subtopics[key].name;
            button.dataset.subtopic = key;
            modalSubtopics.appendChild(button);
        }
        modalResources.classList.add('hidden');
        courseModal.classList.remove('hidden');
    }
    
    function showResources(subtopicId) {
        const data = resourceData[subtopicId];
        resourceLinks.innerHTML = ''; 
        if (!data || (!data.yt && !data.websites)) {
            resourceLinks.innerHTML = '<p>Resources coming soon!</p>';
        } else {
            if (data.yt) { data.yt.forEach(link => { resourceLinks.innerHTML += `<a href="${link}" target="_blank" class="resource-link">📺 YouTube</a>`; }); }
            if (data.websites) { data.websites.forEach(link => { resourceLinks.innerHTML += `<a href="${link}" target="_blank" class="resource-link">🌐 ${new URL(link).hostname}</a>`; }); }
        }
        modalResources.classList.remove('hidden');
    }

    courseCards.forEach(card => { 
        card.addEventListener('click', () => { 
            if(card.dataset.course) {
                openModal(card.dataset.course);
            }
        }); 
    });
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => { courseModal.classList.add('hidden'); });
    }

    if (courseModal) {
        courseModal.addEventListener('click', (e) => { if (e.target === courseModal) { courseModal.classList.add('hidden'); } });
    }
    
    if (modalSubtopics) {
        modalSubtopics.addEventListener('click', (e) => { if (e.target.classList.contains('subtopic-btn')) { showResources(e.target.dataset.subtopic); } });
    }
});