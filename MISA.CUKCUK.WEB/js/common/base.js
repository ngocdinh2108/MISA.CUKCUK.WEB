class Base {
    constructor() {
        this.loadData(employees);
    }

    loadData(data) {
        try {
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            var fieldNames = [];
            // Lấy thông tin dữ liệu sẽ map tương ứng với các cột
            $.each(data, function(index, obj) {
                var tr = $(`<tr></tr>`);
                $.each(ths, function(index, th) {
                    var td = $(`<td></td>`);
                    var fieldName = $(th).attr('fieldName');
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
                    td.append(value);
                    tr.append(td);
                })
                $('table tbody').append(tr);
            })

        } catch (error) {
            console.log(error);
        }

    }
}