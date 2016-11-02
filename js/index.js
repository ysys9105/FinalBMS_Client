/**
 * Created by CJuser on 2016-10-31.
 */
var priceTd = null;
var titleTd = null;
var authorTd = null;
var img = null;
var imgTd = null;
var tr = null;
var dbtn = null;
var ubtn = null;

function searchBook() {
    if(event.keyCode==13){
        $.ajax({
            url : "http://localhost:7070/book/bookList",
            type: "get",
            dataType : "jsonp",
            jsonp : "callback",
            data :{
                keyword : $("#keyword").val()
            },

            success : function(result){
                //결과창출력


                for (var i = 0; i < result.length; i++) {
                    tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

                    priceTd = $("<td></td>").text(result[i].price);
                    titleTd = $("<td></td>").text(result[i].title);
                    authorTd = $("<td></td>").text(result[i].author);
                    img = $("<img />").attr("src",result[i].img);
                    imgTd = $("<td></td>").append(img);


                    dbtn =$("<input>");
                    dbtn.attr("type","button");
                    dbtn.attr("value","삭제");
                    dbtn.on("click",function(){
                        $(this).parent().parent().remove();
                    });

                    var dbtnTd = $("<td></td>").append(dbtn);

                    ubtn = $("<input>");
                    ubtn.attr("type","button");
                    ubtn.attr("value","수정");
                    ubtn.on("click",function(){
                        //수정처리
                        var price = $(this).parent().parent().find("td:nth-child(4)").text();
                        var updatebox=$("<input />").attr("type","text").val(price);
                        updatebox.on("keyup",function () {
                            if(event.keyCode==13){
                                //update처리!!
                                //DB처리, 화면처리
                                //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리

                                var isbn = $(this).parent().parent().attr("data-isbn");
                                var price = $(this).val();
                                var tr = $(this).parent().parent();
                                $.ajax({
                                    url : "http://localhost:7070/book/bookUpdate",
                                    type : "get",
                                    dataType : "jsonp",
                                    jsonp : "callback",
                                    data : {
                                        isbn : isbn,
                                        price : price
                                    },
                                    success : function(result){
                                        alert("정상입니다");
                                        tr.find("td:nth-child(4)").empty();
                                        tr.find("td:nth-child(4)").text(price);
                                    },
                                    error : function () {
                                        alert("업데이트 에러 발생!!")
                                    }
                                });

                            }
                        })
                        $(this).parent().parent().find("td:nth-child(4)").text("");
                        $(this).parent().parent().find("td:nth-child(4)").append(updatebox);
                        $(this).parent().parent().find("[type=button]").attr("disabled","disabled");
                    });

                    var ubtnTd = $("<td></td>").append(ubtn);

                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(dbtnTd);
                    tr.append(ubtnTd)

                    $("tbody").append(tr);
                }

            },
            error: function () {
                alert("이상이상")
            }
        });
    }
}



function mySort() {

}