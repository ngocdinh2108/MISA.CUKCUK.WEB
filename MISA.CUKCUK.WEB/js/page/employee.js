$(document).ready(function() {
    new Employee();
})

/**
 * Class quản lý các sự kiện của trang Employee
 * DNDINH 10.06.2021
 */
class Employee extends Base {

    /**
     * Hàm khởi tạo đối tượng Employee
     * DNDINH 14.06.2021
     */
    constructor() {
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }

}