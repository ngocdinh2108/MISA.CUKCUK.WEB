$(document).ready(function() {
    new Employee();
    dialog = $(".dialog-detail").dialog({
        autoOpen: false,
        fluid: true,
        modal: true
    });
})

/**
 * Class quản lý các sự kiện của trang Employee
 * DNDINH 10.06.2021
 */
class Employee extends Base {
    constructor() {
        super();
    }

    /**
     * Load dữ liệu
     * DNDINH 10.06.2021
     */
    // loadData(data) {
    //     if (data && data.length > 0) {
    //         let tr = '';
    //         $.each(data, function(index, item) {
    //             let dateOfBirth = item.DateOfBirth;
    //             let salary = item.Salary;
    //             salary = formatMoney(salary);
    //             dateOfBirth = formatDate(dateOfBirth);
    //             tr += `<tr>

    //                         <td>${item.ID}</td>
    //                         <td>${item.FullName}</td>
    //                         <td>${item.Gender}</td>
    //                         <td class="m-align-center">${dateOfBirth}</td>
    //                         <td>${item.PhoneNumber}</td>
    //                         <td>${item.Email}</td>
    //                         <td>${item.Position}</td>
    //                         <td>${item.Department}</td>
    //                         <td class="m-align-right">${salary}</td>
    //                         <td>${item.Status}</td>
    //                     </tr>`;
    //         })
    //         $('table tbody').append(tr);
    //     }
    // }

    /**
     * Thêm dữ liệu
     * DNDINH 10.06.2021
     */
    add() {

    }

    /**
     * Sửa dữ liệu
     * DNDINH 10.06.2021
     */
    edit() {

    }

    /**
     * Xóa dữ liệu
     * DNDINH 10.06.2021
     */
    delete() {

    }
}

/**
 * Hàm dùng để lấy dữ liệu nhân viên từ data.js
 * DNDINH 09.06.2021
 */
// function loadData(data) {
//     if (data && data.length > 0) {
//         let tr = '';
//         $.each(data, function(index, item) {
//             let dateOfBirth = item.DateOfBirth;
//             let salary = item.Salary;
//             salary = formatMoney(salary);
//             dateOfBirth = formatDate(dateOfBirth);
//             tr += `<tr>
//                         <td class="m-align-center"><input type="checkbox"/></td>
//                         <td>${item.ID}</td>
//                         <td>${item.FullName}</td>
//                         <td>${item.Gender}</td>
//                         <td class="m-align-center">${dateOfBirth}</td>
//                         <td>${item.PhoneNumber}</td>
//                         <td>${item.Email}</td>
//                         <td>${item.Position}</td>
//                         <td>${item.Department}</td>
//                         <td class="m-align-right">${salary}</td>
//                         <td>${item.Status}</td>
//                     </tr>`;
//         })
//         $('table tbody').html(tr);
//     }
// }