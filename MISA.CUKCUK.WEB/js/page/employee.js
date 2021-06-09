$(document).ready(function() {
    loadData(employees);
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

        // Biding từng dòng vào tbody

    }).fail(function(res) {

    })

    //Biding dữ liệu về
}

/**
 * Hàm dùng để lấy dữ liệu từ data.js
 * DNDINH 09.06.2021
 */
function loadData(data) {
    if (data && data.length > 0) {
        var tr = '';
        $.each(data, function(index, item) {
            tr += `<tr>
                        <td>${item.ID}</td>
                        <td>${item.FullName}</td>
                        <td>${item.Gender}</td>
                        <td class="m-align-center">${item.DateOfBirth}</td>
                        <td>${item.PhoneNumber}</td>
                        <td>${item.Email}</td>
                        <td>${item.Position}</td>
                        <td>${item.Department}</td>
                        <td class="m-align-right">${item.Salary}</td>
                        <td>${item.Status}</td>
                    </tr>`;
        })
        $('table tbody').html(tr);
    }
}