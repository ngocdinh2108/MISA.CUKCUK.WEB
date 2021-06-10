class Base {
    constructor() {
        this.loadData(employees);
    }

    loadData(data) {
        // Lấy thông tin các cột dữ liệu
        var ths = $('table thead th');
        var fieldNames = [];

        // Lấy thông tin dữ liệu sẽ map tương ứng với các cột
        $.each(data, function(index, item) {
            var tr = `<tr></tr>`;
            debugger;
            $.each(ths, function(index, item) {
                var fieldName = $(item).attr('fieldName');
                var td = `<td></td>`;
                debugger;
            })
            $(tr).append(item[fieldName]);
        })

    }
}