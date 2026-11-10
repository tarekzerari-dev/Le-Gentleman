/**
 * Le Gentleman — Order Page Logic
 * Populates form selects from config, handles pricing, validation, and submission.
 */
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("orderForm");
    if (!form) return;

    const PRICE = CONFIG.shirtPrice;
    const CURRENCY = CONFIG.currency;

    // ── DOM References ──────────────────────────────────
    const wilayaSelect    = document.getElementById("wilayaSelect");
    const productSelect   = document.getElementById("productSelect");
    const tailleSelect    = document.getElementById("tailleSelect");
    const quantityInput   = document.getElementById("quantite");
    const deliveryDisplay = document.getElementById("deliveryFee");
    const totalDisplay    = document.getElementById("totalPrice");
    const subtotalDisplay = document.getElementById("subtotalDisplay");
    const priceLabel      = document.getElementById("priceLabel");
    const previewImage    = document.getElementById("previewImage");
    const previewName     = document.getElementById("previewName");
    const submitBtn       = document.getElementById("submitBtn");

    // ── Populate Wilaya Select ──────────────────────────
    if (wilayaSelect) {
        // Add default disabled option
        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        defaultOpt.setAttribute("data-i18n", "selectWilaya");
        defaultOpt.textContent = t("selectWilaya");
        wilayaSelect.appendChild(defaultOpt);

        Object.keys(CONFIG.wilayas).sort((a, b) => {
            return parseInt(a) - parseInt(b);
        }).forEach(wilaya => {
            const opt = document.createElement("option");
            opt.value = wilaya;
            opt.textContent = wilaya;
            wilayaSelect.appendChild(opt);
        });
    }

    // ── Populate Product Select ─────────────────────────
    if (productSelect) {
        CONFIG.products.forEach(product => {
            const opt = document.createElement("option");
            opt.value = product.id;
            opt.setAttribute("data-i18n", product.i18nKey);
            opt.setAttribute("data-image", product.image);
            opt.textContent = t(product.i18nKey);
            productSelect.appendChild(opt);
        });
    }

    // ── Populate Size Select ────────────────────────────
    if (tailleSelect) {
        CONFIG.sizes.forEach(size => {
            const opt = document.createElement("option");
            opt.value = size;
            opt.textContent = size;
            tailleSelect.appendChild(opt);
        });
    }

    // ── Pre-select product from URL ─────────────────────
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get("product");
    if (productParam && productSelect) {
        productSelect.value = productParam;
    }

    // ── Format number with spaces (e.g. 4 000) ─────────
    function formatNumber(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // ── Calculate & Display Prices ──────────────────────
    let deliveryPrice = 0;

    function calculatePrice() {
        const qty = Math.max(1, parseInt(quantityInput.value) || 1);
        const selectedWilaya = wilayaSelect ? wilayaSelect.value : "";

        deliveryPrice = CONFIG.wilayas[selectedWilaya] || 0;
        const subtotal = PRICE * qty;
        const total = subtotal + deliveryPrice;

        if (priceLabel) {
            priceLabel.textContent = `${qty} × ${formatNumber(PRICE)} ${CURRENCY}`;
        }
        if (subtotalDisplay) {
            subtotalDisplay.textContent = `${formatNumber(subtotal)} ${CURRENCY}`;
        }
        if (deliveryDisplay) {
            deliveryDisplay.textContent = deliveryPrice > 0
                ? `${formatNumber(deliveryPrice)} ${CURRENCY}`
                : `— ${CURRENCY}`;
        }
        if (totalDisplay) {
            totalDisplay.textContent = `${formatNumber(total)} ${CURRENCY}`;
        }
    }

    // ── Update Product Preview ──────────────────────────
    function updatePreview() {
        if (!productSelect || !previewImage || !previewName) return;
        const selected = productSelect.options[productSelect.selectedIndex];
        if (!selected) return;

        const product = CONFIG.products.find(p => p.id === selected.value);
        if (product) {
            previewImage.src = product.image;
            previewImage.alt = selected.textContent;
            previewName.textContent = selected.textContent;
        }
    }

    // ── Event Listeners ─────────────────────────────────
    if (quantityInput) quantityInput.addEventListener("input", calculatePrice);
    if (wilayaSelect)  wilayaSelect.addEventListener("change", calculatePrice);
    if (productSelect) productSelect.addEventListener("change", () => {
        updatePreview();
        calculatePrice();
    });

    // Initial state
    updatePreview();
    calculatePrice();

    // ── Form Validation ─────────────────────────────────
    function validateForm() {
        const nom = form.nom.value.trim();
        const tel = form.telephone.value.trim();
        const wilaya = form.wilaya.value;
        const adresse = form.adresse.value.trim();

        if (nom.length < 3) {
            highlightError(form.nom);
            return false;
        }

        // Algerian phone: starts with 05, 06, or 07, 10 digits total
        if (!/^0[5-7][0-9]{8}$/.test(tel)) {
            highlightError(form.telephone);
            return false;
        }

        if (!wilaya) {
            highlightError(wilayaSelect);
            return false;
        }

        if (adresse.length < 5) {
            highlightError(form.adresse);
            return false;
        }

        return true;
    }

    function highlightError(el) {
        el.style.borderColor = "#e74c3c";
        el.focus();
        el.addEventListener("input", function handler() {
            el.style.borderColor = "";
            el.removeEventListener("input", handler);
        }, { once: true });
        el.addEventListener("change", function handler() {
            el.style.borderColor = "";
            el.removeEventListener("change", handler);
        }, { once: true });
    }

    // ── Form Submission ─────────────────────────────────
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Disable button and show loading
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> ' + t("submitting");

        const qty = Math.max(1, parseInt(form.quantite.value) || 1);
        const total = (PRICE * qty) + deliveryPrice;

        const data = {
            nom:        form.nom.value.trim(),
            telephone:  form.telephone.value.trim(),
            adresse:    form.adresse.value.trim(),
            produit:    productSelect.options[productSelect.selectedIndex].textContent,
            taille:     form.taille.value,
            quantite:   qty,
            wilaya:     form.wilaya.value,
            livraison:  deliveryPrice,
            prix_total: total
        };

        try {
            await fetch(CONFIG.scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            // Redirect to success
            window.location.href = "success.html";

        } catch (error) {
            console.error("Order submission error:", error);

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Show a more user-friendly error
            const lang = getLang();
            const msg = lang === "ar"
                ? "حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا عبر واتساب."
                : "Une erreur s'est produite. Veuillez réessayer ou nous contacter via WhatsApp.";
            alert(msg);
        }
    });

});
