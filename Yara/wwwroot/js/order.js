// Initialize DataTables for the provided tables
$(function () {
    $("#example2").DataTable().fnDestroy();
    $('#example2').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
    });
});

$(function () {
    $("#example3").DataTable().fnDestroy();
    $('#example3').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
    });
});

$(function () {
    $("#example4").DataTable().fnDestroy();
    $('#example4').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
    });
});

$(function () {
    $("#example5").DataTable().fnDestroy();
    $('#example5').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
    });
});

// Function to truncate text to a specified length
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'; // Add ellipsis if text exceeds maxLength
    } else {
        return text;
    }
}

// Loop through each table cell with class 'truncate-50'
$(document).ready(function () {
    $('.truncate-50').each(function () {
        var text = $(this).text(); // Get the text content of the cell
        var truncatedText = truncateText(text, 100); // Truncate the text to 50 characters
        $(this).text(truncatedText); // Set the truncated text back to the cell
    });

    updateQRCode();
    updateBar();

    // Handle pagination button clicks
    $(document).on('click', '.paginate_button', function () {
        updateQRCode();
        updateBar();
    });
});

function updateQRCode() {
    $('.QRCodeImage').each(function () {
        var code = $(this).siblings('.Code').text();
        if (code) {
            $(this).attr('src', $('#example').data('url-qr') + '?text=' + encodeURIComponent(code));
        } else {
            $(this).attr('src', '');
        }
    });
}

function updateBar() {
    $('.BarCodeUPC').each(function () {
        var upc = $(this).siblings('.UPCFORPR').text();
        if (upc) {
            $(this).attr('src', $('#example').data('url-bar') + '?text=' + encodeURIComponent(upc));
        } else {
            $(this).attr('src', '');
        }
    });
}
