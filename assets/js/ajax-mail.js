$(document).ready(function () {
  $("#form_request").submit(function () {
    // console.log("submiited");
    var fullname = $("#fullname").val().trim();
    var email = $("#email").val().trim();
    var phone = $("#phone").val().trim();
    var message = $("#message").val().trim();
    data = { email: email, fullname: fullname, phone: phone, message: message };
    // console.log(data);
    $.ajax({
      url: "assets/plugin/mailer/server.php",
      method: "POST",
      data: data,
      dataType: "json",
      success: function (data) {
        // console.log(data)
        // alert('Đã kết nối')
        if (data.fullname) $("#fullname").next("small").text(data.fullname);
        else $("#fullname").next("small").text("");
        if (data.email) $("#email").next("small").text(data.email);
        else $("#email").next("small").text("");
        if (data.phone) $("#phone").next("small").text(data.phone);
        else $("#phone").next("small").text("");
        if (data.result == true) {
          document.querySelector(".swal").classList.add("show");
         
          setTimeout(() => {
            document.querySelector(".swal").classList.remove("show");
          }, 3000);
        }else if(data.result == false){
          document.querySelector(".swal").classList.add("show");
          document.querySelector(".swal-icon img").src = './assets/images/failmark.png'
          document.querySelector('.swal .swal-title').textContent = 'Lỗi!'
          document.querySelector('.swal .swal-text').textContent = 'Gửi yêu cầu thất bại!. Vui lòng thử lại'
          // let btnCloseOk = document.createElement('div')
          // btnCloseOk.className = 'swal-button--confirm'
          // btnCloseOk.innerText = 'OK'
          // document.querySelector('.swal-button-container').appendChild(btnCloseOk)
          //  document.querySelector(".swal-button--confirm").onclick = () => {
          //   document.querySelector(".swal").classList.remove("show");
          // };
          setTimeout(() => {
            document.querySelector(".swal").classList.remove("show");
          }, 3000);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      },
    });
    return false;
  });
});
