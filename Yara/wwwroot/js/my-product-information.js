// Ensure the QR code is updated on page load and after pagination
$(document).ready(function () {
    updateQRCode();  // Call the function on page load to generate QR codes
});


$(document).ready(function () {
    updateBar();  // Call the function on page load to generate QR codes
});

$(document).on('click', '.paginate_button', function () {
    updateBarCode();  // Update QR code when pagination is clicked
});

// Function to update the QR code image
function updateQRCode() {
    $('.QRCodeImage').each(function () {
        var code = $(this).siblings('.Code').text();
        var generateQRCodeUrl = $(this).data('url'); // Use data attribute to get the URL
        if (code.trim() !== '') {
            $(this).attr('src', generateQRCodeUrl + '?text=' + encodeURIComponent(code));
        } else {
            $(this).attr('src', '');  // Set empty if no valid code
        }
    });
}

function updateBarCode() {
    $('.BarCodeUPC').each(function () {
        var upc = $(this).siblings('.UPCFORPR').text().trim();
        if (upc) {
            $(this).attr('src', urls.generateBarCode + '?text=' + encodeURIComponent(upc));
        } else {
            $(this).attr('src', '');
        }
    });
}

//$(document).ready(function () {
//    const urls = {
//        generateQRCode: $('#url-container').data('qrcode-url'),
//        generateBarCode: $('#url-container').data('barcode-url')
//    };

//    // Use the URLs as needed
//    function updateQRCode() {
//        $('.QRCodeImage').each(function () {
//            var code = $(this).siblings('.Code').text().trim();
//            if (code) {
//                $(this).attr('src', urls.generateQRCode + '?text=' + encodeURIComponent(code));
//            } else {
//                $(this).attr('src', '');
//            }
//        });
//    }

//    function updateBar() {
//        $('.BarCodeUPC').each(function () {
//            var upc = $(this).siblings('.UPCFORPR').text().trim();
//            if (upc) {
//                $(this).attr('src', urls.generateBarCode + '?text=' + encodeURIComponent(upc));
//            } else {
//                $(this).attr('src', '');
//            }
//        });
//    }

//    // Call functions when the document is ready
//    updateQRCode();
//    updateBar();

//    // Update QR and Bar Codes on pagination clicks
//    $(document).on('click', '.paginate_button', function () {
//        updateQRCode();
//        updateBar();
//    });
//});
