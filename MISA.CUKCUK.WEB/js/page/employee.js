$(document).ready(function() {
    loadData();
})

/**
 * Lấy dữ liệu từ API
 * CreatedBy: DNDINH (08/06/2021)
 */
function loadData() {
    // Lấy dữ liệu về
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees/Filter?employeeCode=123&phoneNumber=0123456789",
        method: "GET",
    }).done(function(res) {
        var data = res;
        $.each(data, function(index, item) {

        })
        var tr = $(`<tr>
                        <td>MF874</td>
                        <td>Đinh Ngọc Định</td>
                        <td>Nam</td>
                        <td>21/08/1997</td>
                        <td>0394466363</td>
                        <td>dinhdinhngoc1997@gmail.com</td>
                        <td>Fresher</td>
                        <td>Viện đào tạo</td>
                        <td>3.000.000</td>
                        <td>Đang thử việc</td>
                    </tr>`);
        $('table tbody').append(tr);
        debugger;
    }).fail(function(res) {

    })

    //Biding dữ liệu về
}

function loadData() {
    var tr = $(`<tr>
                        <td>MF874</td>
                        <td>Đinh Ngọc Định</td>
                        <td>Nam</td>
                        <td class="m-align-center">21/08/1997</td>
                        <td>0394466363</td>
                        <td>dinhdinhngoc1997@gmail.com</td>
                        <td>Fresher</td>
                        <td>Viện đào tạo</td>
                        <td class="m-align-right">3.000.000</td>
                        <td>Đang thử việc</td>
                    </tr>`);
    $('table tbody').append(tr);
    debugger;
}