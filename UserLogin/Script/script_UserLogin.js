$(function() {
  $(document).ready(function () {
      $('#userNo').mask('00000000000');
      $('#orderNo').mask('000000000');
  });

  $('#btnLogin').on('click', function () {

      var loginUser = false;
      var loginPass = false;

      var $this = $(this);


      var data = new Object();

      data.UserCode = $("#userNo").val();
      data.Password = $("#userPass").val();

      if (data.UserCode == "") {
          $(".userNoErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + " Vergi No yada TC giriniz...");
          loginUser = false;

      } else {
          $(".userNoErr").html("");
          loginUser = true;
      }

      if (data.Password == "") {
          $(".userPassErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + " Şifrenizi giriniz...");
          loginPass = false;
      } else {
          $(".userPassErr").html("");
          loginPass = true;
      }
      if (loginUser == true && loginPass == true) {
          $this.button('loading');
          $.ajax({
              type: "post",
              dataType: "json",
              data: data,
              url: "http://185.79.13.92:8090/servis/api/User/UserLogin",
              success: function (result) {

                  if (result.UserId != -1) {
                      //alert(result.UserName);
                      /*$.ajax({
                          type: "POST",
                          url: "UserCheckLogin",
                          data: { _userId: result.UserId, _userName: result.UserName },
                          success: function (mesaj) {
                              $this.button('reset');
                              window.location.href = "OrderList";
                          }
                      });*/

                      localStorage.UserId = result.UserId;
                      localStorage.UserName = result.UserName;
                      $this.button('reset');
                      window.location.href = "OrderList.html";

                  } else if (result.UserId == -1) {
                      $this.button('reset');
                      $(".userLoginErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + "Kullanıcı giriş bilgileri yanlış.");
                  } else {
                      $this.button('reset');
                      $(".userLoginErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + "Kayıtlı bir müşteri bulunamadı.");
                  }
              },
              error: function () {
                  $this.button('reset');
                  $(".userLoginErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + "KARGICAM Web Servisi kapalı. Daha sonra tekrar deneyiniz.");
                  $(location).attr('href', 'http://www.kargicam.com.tr')

              }

          })



          /*setTimeout(function () {

          }, 8000);*/


      }

  });

  $('#btnTrackOrder').on('click', function () {
      var $this = $(this);
      $this.button('loading');
      var data = new Object();
      data.OrderNumber = $("#orderNo").val();

      if (data.OrderNumber == "") {
          $this.button('reset');
          $(".orderNoErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + "Sipariş numarasını giriniz...");

      } else {
          $(".orderNoErr").html("");
          $.ajax({
              type: "post",
              dataType: "json",
              data: data,
              url: "http://185.79.13.92:8090/servis/api/Orders/OrderNumberControl",
              success: function (result) {
                  $this.button('reset');
                  if (result.Value == 1) {
                      //Sipariş Sorgula
                      window.location.href = "OrderList.html?orderNo=" + data.OrderNumber;
                  } else {
                      $(".orderNoErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + "Sisteme kayıtlı böyle bir sipariş numarası yok.");
                  }
                  //window.location.href = "OrderList";
              },
              error: function () {
                  $this.button('reset');
                  $(".orderErr").html('<i class="fa fa-times" aria-hidden="true"></i>' + "KARGICAM Web Servisi kapalı. Daha sonra tekrar deneyiniz.");
                  $(location).attr('href', 'http://www.kargicam.com.tr')

              }

          })

      }

  });
});
