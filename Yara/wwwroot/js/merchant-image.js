// merchants.js

$(document).ready(function () {
    $('.select2_1').select2({
        placeholder: "Select an option",
        allowClear: true
    });

    $('#merchant-select').change(function () {
        var userId = $(this).val();
        if (userId) {
            $.getJSON('@Url.Action("GetUserDetails", "Merchants")', { id: userId }, function (data) {
                $('input[name="Merchants.CompanyName"]').val(data.companyName);
                $('input[name="Merchants.PhoneCompany"]').val(data.phoneCompany);
                $('input[name="Merchants.PhoneCompanySecand"]').val(data.phoneCompanySecand);
                $('input[name="Merchants.EmailCompany"]').val(data.emailCompany);
                $('input[name="Merchants.MerchantPhone"]').val(data.merchantPhone);
                $('input[name="Merchants.MerchantEmaile"]').val(data.merchantEmaile);
            });
        } else {
            $('input[name="Merchants.MerchantPhone"]').val('');
            $('input[name="Merchants.MerchantEmaile"]').val('');
        }
    });

    var loadFile = function (event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };

    $("#url").val(window.location.href);
});
