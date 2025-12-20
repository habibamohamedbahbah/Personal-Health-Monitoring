//==================== Mental Health Configuration ====================let currentService = '';
let moods = JSON.parse(localStorage.getItem('moods') || '{}');
let waterCount = parseInt(localStorage.getItem('waterCount')) || 0;
let timerInterval;
let unlockedVideos = [true, false, false]; // للفيديوهات المقفلة
let quizAnswers = {};

// وظائف Modal الأساسية
function openService(serviceId) {
    currentService = serviceId;
    
    // إخفاء الصفحة الرئيسية (الشاشة اللي فيها كروت الخدمات)
    const mainServices = document.getElementById('mainServices'); // غيري الـ ID لو مختلف عندك
    if (mainServices) {
        mainServices.style.display = 'none';
    }
    
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    
    // تعبئة المحتوى بناءً على الخدمة المختارة
    let content = '';
    const serviceTitles = {
        'emotional': 'Emotional Support',
        'ai-assistant': 'AI Mental Assistant',
        'mood': 'Mood Tracking',
        'stress': 'Stress Management',
        'mindfulness': 'Mindfulness',
        'tests': 'Self Assessment Tests',
        'videos': 'Therapy Videos',
        'reports': 'AI Reports',
        'emergency': 'Emergency Help'
    };
    
    content = `
        <h2 style="color: #4CAF50; margin-bottom: 20px;">
            <i class="bi ${getServiceIcon(serviceId)}"></i> 
            ${serviceTitles[serviceId]}
        </h2>
        <div id="serviceContent"></div>
    `;
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    
    // تحميل المحتوى المحدد
    setTimeout(() => loadServiceContent(serviceId), 10);
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    
    // إرجاع إظهار الصفحة الرئيسية (كروت الخدمات)
    const mainServices = document.getElementById('mainServices'); // نفس الـ ID
    if (mainServices) {
        mainServices.style.display = 'grid'; // أو 'flex' أو 'block' حسب الـ CSS الأصلي
    }
    
    currentService = '';
}

function getServiceIcon(serviceId) {
    const icons = {
        'emotional': 'bi-heart',
        'ai-assistant': 'bi-robot',
        'mood': 'bi-emoji-smile',
        'stress': 'bi-lightning',
        'mindfulness': 'bi-wind',
        'tests': 'bi-clipboard-check',
        'videos': 'bi-play-circle',
        'reports': 'bi-file-earmark-pdf',
        'emergency': 'bi-exclamation-triangle'
    };
    return icons[serviceId] || 'bi-question-circle';
}

// تحميل محتوى الخدمات
function loadServiceContent(serviceId) {
    const contentDiv = document.getElementById('serviceContent');
    
    switch(serviceId) {
        case 'emotional':
            loadEmotionalSupport(contentDiv);
            break;
        case 'ai-assistant':
            loadAIAssistant(contentDiv);
            break;
        case 'mood':
            loadMoodTracking(contentDiv);
            break;
        case 'stress':
            loadStressManagement(contentDiv);
            break;
        case 'mindfulness':
            loadMindfulness(contentDiv);
            break;
        case 'tests':
            loadSelfTests(contentDiv);
            break;
        case 'videos':
            loadTherapyVideos(contentDiv);
            break;
        case 'reports':
            loadAIReports(contentDiv);
            break;
        case 'emergency':
            loadEmergencyHelp(contentDiv);
            break;
    }
}

