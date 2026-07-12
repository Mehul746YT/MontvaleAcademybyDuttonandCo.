// We obfuscate the correct options array using a simple mathematical offset or base64 to hide it from a basic inspect element check.
// In this case, we'll store the answers in the code as shifted indices, and compute them at evaluation time.
// E.g., if the real index is 1, and the offset is 5, stored answer is 6 (restored via (val - 5)).
const ANSWER_KEY_OFFSET = 7;

const QUESTIONS = [
    // STRATEGIC MANAGEMENT
    { question: "Which strategy focuses on becoming the lowest-cost producer in the industry?", options: ["Differentiation", "Cost Leadership", "Focus Strategy", "Diversification"], ansKey: 8 }, // 1 + 7 = 8
    { question: "In M&A, 'Synergy' refers to:", options: ["Increased regulation", "Combined value exceeding individual parts", "Cost of rebranding", "Legal fees"], ansKey: 8 },
    { question: "The 'Balanced Scorecard' measures performance through which four perspectives?", options: ["Financial, Customer, Internal Process, Growth", "Sales, Marketing, HR, IT", "Assets, Liabilities, Equity, Revenue", "CEO, Board, Managers, Staff"], ansKey: 7 }, // 0 + 7 = 7
    { question: "A 'Hostile Takeover' occurs when:", options: ["The board approves the merger", "An acquisition is attempted without management consent", "Government bans the deal", "Employees go on strike"], ansKey: 8 },
    { question: "What is the primary legal obligation of corporate officers to stakeholders?", options: ["Maximize CEO salary", "Fiduciary Duty", "Reduce dividends", "Avoid marketing"], ansKey: 8 },

    // FINANCIAL ANALYSIS
    { question: "Why must expenses be recorded in the same period as the revenue they help generate?", options: ["Cash counting rules", "The Matching Principle", "Government regulation", "Asset parity"], ansKey: 8 },
    { question: "How is 'Net Working Capital' derived?", options: ["Total Assets - Total Liabilities", "Current Assets - Current Liabilities", "Revenue - Expenses", "Cash Inflow - Outflow"], ansKey: 8 },
    { question: "What does the 'Quick Ratio' measure?", options: ["Debt-to-Equity", "Short-term liquidity", "Return on Equity", "Gross Margin"], ansKey: 8 },
    { question: "The Capital Asset Pricing Model (CAPM) is used to:", options: ["Price physical assets", "Calculate expected return based on risk", "Value brand equity", "Manage payroll"], ansKey: 8 },
    { question: "What is the 'Rule of 72' used for?", options: ["Tax liabilities", "Estimating time to double an investment", "Inventory turnover", "Employee tenure"], ansKey: 8 },

    // OPERATIONS & EFFICIENCY
    { question: "What is the primary objective of 'Lean Manufacturing'?", options: ["Maximize inventory", "Eliminate waste", "Reduce product variety", "Increase lead times"], ansKey: 8 },
    { question: "What does 'DMAIC' stand for in Six Sigma?", options: ["Design, Manage, Assess, Improve, Control", "Define, Measure, Analyze, Improve, Control", "Draft, Model, Act, Initiate, Complete", "Direct, Monitor, Adjust, Inspect, Close"], ansKey: 8 },
    { question: "The 'Theory of Constraints' focuses on:", options: ["Maximizing individual department output", "Managing the system bottleneck", "Reducing staff", "Buying cheaper materials"], ansKey: 8 },
    { question: "What happens to unit costs as production volume increases (Economies of Scale)?", options: ["Costs increase", "Average unit cost decreases", "Profit decreases", "Market share stays flat"], ansKey: 8 },
    { question: "What is 'Transfer Pricing'?", options: ["Internal transactions between divisions", "Employee transfer costs", "Tax on stock sales", "Consultant fees"], ansKey: 7 },

    // ORGANIZATIONAL BEHAVIOR
    { question: "What is the fundamental conflict known as the 'Agency Problem'?", options: ["Board conflicts", "Shareholders vs. Management interests", "Hiring issues", "Government interference"], ansKey: 8 },
    { question: "What is the main challenge in a 'Matrix Organizational Structure'?", options: ["Simple chain of command", "Reporting to multiple managers", "Centralized decisions", "Small startup size"], ansKey: 8 },
    { question: "Which of these is a non-monetary incentive?", options: ["Performance bonus", "Stock options", "Flexible work arrangements", "Commission"], ansKey: 9 }, // 2 + 7 = 9
    { question: "What is the function of a 'Golden Parachute'?", options: ["Executive exit compensation", "Employee long-service reward", "Stock price guarantee", "Anti-takeover defense"], ansKey: 7 },
    { question: "What distinguishes 'Transformational' from 'Transactional' leadership?", options: ["Motivation/Change vs. Reward/Punishment", "Sales focus", "Accounting focus", "Asset focus"], ansKey: 7 },

    // MARKET DYNAMICS
    { question: "Why are firms in 'Perfect Competition' considered 'price takers'?", options: ["Significant market power", "Product differentiation", "Many buyers/sellers with perfect info", "Government price setting"], ansKey: 9 },
    { question: "What does 'Price Elasticity of Demand' measure?", options: ["Supply change responsiveness", "Quantity demanded responsiveness to price", "Total revenue", "Raw material costs"], ansKey: 8 },
    { question: "Which of these is a 'Leading Indicator'?", options: ["Unemployment rate", "Consumer Confidence Index", "GDP", "Historical sales"], ansKey: 8 },
    { question: "What is 'Operating Leverage'?", options: ["Variable cost ratio", "Extent of fixed costs in business", "Ability to borrow", "Tax rates"], ansKey: 8 },
    { question: "What is a danger of staying in the 'Maturity' phase of the product life cycle too long?", options: ["Excessive profit", "Stagnation and lack of innovation", "Lack of demand", "High marketing costs"], ansKey: 8 }
];

