function sortList(category) {
    $("#categoryContainer").empty();
    document.getElementById("filteredSection").removeAttribute("hidden")
            document.getElementById("fullList").setAttribute('hidden', "true")
            document.getElementById('categoryh2').innerHTML = category
    $.ajax({
        url: '/view-books?category='+category,
        method: 'get',
        success: (data) => {
            
            
            for (var i in data) {
                var row = data[i];
                var no = row.No;
                var name = row.Name;
                var category = row.Category
                var author = row.Author
                var publisher = row.Publisher
                var holder = row.Holder
                var img = "product-images/" + row._id + ".jpg"
                var href = '/add-my-books?id'+ row._id

                    $('#categoryContainer').append("<tr><td scope="+'row'+">"+no+"</td><td>"+name+"</td><td>"+category+"</td><td>"+author+"</td><td>"+publisher+"</td><td>"+holder+"</td><td><img src="+img+" style="+'height:80px;'+" alt="+'image'+"> </td><td><a href="+href+" class='btn btn-primary'>Add to My Books</a></td><tr>");

               
            }
        }
    })
}

// ADD FORMS 

$("#add-user-form").submit((e) => {
    var form = $('#add-user-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-user",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(response+" added successfully")
                $('#add-user-form').each(function () {
                    this.reset();
                });

        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})

$("#add-book-form").submit((e) => {
    var form = $('#add-book-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-book",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(response+" added successfully")
                $('#add-book-form').each(function () {
                    this.reset();
                });

        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})


$("#add-author-form").submit((e) => {
    var form = $('#add-author-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-author",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(response+" added successfully")
                $('#add-author-form').each(function () {
                    this.reset();
                });

        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})


$("#add-publisher-form").submit((e) => {
    var form = $('#add-publisher-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-publisher",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(response+" added successfully")
                $('#add-publisher-form').each(function () {
                    this.reset();
                });

        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})

$("#add-category-form").submit((e) => {
    var form = $('#add-category-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-category",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(response+" added successfully")
                $('#add-category-form').each(function () {
                    this.reset();
                });

        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})

// EDIT FORMS 

$("#edit-user-form").submit((e) => {
    let userName = document.getElementById('nameInp').value;
    var form = $('#edit-user-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-user",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(userName+" updated successfully")
                
        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})

$("#edit-book-form").submit((e) => {
    let bookName = document.getElementById('nameInp').value;
    var form = $('#edit-book-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-book",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            
                alert(bookName+" updated successfully")
                
        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})

$("input").change(function(){
    document.getElementById('btn-update').removeAttribute('disabled')
  });

$("select").change(function(){
    document.getElementById('btn-update').removeAttribute('disabled')
  });

 



    
