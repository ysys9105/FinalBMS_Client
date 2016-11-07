/**
 * Created by CJuser on 2016-11-07.
 */

var midTd = null;
var mtitleTd = null;
var mimg = null;
var mimgTd = null;
var mdateTd=null;
var rbtn = null;
var rbtnTd = null;

$(function () {
    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result) {
            var lid = result.ID;

    $.ajax({
            url: "http://localhost:7070/book/myBookList",
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                lender : lid
            },

            success: function (result) {
                $("tbody").empty();
                //결과창출력

                for (var i = 0; i < result.length; i++) {
                    tr = $("<tr></tr>").attr("data-cid", result[i].isbn);

                    midTd = $("<td></td>").text(result[i].isbn).attr("id", "tTd" + result[i].isbn);

                    mimg = $("<img />").attr("src", result[i].img).attr("id", "bookimg");
                    mimgTd = $("<td></td>").append(mimg);

                    mtitleTd = $("<td></td>").text(result[i].title);
                    mdateTd = $("<td></td>").text(result[i].date);

                    rbtn = $("<input>");
                    rbtn.attr("type", "button");
                    rbtn.attr("class", "btn btn-primary");
                    rbtn.attr("value", "반납하기");


                    //반납 기능!! *********************************
                    rbtn.on("click", function () {
                        var isbn = $(this).parent().parent().find("td:nth-child(1)").text();
                        var pos = $(this).parent().parent();
                        $.ajax({
                            url: "http://localhost:7070/book/returnBook",
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                isbn : isbn

                            },
                            success: function () {

                                pos.remove();
                                alert("반납처리 완료!")
                            },
                            error: function () {
                                alert("반납 에러 발생!!")
                            }
                        });


                    });
                    rbtnTd = $("<td></td>").append(rbtn);

                    tr.append(midTd);
                    tr.append(mtitleTd);
                    tr.append(mdateTd);
                    tr.append(mimgTd);
                    tr.append(rbtnTd);

                    $("tbody").append(tr);



                }


            },
        error: function () {
            alert("알수없는 에러");
        }
    })

        }

        })

});