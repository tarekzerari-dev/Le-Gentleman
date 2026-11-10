function doPost(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Orders");
  
  // Fallback to the first sheet if "Orders" doesn't exist
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.nom,
    data.telephone,
    data.produit,
    data.taille,
    data.quantite,
    data.wilaya,
    data.livraison,
    data.prix_total
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success:true}))
    .setMimeType(ContentService.MimeType.JSON);
}