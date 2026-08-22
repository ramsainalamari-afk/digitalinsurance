// -----------------------------
// Section Navigation
// -----------------------------

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    document.getElementById(sectionId).classList.add("active-section");

    const titles = {
        dashboard: "Insurance Dashboard",
        claims: "Claim Management",
        risk: "Risk Assessment",
        policies: "Policy Management",
        submit: "Submit New Claim",
        reports: "Reports & Analytics"
    };

    document.getElementById("pageTitle").textContent = titles[sectionId];
}


// -----------------------------
// Risk Assessment
// -----------------------------

function calculateRisk() {

    const amount =
        Number(document.getElementById("claimAmount").value) || 0;

    const previousClaims =
        Number(document.getElementById("previousClaims").value) || 0;

    const policyDuration =
        document.getElementById("policyDuration").value;

    const documents =
        document.getElementById("documents").value;

    let score = 0;

    // Claim amount
    if (amount > 500000) {
        score += 40;
    } else if (amount > 200000) {
        score += 25;
    } else {
        score += 10;
    }

    // Previous claims
    if (previousClaims >= 4) {
        score += 30;
    } else if (previousClaims >= 2) {
        score += 20;
    } else {
        score += 5;
    }

    // Policy duration
    if (policyDuration === "high") {
        score += 20;
    } else if (policyDuration === "medium") {
        score += 10;
    } else {
        score += 5;
    }

    // Documents
    if (documents === "unverified") {
        score += 20;
    } else if (documents === "partial") {
        score += 10;
    } else {
        score += 0;
    }

    let result = "";
    let riskClass = "";

    if (score >= 60) {

        result = `
            <strong>High Risk ⚠️</strong><br>
            Risk Score: ${score}/100<br>
            Claim requires detailed manual verification.
        `;

        riskClass = "high";

    } else if (score >= 35) {

        result = `
            <strong>Medium Risk ⚠️</strong><br>
            Risk Score: ${score}/100<br>
            Additional verification is recommended.
        `;

        riskClass = "medium";

    } else {

        result = `
            <strong>Low Risk ✓</strong><br>
            Risk Score: ${score}/100<br>
            Claim can proceed through normal processing.
        `;

        riskClass = "low";
    }

    const resultBox = document.getElementById("riskResult");

    resultBox.innerHTML = result;

    resultBox.className = "risk-result " + riskClass;
}


// -----------------------------
// Submit Claim
// -----------------------------

function submitClaim() {

    const customer =
        document.getElementById("customerName").value;

    const policy =
        document.getElementById("policyNumber").value;

    const amount =
        document.getElementById("amount").value;

    if (customer === "" || policy === "" || amount === "") {

        alert("Please fill in all required claim details.");

        return;
    }

    alert(
        "Claim submitted successfully!\n\n" +
        "Customer: " + customer +
        "\nPolicy: " + policy +
        "\nAmount: ₹" + amount
    );

    document.getElementById("customerName").value = "";
    document.getElementById("policyNumber").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
}


// -----------------------------
// Search Claims
// -----------------------------

function searchClaims() {

    const input =
        document.getElementById("claimSearch")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll("#claimTable tbody tr");

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        if (text.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}


// -----------------------------
// Logout
// -----------------------------

function logout() {

    alert("You have been logged out.");

}