class Base {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }

    setDataUrl() {

    }

    /**
     * Hàm khởi tạo sự kiện
     * DNDINH 14.06.2021
     */
    initEvents() {
        var me = this;
        // Sự kiện click vào nút thêm mới
        $('#m-btn-add').click(function() {
            me.FormMode = "Add";
            console.log(me.FormMode);
            var arrayInput = $(".dialog-detail input");
            $(".dialog-detail").show();
            $('input').val(null);
            arrayInput[0].focus();
        });

        // Sự kiện click vào nút đóng form
        $('.dialog-close').click(me.closeForm);

        // Ẩn form khi nhấn button [hủy]

        // Sự kiện nạp dữ liệu khi ấn button [reload]
        $('#btn-reload').click(function() {
            me.loadData();
        })

        // Chọn 1 dòng bất kỳ để xóa
        $('table tbody').on('click', 'tr', function() {
            var selected = $(this).hasClass('row-selected');
            $('table tbody tr').removeClass('row-selected');
            if (!selected) {
                $(this).addClass('row-selected');
            }
        })

        // Hiển thị thông tin chi tiết khi ấn dbl chuột vào 1 dòng
        $('table tbody').on('dblclick', 'tr', function() {
            me.FormMode = "Edit";
            $('input').val(null);
            // Lấy khóa chính của bản ghi
            var recordId = $(this).attr('recordid');
            me.recordId = recordId;
            // Gọi service lấy thông tin chi tiết qua khóa chính 
            $.ajax({
                url: `http://cukcuk.manhnv.net/v1/Employees/${recordId}`,
                method: "GET"
            }).done(function(res) {
                // Binding dữ liệu lên form chi tiết
                // Lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName], select[fieldName]');
                $.each(inputs, function(index, input) {
                    var propertyName = $(this).attr('fieldName');

                    // Nếu như là trường date thì phải chuyển từ kiểu json -> "year-month-day"
                    if (propertyName == "DateOfBirth") {
                        var value = res[propertyName];
                        var date = new Date(value),
                            day = date.getDate(),
                            month = date.getMonth() + 1,
                            year = date.getFullYear();

                        day = day < 10 ? `0${day}` : day;
                        month = month < 10 ? `0${month}` : month;
                        var valueDate = `${year}-${month}-${day}`;
                        $(this).val(valueDate);
                    } else {
                        var value = res[propertyName];
                        $(this).val(value);
                    }
                })
            }).fail(function(res) {

            })
            var arrayInput = $(".dialog-detail input");
            $(".dialog-detail").show();
            arrayInput[0].focus();
        })

        // Thực hiện lưu dữ liệu khi nhấn button [Lưu] 
        $('#btn-save').click(function() {
            // Validate dữ liệu
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function(index, input) {
                $(input).trigger('blur');
            })
            var inputNotValid = $('input[validate="false"]');
            if (inputNotValid && inputNotValid.length > 0) {
                alert('Chưa được');
                inputNotValid[0].focus();
                return;
            }


            // Thu thập thông tin dữ liệu đc nhập => build thành object
            var employee = {
                EmployeeCode: $('#txtID').val(),
                FullName: $('#txtFullName').val(),
                GenderName: $('#cbxGender').val(),
                DateOfBirth: $('#dtDateOfBirth').val(),
                PhoneNumber: $('#txtPhoneNumber').val(),
                Email: $('#txtEmail').val(),
                PositionName: $('#txtPosition').val(),
                DepartmentName: $('#txtDepartment').val(),
                Salary: $('#txtSalary').val(),
                WorkStatus: $('#txtStatus').val()
            }

            var method = "POST"
            if (me.FormMode == "Edit") {
                method = "PUT";
                employee.EmployeeId = me.recordId;
                // Gọi serviece tương ứng thực hiện lưu trữ
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employee.EmployeeId}`,
                    method: method,
                    data: JSON.stringify(employee),
                    contentType: "application/json"
                }).done(function(res) {
                    // Sau khi lưu thành công => Đưa ra thông báo
                    alert('Cập nhật thành công');
                    // Ẩn form chi tiết
                    $(".dialog-detail").hide();
                    // Load lai dữ liệu
                    $('#btn-reload').trigger('click');
                    debugger;
                }).fail(function(res) {
                    alert('Cập nhật thất bại');
                })
            } else {
                // Gọi serviece tương ứng thực hiện lưu trữ
                $.ajax({
                    url: "http://cukcuk.manhnv.net/v1/Employees",
                    method: method,
                    data: JSON.stringify(employee),
                    contentType: "application/json"
                }).done(function(res) {
                    // Sau khi lưu thành công => Đưa ra thông báo
                    alert('thêm thành công');
                    // Ẩn form chi tiết
                    $(".dialog-detail").hide();
                    // Load lai dữ liệu
                    $('#btn-reload').trigger('click');
                    debugger;
                }).fail(function(res) {
                    alert('Thêm thất bại');
                })
            }

        });

        /**
         * Validate bắt buộc nhập
         * DNDINH 14.06.2021
         */
        $('.input-required').blur(function() {
            var value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr("title", "Trường này không được phép để trống!");
                $(this).attr("validate", false);
            } else {
                $(this).removeClass("border-red");
                $(this).removeAttr("title");
                $(this).removeAttr("validate");
            }
        })

        /**
         * Validate email đúng định dạng
         * DNDINH 14.06.2021
         */
        $('input[type="email"]').blur(function() {
            var value = $(this).val();
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!mailformat.test(value)) {
                $(this).addClass("border-red");
                $(this).attr("title", "Email không đúng định dạng!");
                $(this).attr("validate", false);
            } else {
                $(this).removeClass("border-red");
                $(this).removeAttr("title");
                $(this).removeAttr("validate");
            }
        })

        // Ấn nút xóa nhân viên
        $('#m-btn-remove').on('click', function() {
            var rowDelete = $('table tbody tr[class="row-selected"]');
            if (rowDelete.html() == undefined) {
                alert('Bạn phải chọn 1 bản ghi để xóa');
            } else {
                $(".popup-detail").show();
                var employee = {}
                $('#btn-remove').on('click', function() {
                    var recordId = $(rowDelete).attr('recordid');
                    employee.EmployeeId = recordId;
                    debugger;
                    // Gọi serviece xóa dữ liệu
                    $.ajax({
                        url: `http://cukcuk.manhnv.net/v1/Employees/${employee.EmployeeId}`,
                        method: "DELETE",
                        data: JSON.stringify(employee),
                        contentType: "application/json"
                    }).done(function(res) {
                        // Sau khi xóa thành công => Đưa ra thông báo
                        alert('Xóa thành công');
                        // Ẩn form chi tiết
                        $(".popup-detail").hide();
                        // Load lai dữ liệu
                        $('#btn-reload').trigger('click');
                    }).fail(function(res) {
                        alert('Xóa thất bại');
                    })
                })
            }
        })

        // Ấn nút đóng popup
        $('.popup-close').on('click', function() {
            $(".popup-detail").hide();
        })

    }

    /**
     * Hàm lấy dữ liệu từ file data.js tương ứng với từng trang
     * DNDINH 14.06.2021
     */
    loadData() {
        $('table tbody').empty();
        var getDataUrl = this.getDataUrl;
        // Lấy thông tin các cột dữ liệu
        var ths = $('table thead th');
        $.ajax({
            url: getDataUrl,
            method: "GET",
        }).done(function(res) {
            var data = res;
            // Lấy thông tin dữ liệu sẽ map tương ứng với các cột
            $.each(data, function(index, obj) {
                var tr = $(`<tr recordid = "${obj.EmployeeId}"></tr>`);
                $.each(ths, function(index, th) {
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
        })
    }

    /**
     * Hàm lưu dữ liệu
     * DNDINH 14.06.2021
     */
    saveData() {



    }

    /**
     * Hàm đóng form
     * DNDINH 14.06.2021
     */
    closeForm() {
        $(".dialog-detail").hide();
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
        $(".popup-detail").show();
    }
}