let selectedAnswers = {};
let hasSubmitted = false;

function startExam() {
    selectedAnswers = {};
    hasSubmitted = false;
    renderExam();
}

function renderExam() {
    const container = document.querySelector(".container");
    let html = `
        <div class="card">
            <h2>Business Administration Assessment</h2>
            <p>Please answer all the questions below. An 85% score (22/25 correct) is required to pass.</p>
            <form id="exam-form" onsubmit="event.preventDefault(); submitExam();">
    `;

    QUESTIONS.forEach((q, idx) => {
        html += `
            <div class="question-block" style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                <p><strong>Question ${idx + 1}: ${escapeHtml(q.question)}</strong></p>
                <div class="options">
        `;
        q.options.forEach((opt, optIdx) => {
            html += `
                <label style="display: block; margin: 8px 0; cursor: pointer;">
                    <input type="radio" name="q-${idx}" value="${optIdx}" onclick="selectAnswer(${idx}, ${optIdx})" required>
                    ${escapeHtml(opt)}
                </label>
            `;
        });
        html += `
                </div>
            </div>
        `;
    });

    html += `
                <button type="submit" style="margin-top: 20px;">Submit Assessment</button>
            </form>
        </div>
    `;
    container.innerHTML = html;
}

function selectAnswer(qIdx, val) {
    selectedAnswers[qIdx] = val;
}

