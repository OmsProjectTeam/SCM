$(document).ready(function () {
    let productSelectedFromAutocomplete = false;
    let typingTimer;
    const typingDelay = 5000;

    // Autocomplete search functionality for the model
    $('#product12').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: productSuggestionsUrl,  // Define this in the Razor view
                type: 'GET',
                data: { query: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.model,
                            value: item.model,
                            productDetails: item
                        };
                    }));
                },
                error: function () {
                    showAlert('error', 'Search error', 'Unable to fetch product suggestions.');
                    response([]);
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            productSelectedFromAutocomplete = true;
            $('#product12').val(ui.item.value);
            populateProductDetails(ui.item.productDetails);
            clearTimeout(typingTimer);
            checkProductAvailability(ui.item.value);
            return false;
        }
    });

    $('#product12').on('input', function () {
        clearTimeout(typingTimer);
        const productId = $(this).val().trim();

        if (productSelectedFromAutocomplete) {
            productSelectedFromAutocomplete = false;
            return;
        }

        if (productId.length >= 2) {
            typingTimer = setTimeout(() => {
                checkProductAvailability(productId);
            }, typingDelay);
        } else {
            clearProductDetails();
        }
    });

    function checkProductAvailability(productId) {
        $.ajax({
            url: productDetailsUrl,  // Define this in the Razor view
            type: 'GET',
            data: { productId: productId },
            success: function (data) {
                if (data && data.productCategoryId > 0) {
                    populateProductDetails(data);
                    $('#modalButton').prop('disabled', true);
                } else {
                    showAlert('warning', 'No product available', 'Create a new one, please click the modal button');
                    $('#ProductName').val(productId);
                    $('#modalButton').prop('disabled', false);
                    openModal(productId);
                }
            },
            error: function () {
                console.error("Error fetching product details.");
                $('#ProductImage').attr('src', 'http://placehold.it/220x180');
                $('#GlobalPrice').val("0.00");
                $('#modalButton').prop('disabled', true);
            }
        });
    }

    function populateProductDetails(productDetails) {
        if (productDetails && productDetails.productCategoryId > 0) {
            $('#ProductName').val(productDetails.model);
            $('#SelectProductCategory').val(productDetails.productCategoryId).trigger('change');
            $('#SelectBondType').val(productDetails.bondTypeId).trigger('change');
            $('#SelectTypesProduct').val(productDetails.typesProductId).trigger('change');
            $('#GlobalPrice').val(productDetails.globalPrice);
            $('#ProductImage').attr('src', productDetails.imageUrl || 'http://placehold.it/220x180');
            $('#SelectProductInformation150').empty().append(new Option(productDetails.productName, productDetails.m, true, true)).trigger('change');
            $('#modalButton').prop('disabled', true);
            updateCodeField();
        }
    }

    function clearProductDetails() {
        $('#ProductName').val('');
        $('#SelectProductCategory').val('').trigger('change');
        $('#SelectBondType').val('').trigger('change');
        $('#SelectTypesProduct').val('').trigger('change');
        $('#GlobalPrice').val('');
        $('#ProductImage').attr('src', 'http://placehold.it/220x180');
    }

    // Modal functions
    function openModal(productId) {
        $('#customModal').show();
        populateProductNameInModal(productId);
    }

    function closeModal() {
        $('#customModal').hide();
    }

    function populateProductNameInModal(productId) {
        if (productId) {
            $.ajax({
                url: fetchImageByModelUrl,  // Define this in the Razor view
                type: 'GET',
                data: { model: productId },
                success: function (response) {
                    if (response.success) {
                        $("#MyProduct").val(response.productName);
                    } else {
                        alert(response.message);
                        $("#MyProduct").val('');
                    }
                },
                error: function () {
                    alert("Error fetching the product name.");
                    $("#MyProduct").val('');
                }
            });
        }
    }

    $('#sellingPrice').on('change keyup', function () {
        updateCodeField();
    });

    function updateCodeField() {
        const Merchant = $('#SelectMerchant option:selected').text();
        const WareHouse = $('#SelectWareHouse option:selected').text();
        const WareHouseBranch = $('#SelectWareHouseBranch option:selected').text();
        const ProductInformation = $('#SelectProductInformation150 option:selected').text();
        const sellingPrice = $('#sellingPrice').val();
        const randomString = generateRandomString(5);

        if (Merchant && WareHouse) {
            const code = Merchant + WareHouse + WareHouseBranch + ProductInformation + sellingPrice + randomString;
            $('#Qrcode').val(code);
            updateQRCode();
        }
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function updateQRCode() {
        const code = $('#Qrcode').val();
        if (code) {
            $('#QRCodeImage').attr('src', generateQRCodeUrl + '?text=' + encodeURIComponent(code));
        } else {
            $('#QRCodeImage').attr('src', '');
        }
    }

    // Other modal functions and document ready functions remain the same
});

// Additional functions (loadFile, printWarehouseDetails1, etc.) can be added here.
