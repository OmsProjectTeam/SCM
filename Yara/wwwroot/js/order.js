// Function to update QR Code
function updateQRCode() {
    $('.QRCodeImage').each(function () {
        var code = $(this).siblings('.Code').text().trim();  // Get the QR code text
        var qrCodeUrl = $(this).data('qrcode-url');  // Get the URL from data attribute
        if (code) {
            $(this).attr('src', qrCodeUrl + '?text=' + encodeURIComponent(code));  // Set the image source
        } else {
            $(this).attr('src', '');  // Clear the image source if no code
        }
    });
}

// Function to update Bar Code
function updateBar() {
    $('.BarCodeUPC').each(function () {
        var upc = $(this).siblings('.UPCFORPR').text().trim();  // Get the UPC text
        var barCodeUrl = $(this).data('barcode-url');  // Get the URL from data attribute
        if (upc) {
            $(this).attr('src', barCodeUrl + '?text=' + encodeURIComponent(upc));  // Set the image source
        } else {
            $(this).attr('src', '');  // Clear the image source if no UPC
        }
    });
}

// Bind functions to pagination buttons and when the document is ready
$(document).on('click', '.paginate_button', function () {
    updateQRCode();  // Update QR codes after pagination
    updateBar();  // Update barcodes after pagination
});

// Initial call to update QR codes and barcodes on page load
$(document).ready(function () {
    updateQRCode();  // Update QR codes when the page loads
    updateBar();  // Update barcodes when the page loads
});
