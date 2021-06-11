class Base {
    constructor() {
        this.loadData(employees);
    }

    loadData(data) {
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
                td.append(value);
                tr.append(td);
                debugger;
            })
            $('table tbody').append(tr);
            debugger;
        })

    }
}