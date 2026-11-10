/**
 * Le Gentleman — Internationalization (FR / AR)
 */
const translations = {
    fr: {
        // Nav
        home: "Accueil",
        products: "Produits",
        about: "À propos",
        order: "Commander",

        // Hero
        heroTitle: "Le Gentleman",
        heroText: "Élégance. Qualité. Distinction.",
        heroSubtext: "Chemises en lin Ralph Lauren — Livraison partout en Algérie",
        discover: "Découvrir nos chemises",

        // Products
        ourProducts: "Nos Chemises",
        shirtWhiteTitle: "Chemise Ralph Lauren Lin Blanche",
        shirtBlackTitle: "Chemise Ralph Lauren Lin Noire",
        shirtBlueTitle: "Chemise Ralph Lauren Lin Bleu Marine",
        orderBtn: "Commander",

        // About
        aboutTitle: "À propos",
        founderLabel: "Fondateur :",
        phoneLabel: "Téléphone :",
        aboutDesc: "Le Gentleman est votre destination pour des chemises en lin haut de gamme. Nous sélectionnons les meilleures pièces Ralph Lauren pour l'homme élégant algérien.",

        // Order Form
        orderTitle: "Votre Commande",
        fullName: "Nom complet",
        phone: "Numéro de téléphone",
        address: "Adresse de livraison",
        selectWilaya: "Sélectionnez votre Wilaya",
        selectProduct: "Choisir le produit",
        selectSize: "Taille",
        quantity: "Quantité",
        deliveryFeeLabel: "Frais de livraison :",
        totalPriceLabel: "Prix Total :",
        confirmOrder: "Confirmer la commande",
        orderSummary: "Récapitulatif",
        submitting: "Envoi en cours…",
        yourProduct: "Votre produit",

        // Success
        successTitle: "Merci !",
        successText: "Votre commande a été enregistrée avec succès. Nous vous contacterons bientôt pour confirmer la livraison.",
        backHome: "Retour à l'accueil",

        // Footer
        footerContact: "Contact",
        footerRights: "Tous droits réservés.",
        footerFollowUs: "Suivez-nous"
    },
    ar: {
        // Nav
        home: "الرئيسية",
        products: "المنتجات",
        about: "من نحن",
        order: "اطلب الآن",

        // Hero
        heroTitle: "لو جنتلمان",
        heroText: "أناقة. جودة. تميز.",
        heroSubtext: "قمصان كتان رالف لورين — توصيل لجميع أنحاء الجزائر",
        discover: "اكتشف قمصاننا",

        // Products
        ourProducts: "قمصاننا",
        shirtWhiteTitle: "قميص رالف لورين كتان أبيض",
        shirtBlackTitle: "قميص رالف لورين كتان أسود",
        shirtBlueTitle: "قميص رالف لورين كتان كحلي",
        orderBtn: "اطلب الآن",

        // About
        aboutTitle: "من نحن",
        founderLabel: "المؤسس :",
        phoneLabel: "رقم الهاتف :",
        aboutDesc: "لو جنتلمان هو وجهتك للقمصان الكتانية الفاخرة. نختار أفضل قطع رالف لورين للرجل الجزائري الأنيق.",

        // Order Form
        orderTitle: "طلبك",
        fullName: "الاسم الكامل",
        phone: "رقم الهاتف",
        address: "عنوان التوصيل",
        selectWilaya: "اختر ولايتك",
        selectProduct: "اختر المنتج",
        selectSize: "المقاس",
        quantity: "الكمية",
        deliveryFeeLabel: "رسوم التوصيل :",
        totalPriceLabel: "السعر الإجمالي :",
        confirmOrder: "تأكيد الطلب",
        orderSummary: "الملخص",
        submitting: "جاري الإرسال…",
        yourProduct: "منتجك",

        // Success
        successTitle: "شكراً لك!",
        successText: "تم تسجيل طلبك بنجاح. سنتصل بك قريباً لتأكيد التوصيل.",
        backHome: "العودة للرئيسية",

        // Footer
        footerContact: "اتصل بنا",
        footerRights: "جميع الحقوق محفوظة.",
        footerFollowUs: "تابعنا"
    }
};

/**
 * Set the active language and persist in localStorage
 */
function setLang(lang) {
    localStorage.setItem("lang", lang);
    applyTranslations(lang);
    updateLangButtons(lang);
}

/**
 * Get the current language
 */
function getLang() {
    return localStorage.getItem("lang") || "fr";
}

/**
 * Translate a single key
 */
function t(key) {
    const lang = getLang();
    return (translations[lang] && translations[lang][key]) || (translations.fr[key]) || key;
}

/**
 * Apply all translations to the current page
 */
function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";

    // Translate text content
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute("placeholder", translations[lang][key]);
        }
    });

    // Translate aria-labels
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
        const key = el.getAttribute("data-i18n-aria");
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute("aria-label", translations[lang][key]);
        }
    });
}

/**
 * Highlight the active language button
 */
function updateLangButtons(lang) {
    document.querySelectorAll(".lang-switch button").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    const lang = getLang();
    applyTranslations(lang);
    updateLangButtons(lang);

    // Set up language button click handlers
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(btn => {
        btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
});
