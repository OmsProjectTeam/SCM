// Ensure the QR code is updated on page load and after pagination
$(document).ready(function () {
    updateQRCode();  // Call the function on page load to generate QR codes
});

$(document).on('click', '.paginate_button', function () {
    updateQRCode();  // Update QR code when pagination is clicked
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
