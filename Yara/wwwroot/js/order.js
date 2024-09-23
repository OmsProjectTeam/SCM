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
        $('.QRCodeImage').each(function () {
// Function to update Bar Code
function updateBar() {
    $('.BarCodeUPC').each(function () {
        var upc = $(this).siblings('.UPCFORPR').text().trim();  // Get the UPC text
        var barCodeUrl = $(this).data('barcode-url');  // Get the URL from data attribute
        if (upc) {
            $(this).attr('src', barCodeUrl + '?text=' + encodeURIComponent(upc));  // Set the image source
        } else {
            $(this).attr('src', '');  // Clear the image source if no UPC
    // Sync product12 input with the table search box
    $('#product12').on('input', function () {
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
                data: { model: model },
                success: function (response) {
                    if (response.success) {
                        $("#output").attr("src", response.imageUrl).show();
                        $("#imageUrlInput").val(response.imageUrl);
                    } else {
                        alert(response.message);
                        $("#output").hide();
                    }
                },
                error: function () {
                    alert("Error fetching the image.");
                    $("#output").hide();
                }
            });
        }
    });

    // Handle opening/closing of modals
    function openModal() {
        previousSearchText = $('#product12').val();
        $('#product12').data('previous-value', previousSearchText);
        $('#customModal').show();
    }

    function closeModal() {
        $('#customModal').hide();
        $('#product12').val($('#product12').data('previous-value'));
    }

    // Modal form submission handling
    $('form[asp-action="SaveModal"]').on('submit', function (event) {
        event.preventDefault();
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function () {
                closeModal();
                $('#product12').val($('#product12').data('previous-value'));
            }
        });
    });

    // Pagination button click handler
    $(document).on('click', '.paginate_button', function () {
        updateQRCode();
    });

    // Load file for previewing image
    var loadFile = function (event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };
});
