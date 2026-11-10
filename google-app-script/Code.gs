/**
 * Le Gentleman — Google Apps Script Order Webhook
 * Receives JSON POST payloads from order.html and appends orders to Google Sheets.
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Orders");

  // Fallback to the first sheet if "Orders" doesn't exist
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }

  // Initialize header row if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Date",
      "Nom",
      "Téléphone",
      "Adresse",
      "Produit",
      "Taille",
      "Quantité",
      "Wilaya",
      "Livraison (DA)",
      "Prix Total (DA)"
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nom || "",
    data.telephone || "",
    data.adresse || "",
    data.produit || "",
    data.taille || "",
    data.quantite || 1,
    data.wilaya || "",
    data.livraison || 0,
    data.prix_total || 0
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
