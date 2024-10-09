var dataTable;

$(document).ready(function () {
    loadDatatable();
});

function Delete(url) {
    swal({
        title: "Do you want to delete this record?",
        text: "This content wont be available again!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnconfirm: true
    }, function () {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    dataTable.ajax.reload();
                }
                else {
                    toastr.error(data.message);
                }
            }
        });
    });
}

function loadDatatable() {
    dataTable = $("#tblCategory").DataTable({
        "ajax": {
            "url": "/admin/category/GetAll",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "50%" },
            { "data": "order", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                            <a href="/Admin/Category/Edit/${data}" class="btn btn-success text-white" style="cursor:pointer; width:100px">
                            <i class="far fa-edit"></i> Edit
                            </a>
                            &nbsp;
                            <a onclick=Delete("/Admin/Category/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer; width:100px">
                            <i class="far fa-trash-alt"></i> Delete
                            </a></div>`;
                }, "width": "30%"
            },
        ],
    })
}
