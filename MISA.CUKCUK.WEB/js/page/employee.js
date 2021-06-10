$(document).ready(function() {
    loadData(employees);
})

/**
 * Hàm dùng để lấy dữ liệu nhân viên từ data.js
 * DNDINH 09.06.2021
 */
function loadData(data) {
    if (data && data.length > 0) {
        var tr = '';
        $.each(data, function(index, item) {
            var dateOfBirth = item.DateOfBirth;
            var salary = item.Salary;
            salary = formatMoney(salary);
            dateOfBirth = formatDate(dateOfBirth);
            tr += `<tr>
                        <td class="m-align-center"><input type="checkbox"/></td>
                        <td>${item.ID}</td>
                        <td>${item.FullName}</td>
                        <td>${item.Gender}</td>
                        <td class="m-align-center">${dateOfBirth}</td>
                        <td>${item.PhoneNumber}</td>
                        <td>${item.Email}</td>
                        <td>${item.Position}</td>
                        <td>${item.Department}</td>
                        <td class="m-align-right">${salary}</td>
                        <td>${item.Status}</td>
                    </tr>`;
        })
        $('table tbody').html(tr);
    }
}