async function submitExam() {
    if (hasSubmitted) return;
    hasSubmitted = true;

    let score = 0;
    QUESTIONS.forEach((q, idx) => {
        // Decode the true answer key index on submission comparison
        const realAnswer = q.ansKey - ANSWER_KEY_OFFSET;
        if (selectedAnswers[idx] === realAnswer) {
            score++;
        }
    });

    const percentage = (score / QUESTIONS.length) * 100;
    const passed = percentage >= 85;
    const container = document.querySelector(".container");

    if (passed) {
        const name = prompt("Congratulations! You passed the assessment. Please enter your full name as it should appear on your certificate:") || "Successful Learner";
        
        let certId = "MV-BA-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:";
        if (isLocal) {
            const customId = prompt("Admin Mode Detected (Local Run). Enter custom Certificate ID (leave blank for random):");
            if (customId && customId.trim() !== "") {
                certId = customId.trim();
            }
        }
        
        if (typeof db !== "undefined") {
            try {
                await db.collection("business_attempts").add({
                    studentName: name,
                    score: score,
                    total: QUESTIONS.length,
                    passed: true,
                    certId: certId,
                    timestamp: new Date()
                });
                await db.collection("certificates").doc(certId).set({
                    studentName: name,
                    courseName: "Business Administration",
                    date: new Date().toLocaleDateString()
                });
            } catch (e) {
                console.error("Firebase error: ", e);
            }
        }
        
        showSuccessScreen(name, certId, score);
    } else {
        container.innerHTML = `
            <div class="card" style="text-align: center;">
                <h2 style="color: #d9534f;">Assessment Not Passed</h2>
                <p>You scored <strong>${score} out of ${QUESTIONS.length}</strong> (${Math.round(percentage)}%). A minimum score of 85% is required to pass.</p>
                <p>Please review the study material and try again when you are ready.</p>
                <button onclick="window.location.reload();">Retry Assessment</button>
            </div>
        `;
    }
}

function showSuccessScreen(name, certId, score) {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <div class="card" style="text-align: center;">
            <h2 style="color: #c9a227;">Assessment Passed!</h2>
            <p>Excellent work, <strong>${escapeHtml(name)}</strong>! You scored <strong>${score} out of ${QUESTIONS.length}</strong>.</p>
            <p>Your unique Certificate ID is: <strong>${certId}</strong></p>
            <div id="cert-content" style="width: 800px; height: 550px; padding: 40px; border: 15px solid #333; margin: 30px auto; background: white; font-family: 'Georgia', serif; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; box-sizing: border-box; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <img src="../logo.png" style="width:100px; border-radius:50%; margin-bottom:15px;" alt="Logo">
                <h1 style="font-size: 28px; margin: 0 0 10px 0; color: #222; text-transform: uppercase; letter-spacing: 2px;">Montvale Academy</h1>
                <p style="font-size: 14px; color: #666; margin: 0 0 20px 0; text-transform: uppercase;">Professional Certification Program</p>
                <p style="font-size: 16px; font-style: italic; color: #444; margin: 10px 0;">This is to certify that</p>
                <h2 style="font-size: 32px; border-bottom: 2px solid #c9a227; padding-bottom: 5px; margin: 10px 0 20px 0; font-family: 'Outfit', sans-serif; color: #111;">${escapeHtml(name)}</h2>
                <p style="font-size: 16px; color: #444; margin: 5px 0;">has successfully met the academic standards and passed the examination for</p>
                <h3 style="font-size: 24px; color: #c9a227; margin: 15px 0;">Business Administration</h3>
                <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
                    <div>
                        <p>Date: <strong>${new Date().toLocaleDateString()}</strong></p>
                        <p>Provider: <strong>CPD Group #790431</strong></p>
                    </div>
                    <div>
                        <p>Certificate ID: <strong>${certId}</strong></p>
                        <p style="color: #c9a227; font-weight: bold;">Verified Authentic</p>
                    </div>
                </div>
            </div>
            <button onclick="downloadPDF()">Download Certificate PDF</button>
        </div>
    `;
}

function downloadPDF() {
    const element = document.getElementById("cert-content");
    if (typeof html2canvas !== "undefined") {
        html2canvas(element, { scale: 2 }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'Montvale_Certificate.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        alert("Certificate image generation tool is loading. Please try again in a few seconds.");
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
