// --- 1. THEME TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// --- 2. THE CALCULATION ENGINE ---
// --- 2. THE CALCULATION ENGINE ---
const form = document.getElementById('quote-form');

function runAutoCalculate() {
    // 1. Get Elements safely
    const selectedPlan = document.querySelector('input[name="plan"]:checked');
    const ageInput = document.getElementById('age');
    const dependentsInput = document.getElementById('dependents');
    const provinceInput = document.getElementById('province');
    
    const totalDisplay = document.getElementById('total-amount');
    const summaryAge = document.getElementById('summary-age');
    const summaryProv = document.getElementById('summary-province');
    const summaryPlan = document.getElementById('summary-plan'); // Make sure you have this ID in HTML

    // 2. Update Summary Text safely
    if (ageInput) summaryAge.textContent = ageInput.value || "-";
    
    // Safety check for Province dropdown
    if (provinceInput && provinceInput.selectedIndex !== -1) {
        summaryProv.textContent = provinceInput.options[provinceInput.selectedIndex].text;
    }

    if (selectedPlan && summaryPlan) {
        summaryPlan.textContent = selectedPlan.value.charAt(0).toUpperCase() + selectedPlan.value.slice(1) + " Plan";
    }

    // 3. Perform the Math
    // We check: Is a plan selected? Is age at least 18? Is a province actually chosen?
    if (selectedPlan && ageInput.value >= 18 && provinceInput.value !== "") {
        
        let price = parseInt(selectedPlan.getAttribute('data-price')) || 0;
        let age = parseInt(ageInput.value) || 0;
        let dependents = parseInt(dependentsInput.value) || 0;

        let total = price;

        // Age Surcharge
        if (age > 40) total += 200;
        if (age > 60) total += 400;
        
        // Dependents (R150 each)
        total += (dependents * 150);

        // Province Surcharge
        if (provinceInput.value === "GP") total += 100;
        if (provinceInput.value === "WC") total += 50;

        // Update the big total display
        totalDisplay.textContent = "R" + total.toLocaleString();
    } else {
        // If form is incomplete, keep it at R0 or the base price
        totalDisplay.textContent = "R0";
    }
}

// Attach listeners
form.addEventListener('input', runAutoCalculate);
form.addEventListener('change', runAutoCalculate);