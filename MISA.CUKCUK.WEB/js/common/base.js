class Base {
    constructor() {
        this.dataJS = null;
        this.setDataJS();
        this.loadData();
        this.initEvents();
    }

    setDataJS() {

    }

    /**
     * Hàm khởi tạo sự kiện
     * DNDINH 14.06.2021
     */
    initEvents() {
        var me = this;
        // Sự kiện click vào nút thêm mới
        $('#m-btn-add').click(me.add);

        // Sự kiện click vào nút đóng form
        $('.dialog-close').click(me.closeForm);

        // Ẩn form khi nhấn button [hủy]

        // Thực hiện lưu dữ liệu khi nhấn button [Lưu] 
        $('#btn-save').click(me.saveData);
        // Sự kiện nạp dữ liệu khi ấn button [reload]
        $('#btn-reload').click(function () {
            me.loadData();
        })

        // Hiển thị thông tin chi tiết khi ấn dbl chuột vào 1 dòng
        $('table tbody').on('dblclick', 'tr', function () {
            $(".dialog-detail").show();
        })

        /**
         * Validate bắt buộc nhập
         * DNDINH 14.06.2021
         */
        $('.input-required').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr("title", "Trường này không được phép để trống!");
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("border-red");
                $(this).removeAttr("title");
                $(this).removeAttr("validate");
            }
        })

        /**
         * Validate email đúng định dạng
         * DNDINH 14.06.2021
         */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!mailformat.test(value)) {
                $(this).addClass("border-red");
                $(this).attr("title", "Email không đúng định dạng!");
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("border-red");
                $(this).removeAttr("title");
                $(this).removeAttr("validate");
            }
        })

    }

    /**
     * Hàm lấy dữ liệu từ file data.js tương ứng với từng trang
     * DNDINH 14.06.2021
     */
    loadData() {
        try {
            $('table tbody').empty();
            var data = this.dataJS;
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            var fieldNames = [];
            // Lấy thông tin dữ liệu sẽ map tương ứng với các cột
            $.each(data, function (index, obj) {
                var tr = $(`<tr></tr>`);
                $.each(ths, function (index, th) {
                    var td = $(`<td></td>`);
                    var fieldName = $(th).attr('fieldName');
                    if (fieldName == "CheckBox") {
                        value = '<input type="checkbox"></input>';
                        td.addClass("m-align-center");
                    } else {
                        var value = obj[fieldName];
                        var dataType = $(th).attr('dataType');
                        switch (dataType) {
                            case 'Date':
                                value = formatDate(value);
                                td.addClass("m-align-center");
                                break;
                            case 'Money':
                                value = formatMoney(value);
                                td.addClass("m-align-right");
                                break;
                            default:
                                break;
                        }
                    }
                    td.append(value);
                    tr.append(td);
                })
                $('table tbody').append(tr);
            })

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Hàm lưu dữ liệu
     * DNDINH 14.06.2021
     */
    saveData() {
        // Validate dữ liệu
        var inputValidates = $('.input-required, input[type="email"]');
        $.each(inputValidates, function (index, input) {
            $(input).trigger('blur');
        })
        var inputNotValid = $('input[validate="false"]');
        if (inputNotValid && inputNotValid.length > 0) {
            alert('Chưa được');
            inputNotValid[0].focus();
            return;
        }


        // Thu thập thông tin dữ liệu đc nhập => bulid thành object
        var employee = {
            ID: $('#txtID').val(),
            FullName: $('#txtFullName').val(),
            Gender: $('#cbxGender').val(),
            DateOfBirth: $('#dtDateOfBirth').val(),
            PhoneNumber: $('#txtPhoneNumber').val(),
            Email: $('#txtEmail').val(),
            Position: $('#txtPosition').val(),
            Department: $('#txtDepartment').val(),
            Salary: $('#txtSalary').val(),
            Status: $('#txtStatus').val()
        }
        // Gọi serviece tương ứng thực hiện lưu trữ

        employees.push(employee);
        // Sau khi lưu thành công => Đưa ra thông báo
        alert('thêm thành công');
        // Ẩn form chi tiết
        $(".dialog-detail").hide();
        // Load lai dữ liệu
        $('#btn-reload').trigger('click');
    }

    /**
     * Hàm đóng form
     * DNDINH 14.06.2021
     */
    closeForm() {
        $(".dialog-detail").hide();
    }

    /**
     * Thêm dữ liệu
     * DNDINH 10.06.2021
     */
    add() {
        var arrayInput = $(".dialog-detail input");
        $(".dialog-detail").show();
        arrayInput[0].focus();
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