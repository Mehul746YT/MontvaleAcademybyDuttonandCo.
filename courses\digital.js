const QUESTIONS = [
    {
        id: 1,
        question: "Which of the following describes the core goal of Search Engine Optimisation (SEO)?",
        options: [
            "Maximising paid traffic using auction bidding strategies.",
            "Increasing organic visibility and click-through rates on search engine result pages (SERPs).",
            "Paying publishers to host tracking code and affiliate landing links.",
            "Creating multi-channel email campaigns for lead nurturing."
        ],
        answer: 1
    },
    {
        id: 2,
        question: "When evaluating keyword targeting, what does 'search intent' refer to?",
        options: [
            "The specific bidding algorithm chosen within Google Ads.",
            "The geographical coordinates of the user when performing a search query.",
            "The underlying purpose or objective a user has when entering a search query.",
            "The density of synonyms placed within a website's header tag."
        ],
        answer: 2
    },
    {
        id: 3,
        question: "In technical SEO, a 'crawl budget' refers to:",
        options: [
            "The financial cost calculated for indexation on search engines.",
            "The maximum duration a spider spends fetching assets on a single landing page.",
            "The number of pages a search engine bot will crawl and index on a website within a given timeframe.",
            "The bandwidth allocation restricted by local CDN server regions."
        ],
        answer: 2
    },
    {
        id: 4,
        question: "Which match type offers the broadest targeting control in Google Ads campaigns?",
        options: [
            "Exact Match",
            "Phrase Match",
            "Broad Match",
            "Negative Match"
        ],
        answer: 2
    },
    {
        id: 5,
        question: "How is Customer Acquisition Cost (CAC) calculated?",
        options: [
            "Total marketing spend divided by total conversions.",
            "Total cost of sales and marketing efforts divided by the number of new customers acquired.",
            "Average purchase value divided by conversion rate.",
            "Total revenue divided by the customer lifetime value (LTV)."
        ],
        answer: 1
    },
    {
        id: 6,
        question: "In A/B testing, statistical significance is critical because it:",
        options: [
            "Guarantees that a variation will always outperform the control version.",
            "Indicates the probability that the difference in conversion rate is not due to random chance.",
            "Ensures the layout conforms to WCAG accessibility compliance.",
            "Measures the actual speed improvements on the CDN server."
        ],
        answer: 1
    },
    {
        id: 7,
        question: "What is the primary difference in data measurement between Universal Analytics and Google Analytics 4 (GA4)?",
        options: [
            "GA4 measures only e-commerce transactions, ignoring other user interactions.",
            "GA4 measures pageviews exclusively using cookies.",
            "GA4 relies on an event-based measurement model instead of session-based hits.",
            "GA4 removes the ability to track outbound external link clicks."
        ],
        answer: 2
    },
    {
        id: 8,
        question: "A high bounce rate alongside a low average session duration on a product landing page generally indicates:",
        options: [
            "Outstanding page loading performance and ideal search intent alignment.",
            "A mismatch between the advertising promise (intent) and the landing page experience.",
            "That the tracking pixels are configured perfectly to record standard sessions.",
            "A high conversion probability index for direct checkout paths."
        ],
        answer: 1
    },
    {
        id: 9,
        question: "Which of the following is considered an 'On-Page SEO' factor?",
        options: [
            "Earning a backlink from a highly authoritative industry publication.",
            "Configuring server redirect rules via the .htaccess file.",
            "Optimising meta descriptions, header tags, and page content structure.",
            "Submitting an XML sitemap directly to search consoles."
        ],
        answer: 2
    },
    {
        id: 10,
        question: "What does Return on Ad Spend (ROAS) measure?",
        options: [
            "The revenue generated for every dollar spent on paid advertising campaigns.",
            "The total cost incurred to acquire a single registration or lead form completion.",
            "The percentage increase in organic search engine rank positions.",
            "The average CPC bidding threshold set inside automated smart campaigns."
        ],
        answer: 0
    },
    {
        id: 11,
        question: "Which schema markup types are most helpful for highlighting specific products and prices in search results?",
        options: [
            "LocalBusiness Schema",
            "Article Schema",
            "Product & Offer Schema",
            "ProfilePage Schema"
        ],
        answer: 2
    },
    {
        id: 12,
        question: "What is a major advantage of phrase match keywords over broad match keywords?",
        options: [
            "Phrase match completely eliminates the need for targeting negative keywords.",
            "Phrase match targets queries containing the search phrase's core meaning, offering tighter relevance control.",
            "Phrase match is cheaper as search engines do not charge fees for exact matches.",
            "Phrase match displays ads even when query synonyms differ entirely in user intent."
        ],
        answer: 1
    },
    {
        id: 13,
        question: "A high-performing Call to Action (CTA) button should typically be:",
        options: [
            "Placed at the bottom of the page in a neutral shade matching the footer background.",
            "Visually distinct, contrasting with secondary site colours, and positioned prominently.",
            "Formatted as inline text to prevent users from identifying it as an advertisement link.",
            "Hidden behind hover dropdown menus to optimize layout space."
        ],
        answer: 1
    },
    {
        id: 14,
        question: "In the conversion funnel, 'Micro-Conversions' represent:",
        options: [
            "Small transaction payouts made via secondary digital wallet providers.",
            "High-value target actions, such as direct premium plan purchases.",
            "Preliminary steps indicating user interest, such as newsletter signups or cart additions.",
            "Invisible tracking script triggers used to detect bot visits."
        ],
        answer: 2
    },
    {
        id: 15,
        question: "What does the term 'Ad Relevance' refer to in digital ad auctions?",
        options: [
            "The bid amount paid directly to the search engine provider.",
            "How closely the ad copy matches the user's search query and search intent.",
            "The historic total spend of the advertising account.",
            "The geographic distance between the user and the advertiser."
        ],
        answer: 1
    },
    {
        id: 16,
        question: "In GA4, custom dimensions allow analysts to:",
        options: [
            "Change the primary domain tracking parameters without code updates.",
            "Record unique metadata values associated with custom events that standard reporting ignores.",
            "Bypass regional privacy laws and collect direct user emails.",
            "Generate automatic visual dashboards directly inside third-party website builders."
        ],
        answer: 1
    },
    {
        id: 17,
        question: "Which metric is a 'leading indicator' for general site performance rather than a lagging outcome?",
        options: [
            "Monthly recurring revenue (MRR)",
            "Net promoter score (NPS)",
            "Page load latency and core web vitals",
            "Total closed sales deals"
        ],
        answer: 2
    },
    {
        id: 18,
        question: "What does 'Muda' refer to in processes optimized under Lean principles?",
        options: [
            "Continuous incremental improvement across business structures.",
            "Waste or unproductive activities that consume resources without adding customer value.",
            "The standard measurement for customer acquisition cycles.",
            "The maximum load capacity of a processing bottleneck."
        ],
        answer: 1
    },
    {
        id: 19,
        question: "Which tool is best suited for visualising dynamic marketing data using APIs and custom dashboards?",
        options: [
            "Google Merchant Center",
            "Google Data Studio (Looker Studio)",
            "Ahrefs Keyword Explorer",
            "Google Search Console"
        ],
        answer: 1
    },
    {
        id: 20,
        question: "Why is a high Customer Lifetime Value (LTV) relative to CAC beneficial?",
        options: [
            "It indicates that acquisition costs are unsustainably high compared to long-term returns.",
            "It confirms the business generates strong long-term gross value from customers compared to the cost of acquiring them.",
            "It shows that users bounce instantly before recording custom analytics events.",
            "It requires immediate bidding modifications in the Google Ads panel to prevent traffic loss."
        ],
        answer: 1
    }
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
            <h2>Digital Marketing & Analytics Assessment</h2>
            <p>Please answer all the questions below. An 85% score (17/20 correct) is required to pass.</p>
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
                    <input type="radio" name="q-${q.id}" value="${optIdx}" onclick="selectAnswer(${q.id}, ${optIdx})" required>
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

function selectAnswer(qId, val) {
    selectedAnswers[qId] = val;
}

async function submitExam() {
    if (hasSubmitted) return;
    hasSubmitted = true;

    let score = 0;
    QUESTIONS.forEach(q => {
        if (selectedAnswers[q.id] === q.answer) {
            score++;
        }
    });

    const passed = score >= 17;
    const container = document.querySelector(".container");

    if (passed) {
        // Show success screen and generate cert ID
        const name = prompt("Congratulations! You passed the assessment. Please enter your full name as it should appear on your certificate:") || "Successful Learner";
        const certId = "MV-DM-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Log attempt via standard firebase implementation
        if (typeof db !== "undefined") {
            try {
                await db.collection("digital_attempts").add({
                    studentName: name,
                    score: score,
                    total: QUESTIONS.length,
                    passed: true,
                    certId: certId,
                    timestamp: new Date()
                });
                await db.collection("certificates").doc(certId).set({
                    studentName: name,
                    courseName: "Digital Marketing & Analytics",
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
                <p>You scored <strong>${score} out of 20</strong> (${Math.round((score/20)*100)}%). A minimum score of 85% (17/20) is required to pass.</p>
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
            <p>Excellent work, <strong>${escapeHtml(name)}</strong>! You scored <strong>${score} out of 20</strong>.</p>
            <p>Your unique Certificate ID is: <strong>${certId}</strong></p>
            <div id="cert-content" style="width: 800px; height: 550px; padding: 40px; border: 15px solid #333; margin: 30px auto; background: white; font-family: 'Georgia', serif; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; box-sizing: border-box; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <img src="../logo.png" style="width:100px; border-radius:50%; margin-bottom:15px;" alt="Logo">
                <h1 style="font-size: 28px; margin: 0 0 10px 0; color: #222; text-transform: uppercase; letter-spacing: 2px;">Montvale Academy</h1>
                <p style="font-size: 14px; color: #666; margin: 0 0 20px 0; text-transform: uppercase;">Professional Certification Program</p>
                <p style="font-size: 16px; font-style: italic; color: #444; margin: 10px 0;">This is to certify that</p>
                <h2 style="font-size: 32px; border-bottom: 2px solid #c9a227; padding-bottom: 5px; margin: 10px 0 20px 0; font-family: 'Outfit', sans-serif; color: #111;">${escapeHtml(name)}</h2>
                <p style="font-size: 16px; color: #444; margin: 5px 0;">has successfully met the academic standards and passed the examination for</p>
                <h3 style="font-size: 24px; color: #c9a227; margin: 15px 0;">Digital Marketing &amp; Analytics</h3>
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