// 1️⃣ Emotional Support
function loadEmotionalSupport(container) {
    const affirmations = [
        "You're not alone 💙",
        "Your feelings are valid",
        "Every day is a new chance",
        "You are strong",
        "Rest is important",
        "Small steps count",
        "Progress over perfection",
        "Be kind to yourself",
        "This too shall pass",
        "You matter"
    ];
    
    let html = `
        <p style="margin-bottom: 30px; font-size: 18px;">
            Flip these cards for positive affirmations whenever you need support.
        </p>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
    `;
    
    affirmations.forEach((msg, index) => {
        html += `
            <div class="flip-card" onclick="flipCard(this)">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <i class="bi bi-chat-heart" style="font-size: 24px;"></i>
                    </div>
                    <div class="flip-card-back">
                        ${msg}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

function flipCard(card) {
    const inner = card.querySelector('.flip-card-inner');
    inner.style.transform = inner.style.transform === 'rotateY(180deg)' 
        ? 'rotateY(0deg)' 
        : 'rotateY(180deg)';
}

// 2️⃣ AI Assistant
function loadAIAssistant(container) {
    const responses = {
        'stress': "Let's try some breathing exercises. Inhale for 4 seconds, hold for 4, exhale for 6. Repeat 5 times.",
        'anxious': "You're safe. Try grounding: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
        'sad': "It's okay to feel this way. Would you like to try mood tracking to better understand your feelings?",
        'tired': "Rest is productive. Maybe a short walk or stretching could help refresh you.",
        'angry': "Take a moment. Try counting backwards from 10. Would you like stress management tips?",
        'happy': "That's wonderful! Keep celebrating the good moments.",
        'default': "Thanks for sharing. How can I support you today?"
    };
    
    let html = `
        <p style="margin-bottom: 20px;">Chat with our AI assistant about how you're feeling.</p>
        <div class="chat-messages" id="aiChatMessages">
            <div style="color: #666; text-align: center; padding: 20px;">
                <i class="bi bi-robot" style="font-size: 24px;"></i><br>
                Hi! I'm here to listen and help. How are you feeling today?
            </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <input type="text" id="aiInput" placeholder="Type how you're feeling..." 
                   style="flex: 1; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
            <button onclick="sendAIMessage()" 
                    style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                Send
            </button>
        </div>
        <div style="margin-top: 20px;">
            <p><strong>Quick suggestions:</strong></p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${Object.keys(responses).filter(k => k !== 'default').map(key => 
                    `<button onclick="sendQuickMessage('${key}')" 
                            style="background: #e8f5e8; border: 1px solid #4CAF50; padding: 8px 12px; border-radius: 6px; cursor: pointer;">
                        I feel ${key}
                    </button>`
                ).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.toLowerCase().trim();
    if (!message) return;
    
    const chat = document.getElementById('aiChatMessages');
    chat.innerHTML += `<div style="text-align: right; margin: 10px 0;"><strong>You:</strong> ${input.value}</div>`;
    
    let response = "Thanks for sharing. How else can I help?";
    
    if (message.includes('stress')) response = responses.stress;
    else if (message.includes('anxious') || message.includes('anxiety')) response = responses.anxious;
    else if (message.includes('sad') || message.includes('depress')) response = responses.sad;
    else if (message.includes('tired') || message.includes('exhaust')) response = responses.tired;
    else if (message.includes('angry') || message.includes('mad')) response = responses.angry;
    else if (message.includes('happy') || message.includes('good')) response = responses.happy;
    
    setTimeout(() => {
        chat.innerHTML += `
            <div style="background: #e8f5e8; padding: 10px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4CAF50;">
                <strong><i class="bi bi-robot"></i> Assistant:</strong> ${response}
            </div>
        `;
        chat.scrollTop = chat.scrollHeight;
    }, 500);
    
    input.value = '';
}

function sendQuickMessage(feeling) {
    const responses = {
        'stress': "I'm feeling stressed",
        'anxious': "I'm feeling anxious",
        'sad': "I'm feeling sad",
        'tired': "I'm feeling tired",
        'angry': "I'm feeling angry",
        'happy': "I'm feeling happy!"
    };
    
    document.getElementById('aiInput').value = responses[feeling];
    sendAIMessage();
}

// 3️⃣ Mood Tracking
function loadMoodTracking(container) {
    const today = new Date().toISOString().split('T')[0];
    const todayMood = moods[today] || 'Not recorded yet';
    
    let html = `
        <div style="text-align: center;">
            <h3>How are you feeling today?</h3>
            <p style="margin-bottom: 30px;">Select your current mood:</p>
            
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-bottom: 40px;">
                <button class="mood-btn" onclick="recordMood('😊', 'Happy')">😊 Happy</button>
                <button class="mood-btn" onclick="recordMood('😐', 'Neutral')">😐 Neutral</button>
                <button class="mood-btn" onclick="recordMood('😔', 'Sad')">😔 Sad</button>
                <button class="mood-btn" onclick="recordMood('😡', 'Angry')">😡 Angry</button>
                <button class="mood-btn" onclick="recordMood('😴', 'Tired')">😴 Tired</button>
                <button class="mood-btn" onclick="recordMood('😰', 'Anxious')">😰 Anxious</button>
            </div>
            
            <div id="moodAnimation" style="font-size: 80px; height: 100px; margin: 20px 0;"></div>
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 12px; margin-top: 30px;">
                <h4>📊 Your Mood History</h4>
                <div id="moodHistory" style="margin-top: 15px;"></div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    updateMoodHistory();
}

function recordMood(emoji, label) {
    const today = new Date().toISOString().split('T')[0];
    moods[today] = { emoji, label, time: new Date().toLocaleTimeString() };
    localStorage.setItem('moods', JSON.stringify(moods));
    
    // عرض أنيميشن
    const animationDiv = document.getElementById('moodAnimation');
    animationDiv.innerHTML = emoji;
    animationDiv.style.animation = 'fadeIn 0.5s';
    
    setTimeout(() => {
        animationDiv.innerHTML = `Recorded: ${label} ${emoji}`;
        updateMoodHistory();
    }, 1000);
}

function updateMoodHistory() {
    const historyDiv = document.getElementById('moodHistory');
    if (!historyDiv) return;
    
    const moodEntries = Object.entries(moods).slice(-7); // آخر 7 أيام
    
    if (moodEntries.length === 0) {
        historyDiv.innerHTML = '<p style="color: #666;">No mood records yet. Select a mood above!</p>';
        return;
    }
    
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">';
    
    moodEntries.reverse().forEach(([date, mood]) => {
        html += `
            <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="font-size: 30px; margin-bottom: 5px;">${mood.emoji}</div>
                <div><strong>${mood.label}</strong></div>
                <div style="font-size: 12px; color: #666;">${date}</div>
                <div style="font-size: 11px; color: #888;">${mood.time}</div>
            </div>
        `;
    });
    
    html += '</div>';
    historyDiv.innerHTML = html;
}

// 4️⃣ Stress Management
function loadStressManagement(container) {
    let html = `
        <div style="display: grid; gap: 25px;">
            <!-- To-Do List -->
            <div style="background: #e8f5e8; padding: 25px; border-radius: 12px;">
                <h3><i class="bi bi-list-check"></i> Simplify Your Tasks</h3>
                <p>Break down overwhelming tasks into manageable steps:</p>
                
                <div style="display: flex; gap: 10px; margin: 15px 0;">
                    <input type="text" id="todoInput" placeholder="Add a simple task..." 
                           style="flex: 1; padding: 10px; border: 2px solid #4CAF50; border-radius: 6px;">
                    <button onclick="addTodoItem()" 
                            style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        Add
                    </button>
                </div>
                
                <ul id="todoList" class="todo-list"></ul>
            </div>
            
            <!-- Timer -->
            <div style="background: #fff3e0; padding: 25px; border-radius: 12px;">
                <h3><i class="bi bi-clock"></i> Take a Break Timer</h3>
                <p>Set a timer for a 10-minute walk or stretch:</p>
                
                <div class="timer-display" id="timerDisplay">10:00</div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="startTimer(600)" 
                            style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Start 10 min
                    </button>
                    <button onclick="startTimer(300)" 
                            style="background: #ff9800; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Start 5 min
                    </button>
                    <button onclick="resetTimer()" 
                            style="background: #f44336; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Reset
                    </button>
                </div>
            </div>
            
            <!-- Water Tracker -->
            <div style="background: #e3f2fd; padding: 25px; border-radius: 12px;">
                <h3><i class="bi bi-cup"></i> Hydration Challenge</h3>
                <p>Track your water intake for today:</p>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="font-size: 48px; color: #2196f3;" id="waterCounter">${waterCount}</div>
                    <div>glasses today</div>
                </div>
                
                <button onclick="addWater()" 
                        style="background: #2196f3; color: white; border: none; padding: 15px 30px; font-size: 18px; border-radius: 8px; cursor: pointer; width: 100%;">
                    + Add Glass of Water
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    loadTodoList();
    // تحديث عداد الماء عند التحميل
    document.getElementById('waterCounter').textContent = waterCount;
}

function addTodoItem() {
    const input = document.getElementById('todoInput');
    if (!input.value.trim()) return;
    
    const list = document.getElementById('todoList');
    const item = document.createElement('li');
    
    item.innerHTML = `
        <span>${input.value}</span>
        <button onclick="this.parentElement.remove()" 
                style="background: #ff5252; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer;">
            ✓
        </button>
    `;
    
    list.appendChild(item);
    input.value = '';
}

function loadTodoList() {
    const list = document.getElementById('todoList');
    if (list && list.children.length === 0) {
        list.innerHTML = '<p style="color: #666; text-align: center;">Add your first task above!</p>';
    }
}

function startTimer(seconds) {
    clearInterval(timerInterval);
    
    let timeLeft = seconds;
    const timerDisplay = document.getElementById('timerDisplay');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        timerDisplay.style.color = timeLeft < 60 ? '#f44336' : '#4CAF50';
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up! 🎉";
            alert("Break time is over! Good job taking care of yourself.");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').textContent = "10:00";
    document.getElementById('timerDisplay').style.color = "#4CAF50";
}

function addWater() {
    waterCount++;
    localStorage.setItem('waterCount', waterCount);
    const counter = document.getElementById('waterCounter');
    if (counter) {
        counter.textContent = waterCount;
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => counter.style.transform = 'scale(1)', 300);
    }
}

// 5️⃣ Mindfulness
function loadMindfulness(container) {
    let html = `
        <div style="text-align: center;">
            <h3>Mindfulness & Meditation</h3>
            <p style="margin-bottom: 30px; font-size: 18px;">
                Take a few minutes to center yourself with these exercises.
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; margin: 40px 0;">
                <!-- Breathing Exercise -->
                <div style="background: #f0f8ff; padding: 25px; border-radius: 12px;">
                    <h4><i class="bi bi-wind"></i> Breathing Exercise</h4>
                    <div style="margin: 20px 0;">
                        <div style="font-size: 24px; color: #4CAF50;" id="breathText">Breathe In</div>
                        <div style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #4CAF50; margin: 20px auto; position: relative;" id="breathCircle">
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px;" id="breathTimer">4</div>
                        </div>
                    </div>
                    <button onclick="startBreathing()" 
                            style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Start Breathing Exercise
                    </button>
                </div>
        
        </div>
    `;
    
    container.innerHTML = html;
}

function startBreathing() {
    const breathText = document.getElementById('breathText');
    const breathTimer = document.getElementById('breathTimer');
    const breathCircle = document.getElementById('breathCircle');
    
    let cycle = 0;
    const totalCycles = 5;
    
    function breathAnimation(step) {
        if (cycle >= totalCycles) {
            breathText.textContent = "Exercise Complete!";
            breathTimer.textContent = "✓";
            breathCircle.style.borderColor = "#4CAF50";
            return;
        }
        
        switch(step) {
            case 0: // Breathe In
                breathText.textContent = "Breathe In";
                breathTimer.textContent = "4";
                breathCircle.style.borderColor = "#4CAF50";
                breathCircle.style.transform = "scale(1.2)";
                setTimeout(() => breathAnimation(1), 4000);
                break;
                
            case 1: // Hold
                breathText.textContent = "Hold";
                breathTimer.textContent = "4";
                breathCircle.style.borderColor = "#FF9800";
                setTimeout(() => breathAnimation(2), 4000);
                break;
                
            case 2: // Breathe Out
                breathText.textContent = "Breathe Out";
                breathTimer.textContent = "6";
                breathCircle.style.borderColor = "#2196F3";
                breathCircle.style.transform = "scale(1)";
                setTimeout(() => {
                    cycle++;
                    breathAnimation(0);
                }, 6000);
                break;
        }
    }
    
    breathAnimation(0);
}

// 6️⃣ Self Tests
function loadSelfTests(container) {
    const questions = [
        "Do you often feel sad or down most of the day?",
        "Have you lost interest in activities you used to enjoy?",
        "Do you have trouble sleeping or sleep too much?",
        "Do you feel tired or low energy most days?",
        "Do you often feel anxious or worried?",
        "Do you find it hard to concentrate?",
        "Do you experience frequent headaches or physical tension?",
        "Do you avoid social situations more than usual?",
        "Do you feel hopeless about the future?"
    ];
    
    let html = `
        <div style="max-width: 700px; margin: 0 auto;">
            <h3 style="color: #4CAF50;">Self-Assessment Quiz</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <p><strong>⚠️ Important:</strong> This is not a medical diagnosis. 
                It's a simple check-in tool. If you're concerned about your mental health, 
                please consult a professional.</p>
            </div>
            
            <div id="quizContainer">
                <form id="quizForm">
                    ${questions.map((q, i) => `
                        <div class="test-question" style="animation-delay: ${i * 0.1}s;">
                            <p><strong>${i+1}.</strong> ${q}</p>
                            <div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
                                <label style="cursor: pointer;">
                                    <input type="radio" name="q${i}" value="0" required> 
                                    Never
                                </label>
                                <label style="cursor: pointer;">
                                    <input type="radio" name="q${i}" value="1"> 
                                    Sometimes
                                </label>
                                <label style="cursor: pointer;">
                                    <input type="radio" name="q${i}" value="2"> 
                                    Often
                                </label>
                            </div>
                        </div>
                    `).join('')}
                </form>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <button onclick="calculateQuizScore()" 
                        style="background: #4CAF50; color: white; border: none; padding: 15px 40px; font-size: 18px; border-radius: 8px; cursor: pointer;">
                    Get My Results
                </button>
            </div>
            
            <div id="quizResult" style="margin-top: 30px;"></div>
        </div>
    `;
    
    container.innerHTML = html;
    
    setTimeout(() => {
        document.querySelectorAll('.test-question').forEach((q, i) => {
            q.style.opacity = '1';
            q.style.transform = 'translateY(0)';
        });
    }, 100);
}

function calculateQuizScore() {
    const form = document.getElementById('quizForm');
    let score = 0;
    let answered = 0;
    
    for (let i = 0; i < 9; i++) {
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
            answered++;
        }
    }
    
    if (answered < 9) {
        alert("Please answer all questions before submitting.");
        return;
    }
    
    let result = '';
    let color = '#4CAF50';
    let suggestions = [];
    
    if (score <= 6) {
        result = 'Low stress level';
        color = '#4CAF50';
        suggestions = [
            "Continue your good self-care habits",
            "Regular mood tracking can help maintain balance",
            "Try mindfulness exercises for prevention"
        ];
    } else if (score <= 12) {
        result = 'Medium stress level';
        color = '#FF9800';
        suggestions = [
            "Consider trying stress management techniques",
            "Regular breaks and hydration can help",
            "Mindfulness exercises may be beneficial"
        ];
    } else {
        result = 'High stress level';
        color = '#f44336';
        suggestions = [
            "Consider talking to a mental health professional",
            "Practice daily mindfulness and self-care",
            "Use the emergency resources if needed"
        ];
    }
    
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = `
        <div style="background: ${color}20; border-left: 4px solid ${color}; padding: 25px; border-radius: 8px;">
            <h3 style="color: ${color}; margin-top: 0;">Your Result: ${result}</h3>
            <p><strong>Score:</strong> ${score} out of 18</p>
            <p><strong>Suggestions:</strong></p>
            <ul style="text-align: left;">
                ${suggestions.map(s => `<li>${s}</li>`).join('')}
            </ul>
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 6px;">
                <p style="font-size: 14px; color: #666;">
                    <i class="bi bi-info-circle"></i> 
                    Remember: This is not a clinical diagnosis. If you're concerned about your mental health, 
                    please speak with a healthcare provider.
                </p>
            </div>
        </div>
    `;
    
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// 7️⃣ Therapy Videos
function loadTherapyVideos(container) {
    const videoSeries = [
        {
            title: "Anxiety Management",
            videos: [
                { id: 0, title: "Understanding Anxiety", src: "https://pin.it/4PsPfJJMB", unlocked: true },
                { id: 1, title: "Coping Techniques", src: "https://pin.it/7vJk83L50", unlocked: false },
                { id: 2, title: "Breathing Exercises", src: "https://pin.it/7wMCyKlfW", unlocked: false }
            ]
        },
        {
            title: "Mindfulness",
            videos: [
                { id: 3, title: "Beginner's Guide", src: "https://pin.it/66W6PIRYp", unlocked: true },
                { id: 4, title: "Daily Practice", src: "https://pin.it/6CBOaX6lH", unlocked: false }
            ]
        }
    ];
    
    let html = `
        <div style="text-align: center;">
            <h3>Therapy & Educational Videos</h3>
            <p style="margin-bottom: 30px;">
                Watch these videos to learn coping techniques. Complete one video to unlock the next in the series.
            </p>
            
            ${videoSeries.map(series => `
                <div style="margin-bottom: 40px;">
                    <h4 style="color: #4CAF50; text-align: left; margin-bottom: 20px;">
                        ${series.title}
                    </h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                        ${series.videos.map(video => `
                            <div class="video-card ${video.unlocked ? '' : 'locked'}" 
                                 onclick="${video.unlocked ? `playVideo('${video.src}', '${video.title}')` : ''}">
                                ${video.unlocked ? `
                                    <div>
                                        <i class="bi bi-play-circle" style="font-size: 40px; color: #4CAF50; margin-bottom: 10px;"></i>
                                        <div>${video.title}</div>
                                    </div>
                                ` : `
                                    <div>
                                        <i class="bi bi-lock" style="font-size: 40px; color: #999; margin-bottom: 10px;"></i>
                                        <div>${video.title}</div>
                                        <small style="color: #999;">Complete previous video</small>
                                    </div>
                                `}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div id="videoPlayerContainer" style="display: none; margin-top: 40px;">
                <h4 id="videoTitle"></h4>
                <div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto;">
                    <iframe id="currentVideo" width="100%" height="340" 
                            frameborder="0" allowfullscreen
                            style="border-radius: 12px;">
                    </iframe>
                    <button onclick="completeVideo()" 
                            style="position: absolute; top: 10px; right: 10px; background: #4CAF50; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">
                        Mark Complete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function playVideo(src, title) {
    const container = document.getElementById('videoPlayerContainer');
    const video = document.getElementById('currentVideo');
    const videoTitle = document.getElementById('videoTitle');
    
    video.src = src;
    videoTitle.textContent = title;
    container.style.display = 'block';
    
    container.scrollIntoView({ behavior: 'smooth' });
}

function completeVideo() {
    alert("Great job completing this video! The next video in the series is now unlocked.");
    document.getElementById('videoPlayerContainer').style.display = 'none';
}

// 8️⃣ AI Reports
function loadAIReports(container) {
    let html = `
        <div style="text-align: center;">
            <h3>Your Mental Health Report</h3>
            <p style="margin-bottom: 30px;">
                Get personalized insights based on your mood tracking and activities.
            </p>
            
            <button onclick="generateReport()" 
                    style="background: #4CAF50; color: white; border: none; padding: 15px 40px; font-size: 18px; border-radius: 8px; cursor: pointer; margin-bottom: 30px;">
                Generate Weekly Report
            </button>
            
            <div id="reportContent" style="background: #f9f9f9; padding: 30px; border-radius: 12px; text-align: left; display: none;">
                <!-- سيتم ملء المحتوى هنا -->
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function generateReport() {
    const moodEntries = Object.entries(moods);
    const reportDiv = document.getElementById('reportContent');
    
    if (moodEntries.length === 0) {
        reportDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="bi bi-bar-chart" style="font-size: 48px; color: #ccc;"></i>
                <h3>No Data Yet</h3>
                <p>Start tracking your mood to generate a personalized report.</p>
            </div>
        `;
        reportDiv.style.display = 'block';
        reportDiv.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    const moodCounts = { '😊':0, '😐':0, '😔':0, '😡':0, '😴':0, '😰':0 };
    moodEntries.forEach(([date, mood]) => {
        moodCounts[mood.emoji] = (moodCounts[mood.emoji] || 0) + 1;
    });
    
    const total = moodEntries.length;
    const mostCommonMood = Object.entries(moodCounts).reduce((a,b) => b[1] > a[1] ? b : a)[0];
    
    let tips = [];
    if (mostCommonMood === '😊') {
        tips = ["Keep up the great work!", "Continue practicing self-care", "Share positive habits with others"];
    } else if (mostCommonMood === '😔' || mostCommonMood === '😡') {
        tips = ["Try mindfulness exercises", "Consider talking to someone", "Use stress management tools"];
    } else {
        tips = ["Regular mood tracking helps", "Balance is key - try different activities", "Stay hydrated and take breaks"];
    }
    
    const reportHTML = `
        <div style="animation: fadeIn 1s;">
            <h3 style="color: #4CAF50; text-align: center;">Your Weekly Insights</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 36px;">${total}</div>
                    <div>Days Tracked</div>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 36px;">${mostCommonMood}</div>
                    <div>Most Common Mood</div>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 36px;">${Math.round((moodCounts['😊'] / total) * 100) || 0}%</div>
                    <div>Positive Days</div>
                </div>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0;">
                <h4><i class="bi bi-lightbulb"></i> Personalized Suggestions</h4>
                <ul>
                    ${tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px;">
                <h4><i class="bi bi-bar-chart"></i> Mood Distribution</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    ${Object.entries(moodCounts).filter(([_, count]) => count > 0).map(([emoji, count]) => `
                        <div style="flex: 1; min-width: 100px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>${emoji}</span>
                                <span>${count}</span>
                            </div>
                            <div style="background: #f0f0f0; border-radius: 4px; height: 10px;">
                                <div style="background: #4CAF50; width: ${(count/total)*100}%; height: 100%; border-radius: 4px;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                    <i class="bi bi-info-circle"></i>
                    Report generated on ${new Date().toLocaleDateString()} • Keep tracking for better insights!
                </p>
            </div>
        </div>
    `;
    
    reportDiv.innerHTML = reportHTML;
    reportDiv.style.display = 'block';
    reportDiv.scrollIntoView({ behavior: 'smooth' });
}

// 9️⃣ Emergency Help
function loadEmergencyHelp(container) {
    const hotlines = [
        { country: "Egypt", services: [
            { name: "Police (نجدة)", number: "122" },
            { name: "Ambulance (إسعاف)", number: "123" },
            { name: "Fire Department (مطافئ)", number: "180" }
        ]}
        
    ];
    
    let html = `
        <div style="text-align: center;">
            <div style="background: #ffebee; border: 3px solid #d32f2f; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #d32f2f; margin-top: 0;">🚨 Emergency Help</h2>
                <p style="font-size: 20px; font-weight: bold;">
                    If you're in crisis or feel unsafe, please seek immediate help.
                </p>
                <p style="font-size: 18px;">
                    Call emergency services or a trusted person right now.
                </p>
            </div>
            
            <div style="display: grid; gap: 25px;">
                ${hotlines.map(country => `
                    <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h4 style="color: #4CAF50; margin-top: 0;">${country.country}</h4>
                        <div style="display: grid; gap: 15px;">
                            ${country.services.map(service => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                                    <span style="font-weight: bold;">${service.name}</span>
                                    <button onclick="callNumber('${service.number}')" 
                                            style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                                        ${service.number}
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
           
            
        
        </div>
    `;
    
    container.innerHTML = html;
}

function callNumber(number) {
    if (confirm(`Do you want to call ${number}?`)) {
        alert(`Calling ${number}... Please use your phone to make the call.`);
    }
}
document.getElementById('serviceModal').addEventListener('click', function(e) {
    if (e.target.id === 'serviceModal') {
        closeModal();
    }
});

// تهيئة عند تحميل الصفحة// ...existing code...

// ==================== CLOSE MODAL HANDLER ====================
document.addEventListener('DOMContentLoaded', function() {
  // Close modal when clicking close button
  document.addEventListener('click', function(e) {
    // Close button: any element with class close, close-btn, close-button
    if (e.target.closest('.close, .close-btn, .close-button, [data-close]')) {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
      }
      return;
    }

    // Close when clicking outside modal (on the overlay)
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      e.target.classList.remove('active');
    }
  });

  // Close modal when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'block' || modal.classList.contains('active')) {
          modal.style.display = 'none';
          modal.classList.remove('active');
        }
      });
    }
  });
});
 
