var firebaseConfig = {
    apiKey: "AIzaSyC0ju9F55uAAEbI0onDXIR6z2Bn3rD5Nrs",
    authDomain: "wiras-acea8.firebaseapp.com",
    projectId: "wiras-acea8",
    storageBucket: "wiras-acea8.appspot.com",
    messagingSenderId: "626682904610",
    appId: "1:626682904610:web:cd86fb4499bfdcae6a4a7b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function addFields() {
    // Number of inputs to create
    var index = document.getElementById('container').children.length + 1

    var clone = $("#inputfield-1").clone();
    clone.attr('id', "inputfield-" + index)

    clone.find("#inp-1").attr("id", "inp-" + index);
    clone.find("#1").attr("id", index);

    //append clone on the end
    $("#container").append(clone);


}

function removeFields() {
    var element = document.getElementById('container');
    var el = element.lastChild.id;
    if (el != 'inputfield-1') {
        element.removeChild(element.lastChild);
    }
}


function selectSubject(id) {
    var subject = document.getElementById(id).value;
    document.getElementById("inp-" + id).setAttribute('placeholder', subject)


}

function viewImage(event) {
    document.getElementById('imageview').src = URL.createObjectURL(event.target.files[0])
    document.getElementById('bt-save').removeAttribute('disabled')
}




function change1(studentId) {
    document.getElementById('bt-update').setAttribute('hidden', "true")
    $("#markeditContainer").empty();
    let semester = document.getElementById("semester").value
    $("#semInput").val(semester)
    $.ajax({
        url: '/admin/view-marks?id=' + studentId,
        method: 'get',
        success: (data) => {

            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                var sem = row.Semester;
                var sub = row.Subject;
                var mark = row.Marks;

                if (sem == semester) {

                    document.getElementById('bt-update').removeAttribute('hidden')
                    $('#markeditContainer').append("<div class='form-group col-lg-5 mt-1'><input hidden id='studentId' class='form-control' value='" + studentId + "'/><input id='sub" + i + "' readonly='true' name='Subject' class='form-control' value='" + sub + "'/></div><div class='col-lg-5 mt-1'><input id='mark" + i + "' onchange='inpchange()' name='Mark' class='form-control' value='" + mark + "'/></div><div class='col-lg-2 mt-1'><button id='" + i + "' onclick='deleteMark(this.id)' type='button' class='btn btn-success'>Delete</button></div>");
                }

            }
        }
    })
}

function deleteMark(id) {
    if (confirm("Are you sure you want to delete")) {
        var stdid = $("#studentId").val()
        var sem = $("#semInput").val()
        var sub = $("#sub" + id).val();
        var mark = $("#mark" + id).val();
        var datas = new FormData()
        datas.append('studentId', stdid)
        datas.append('Semester', sem)
        datas.append('Subject', sub)
        datas.append('Mark', mark)
        $.ajax({
            url: "/admin/delete-mark",
            data: datas,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false,
            success: function (response) {
                alert("Mark successfully deleted")
                $("#sub" + id).remove();
                $("#mark" + id).remove();
                $("#" + id).remove();

            },
            error: function (err) {
                alert("Something went wrong")
            }
        })
    }


}


function change2(studentId) {
    $("#markviewContainer").empty();
    let semester = document.getElementById("semester").value
    $.ajax({
        url: '/admin/view-marks?id=' + studentId,
        method: 'get',
        success: (data) => {

            for (var i in data) {
                var row = data[i];
                var sem = row.Semester;
                var sub = row.Subject;
                var mark = row.Marks;

                if (sem == semester) {


                    $('#markviewContainer').append("<tr><td>" + sub + "</td><td>" + mark + "</td></tr>");

                }
            }
        }
    })
}


function inpchange() {
    document.getElementById('bt-update').removeAttribute('disabled')

}

function inpchange2() {
    document.getElementById('bt-save').removeAttribute('disabled')
}

$("#add-marks-form").submit((e) => {

    e.preventDefault()
    $.ajax({
        url: "/admin/add-marks",
        data: $("#add-marks-form").serialize(),
        method: "post",
        success: function (response) {
            alert("Marks successfully updated")
            $('#add-marks-form').each(function () {
                this.reset();
            });
            $('#select option').prop('selected', function () {
                return this.defaultSelected;
            });


        },
        error: function (err) {
            alert("something went wrong")
        }
    })
})

var spinner = $('#cover-spin');

$("#mark-update-form").submit((e) => {

    e.preventDefault()
    $.ajax({
        url: "/admin/edit-marks",
        data: $("#mark-update-form").serialize(),
        method: "post",
        success: function (response) {
            alert("Marks successfully updated")



        },
        error: function (err) {
            alert("something went wrong")
        }
    })
})

$("#add-student-form").submit((e) => {
    var form = $('#add-student-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    var StudentImg = $('input[type=file]')[0].files[0]
    formData.append('StudentImage', $('input[type=file]')[0].files[0]);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-student",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {

            // ref = firebase.storage().ref()
            // let file = document.querySelector("#stdImg").files[0]
            // let metadata = {
            //     contentType: file.type
            // }
            // let task = ref.child(response).put(file, metadata)

            
                alert("Student added successfully")
                $('#add-student-form').each(function () {
                    this.reset();
                });

                $("#imageview").attr("src", "/images/students-images/user.png");
            



        },
        error: function (err) {
            alert("Something went wrong")
        }
    })
})

$("#edit-student-form").submit((e) => {
    var form = $('#edit-student-form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);
    formData.append('StudentImage', $('input[type=file]')[0].files[0]);
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-student",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            alert("Updated successfully")
        },
        error: function (err) {

            alert("Something went wrong")
        }
    })
})


$("#add-mark-form").submit((e) => {

    e.preventDefault()
    $.ajax({
        url: "/admin/fetch-student",
        data: $("#add-mark-form").serialize(),
        method: "post",
        success: function (response) {
            let studentId = response._id
            window.location = '/admin/add-marks?id=' + studentId
        },
        error: function (err) {
            alert("something went wrong")
        }
    })
})

$("#edit-student").submit((e) => {

    e.preventDefault()
    $.ajax({
        url: "/admin/fetch-student",
        data: $("#edit-student").serialize(),
        method: "post",
        success: function (response) {
            let studentId = response._id
            window.location = '/admin/edit-student?id=' + studentId
        },
        error: function (err) {
            alert("something went wrong")
        }
    })
})




