/**
 * Le Gentleman — Centralized Configuration
 * All products, prices, wilayas, and site settings in one place.
 */
const CONFIG = {
    siteName: "Le Gentleman",
    tagline: "Les Chemises",
    whatsappNumber: "213561069167",
    currency: "DA",
    shirtPrice: 4000,

    scriptURL: "https://script.google.com/macros/s/AKfycbxnKj7-ZbfRcrBQr1nkERjZ2WLDC23Bnwf4_1HJATTtDs2v46gQ4DcyyIzbdYC3iI3x/exec",

    products: [
        { id: "white", image: "assets/chemise-blanche.jpg", i18nKey: "shirtWhiteTitle" },
        { id: "black", image: "assets/chemise-noire.jpg", i18nKey: "shirtBlackTitle" },
        { id: "blue",  image: "assets/chemise-bleu.jpg",  i18nKey: "shirtBlueTitle" }
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],

    // All 58 wilayas of Algeria with delivery fees (DA)
    wilayas: {
        "1 - Adrar": 850,
        "2 - Chlef": 500,
        "3 - Laghouat": 550,
        "4 - Oum El Bouaghi": 500,
        "5 - Batna": 550,
        "6 - Béjaïa": 500,
        "7 - Biskra": 550,
        "8 - Béchar": 650,
        "9 - Blida": 350,
        "10 - Bouira": 400,
        "11 - Tamanrasset": 950,
        "12 - Tébessa": 550,
        "13 - Tlemcen": 550,
        "14 - Tiaret": 500,
        "15 - Tizi Ouzou": 450,
        "16 - Alger": 300,
        "17 - Djelfa": 550,
        "18 - Jijel": 550,
        "19 - Sétif": 500,
        "20 - Saïda": 550,
        "21 - Skikda": 550,
        "22 - Sidi Bel Abbès": 550,
        "23 - Annaba": 500,
        "24 - Guelma": 550,
        "25 - Constantine": 500,
        "26 - Médéa": 500,
        "27 - Mostaganem": 550,
        "28 - M'Sila": 500,
        "29 - Mascara": 550,
        "30 - Ouargla": 550,
        "31 - Oran": 500,
        "32 - El Bayadh": 650,
        "33 - Illizi": 950,
        "34 - Bordj Bou Arréridj": 500,
        "35 - Boumerdès": 400,
        "36 - El Tarf": 500,
        "37 - Tindouf": 950,
        "38 - Tissemsilt": 550,
        "39 - El Oued": 550,
        "40 - Khenchela": 550,
        "41 - Souk Ahras": 550,
        "42 - Tipaza": 400,
        "43 - Mila": 550,
        "44 - Aïn Defla": 550,
        "45 - Naâma": 650,
        "46 - Aïn Témouchent": 550,
        "47 - Ghardaïa": 650,
        "48 - Relizane": 500,
        "49 - El M'Ghair": 650,
        "50 - El Meniaa": 750,
        "51 - Ouled Djellal": 600,
        "52 - Bordj Badji Mokhtar": 1000,
        "53 - Béni Abbès": 850,
        "54 - Timimoun": 900,
        "55 - Touggourt": 600,
        "56 - Djanet": 1000,
        "57 - In Salah": 950,
        "58 - In Guezzam": 1000
    }
};
