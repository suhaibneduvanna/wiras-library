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