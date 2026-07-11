// --- 1. INITIALIZATION ---
const firebaseConfig = {
    apiKey: "AIzaSyAIiR4EP68Po1rmofPup5q7qDEp7p5ZxhQ",
    authDomain: "montvale-university.firebaseapp.com",
    projectId: "montvale-university",
    storageBucket: "montvale-university.firebasestorage.app",
    messagingSenderId: "887169245956",
    appId: "1:887169245956:web:34dce047784a736ead6651",
    measurementId: "G-N6SD3XJY4T"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentAttemptDocId = null;
let score = 0;
let currentQuestion = 0;

// --- 2. EXAM CONTENT ---
const questions = [    
// STRATEGIC MANAGEMENT
    { question: "Which strategy focuses on becoming the lowest-cost producer in the industry?", options: ["Differentiation", "Cost Leadership", "Focus Strategy", "Diversification"], answer: 1 },
    { question: "In M&A, 'Synergy' refers to:", options: ["Increased regulation", "Combined value exceeding individual parts", "Cost of rebranding", "Legal fees"], answer: 1 },
    { question: "The 'Balanced Scorecard' measures performance through which four perspectives?", options: ["Financial, Customer, Internal Process, Growth", "Sales, Marketing, HR, IT", "Assets, Liabilities, Equity, Revenue", "CEO, Board, Managers, Staff"], answer: 0 },
    { question: "A 'Hostile Takeover' occurs when:", options: ["The board approves the merger", "An acquisition is attempted without management consent", "Government bans the deal", "Employees go on strike"], answer: 1 },
    { question: "What is the primary legal obligation of corporate officers to stakeholders?", options: ["Maximize CEO salary", "Fiduciary Duty", "Reduce dividends", "Avoid marketing"], answer: 1 },

    // FINANCIAL ANALYSIS
    { question: "Why must expenses be recorded in the same period as the revenue they help generate?", options: ["Cash counting rules", "The Matching Principle", "Government regulation", "Asset parity"], answer: 1 },
    { question: "How is 'Net Working Capital' derived?", options: ["Total Assets - Total Liabilities", "Current Assets - Current Liabilities", "Revenue - Expenses", "Cash Inflow - Outflow"], answer: 1 },
    { question: "What does the 'Quick Ratio' measure?", options: ["Debt-to-Equity", "Short-term liquidity", "Return on Equity", "Gross Margin"], answer: 1 },
    { question: "The Capital Asset Pricing Model (CAPM) is used to:", options: ["Price physical assets", "Calculate expected return based on risk", "Value brand equity", "Manage payroll"], answer: 1 },
    { question: "What is the 'Rule of 72' used for?", options: ["Tax liabilities", "Estimating time to double an investment", "Inventory turnover", "Employee tenure"], answer: 1 },

    // OPERATIONS & EFFICIENCY
    { question: "What is the primary objective of 'Lean Manufacturing'?", options: ["Maximize inventory", "Eliminate waste", "Reduce product variety", "Increase lead times"], answer: 1 },
    { question: "What does 'DMAIC' stand for in Six Sigma?", options: ["Design, Manage, Assess, Improve, Control", "Define, Measure, Analyze, Improve, Control", "Draft, Model, Act, Initiate, Complete", "Direct, Monitor, Adjust, Inspect, Close"], answer: 1 },
    { question: "The 'Theory of Constraints' focuses on:", options: ["Maximizing individual department output", "Managing the system bottleneck", "Reducing staff", "Buying cheaper materials"], answer: 1 },
    { question: "What happens to unit costs as production volume increases (Economies of Scale)?", options: ["Costs increase", "Average unit cost decreases", "Profit decreases", "Market share stays flat"], answer: 1 },
    { question: "What is 'Transfer Pricing'?", options: ["Internal transactions between divisions", "Employee transfer costs", "Tax on stock sales", "Consultant fees"], answer: 0 },

    // ORGANIZATIONAL BEHAVIOR
    { question: "What is the fundamental conflict known as the 'Agency Problem'?", options: ["Board conflicts", "Shareholders vs. Management interests", "Hiring issues", "Government interference"], answer: 1 },
    { question: "What is the main challenge in a 'Matrix Organizational Structure'?", options: ["Simple chain of command", "Reporting to multiple managers", "Centralized decisions", "Small startup size"], answer: 1 },
    { question: "Which of these is a non-monetary incentive?", options: ["Performance bonus", "Stock options", "Flexible work arrangements", "Commission"], answer: 2 },
    { question: "What is the function of a 'Golden Parachute'?", options: ["Executive exit compensation", "Employee long-service reward", "Stock price guarantee", "Anti-takeover defense"], answer: 0 },
    { question: "What distinguishes 'Transformational' from 'Transactional' leadership?", options: ["Motivation/Change vs. Reward/Punishment", "Sales focus", "Accounting focus", "Asset focus"], answer: 0 },

    // MARKET DYNAMICS
    { question: "Why are firms in 'Perfect Competition' considered 'price takers'?", options: ["Significant market power", "Product differentiation", "Many buyers/sellers with perfect info", "Government price setting"], answer: 2 },
    { question: "What does 'Price Elasticity of Demand' measure?", options: ["Supply change responsiveness", "Quantity demanded responsiveness to price", "Total revenue", "Raw material costs"], answer: 1 },
    { question: "Which of these is a 'Leading Indicator'?", options: ["Unemployment rate", "Consumer Confidence Index", "GDP", "Historical sales"], answer: 1 },
    { question: "What is 'Operating Leverage'?", options: ["Variable cost ratio", "Extent of fixed costs in business", "Ability to borrow", "Tax rates"], answer: 1 },
    { question: "What is a danger of staying in the 'Maturity' phase of the product life cycle too long?", options: ["Excessive profit", "Stagnation and lack of innovation", "Lack of demand", "High marketing costs"], answer: 1 }
];

// --- 3. EXAM LOGIC ---
function startExam() {
    score = 0;
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    let container = document.querySelector(".container");
    let q = questions[currentQuestion];
    container.innerHTML = `
        <div class="card">
            <h2>Question ${currentQuestion + 1}/${questions.length}</h2>
            <h3>${q.question}</h3>
            ${q.options.map((opt, i) => `<button onclick="selectAnswer(${i === q.answer})">${opt}</button>`).join("")}
        </div>
    `;
}

function selectAnswer(isCorrect) {
    if (isCorrect) score++;
    currentQuestion++;
    (currentQuestion < questions.length) ? showQuestion() : finishExam();
}

async function finishExam() {
    let percentage = (score / questions.length) * 100;
    try {
        const attemptRef = await db.collection("business_attempt").add({
            scoreObtained: score,
            totalMarks: questions.length,
            percentage: percentage,
            passed: percentage >= 5,
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentAttemptDocId = attemptRef.id;
    } catch (e) { console.error(e); }

    document.querySelector(".container").innerHTML = `
        <div class="card">
            <h1>${percentage >= 85 ? "Congratulations!" : "Assessment Complete"}</h1>
            <p>Your Final Score: ${percentage}%</p>
            <button onclick="${percentage >= 85 ? 'askName()' : 'startExam()'}">${percentage >= 85 ? 'Generate Certificate' : 'Retry Exam'}</button>
        </div>
    `;
}

function askName() {
    let name = prompt("Enter your name for the certificate:");
    if (name && name.trim() !== "") {
        const certId = "MV-" + Math.floor(Math.random() * 999999999999);
        showCertificate(name, certId);
    }
}

async function showCertificate(name, certId) {
    if (currentAttemptDocId) {
        await db.collection("business_attempt").doc(currentAttemptDocId).update({ certificateId: certId });
    }
    await db.collection("certificates").doc(certId).set({ studentName: name, date: new Date().toLocaleDateString() });

    const container = document.querySelector(".container");
    container.innerHTML = `
        <div id="cert-content" style="width: 900px; height: 600px; padding: 40px; border: 15px solid #333; text-align: center; background: white; font-family: 'Georgia', serif; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; box-sizing: border-box;">
            <img src="../logo.png" style="width:120px; border-radius:50%; margin-bottom:15px;" style="max-width: 120px; height: auto; margin-bottom: 5px;">
            <h1 style="font-size: 50px; margin: 0;">Montvale Academy</h1>
            <h2 style="font-size: 26px; color: #555; margin: 0 0 10px 0;">Diploma of Proficiency in Business Administration</h2>
            <p style="font-size: 20px; margin: 0;">This is to certify that</p>
            <h3 style="font-size: 45px; margin: 5px 0; border-bottom: 3px solid #333; display: inline-block;">${name}</h3>
            <p style="font-size: 20px; margin: 0;">has successfully completed his/her online course in business administration.</p>
            <div style="position: absolute; bottom: 30px; left: 40px; right: 40px; display: flex; justify-content: space-between; align-items: center; font-size: 16px; color: #333; border-top: 1px solid #ccc; padding-top: 10px;">
                <span><strong>ID:</strong> ${certId}</span>
                <span><strong>Date:</strong> ${new Date().toLocaleDateString()}</span>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <button id="download-btn">Download Certificate</button>
        </div>
    `;

    document.getElementById('download-btn').addEventListener('click', () => {
        const btn = document.getElementById('download-btn');
        btn.style.display = 'none';
        html2canvas(document.getElementById('cert-content'), { scale: 2, useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'Certificate.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            btn.style.display = 'inline-block';
        });
    });
}
