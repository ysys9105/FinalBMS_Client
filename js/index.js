/**
 * Created by CJuser on 2016-10-31.
 */
var priceTd = null;
var titleTd = null;
var authorTd = null;
var img = null;
var imgTd = null;
var aboutTd = null;
var tr = null;
var dbtn = null;
var ubtn = null;
var abtn = null;
var cmtbtn = null;
var base64 = null;
var commentTd = null;
var userId = null;

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
                $("tbody").empty();
                //결과창출력

                for (var i = 0; i < result.length; i++) {
                    tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

                    priceTd = $("<td></td>").text(result[i].price);
                    titleTd = $("<td></td>").text(result[i].title).attr("id","tTd"+result[i].isbn);
                    authorTd = $("<td></td>").text(result[i].author);
                    img = $("<img />").attr("src",result[i].img).attr("id","bookimg");
                    imgTd = $("<td></td>").append(img);

                    dbtn =$("<input>");
                    dbtn.attr("type","button");
                    dbtn.attr("class","btn btn-danger");
                    dbtn.attr("value","삭제");

                    //DELETE 기능!! *********************************
                    dbtn.on("click",function(){
                            //update처리!!
                            //DB처리, 화면처리
                            //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        var pos =  $(this).parent().parent();
                            $.ajax({
                                url : "http://localhost:7070/book/bookDelete",
                                type : "get",
                                dataType : "jsonp",
                                jsonp : "callback",
                                data : {
                                    isbn : isbn

                                },
                                success : function(){

                                    pos.remove();
                                    alert("삭제되었습니다!")
                                },
                                error : function () {
                                    alert("삭제 에러 발생!!")
                                }
                            });

                    });
                    var dbtnTd = $("<td></td>").append(dbtn);

                    abtn =$("<input>");
                    abtn.attr("type","button");
                    abtn.attr("class","btn btn-info");
                    abtn.attr("value","상세보기");

                    aboutTd = $("<td></td>").append(abtn);

                    //상세보기 기능!! *********************************
                    abtn.on("click",function(){
                        //상세정보 처리!!
                        //DB처리, 화면처리
                        //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        console.log(isbn);
                        $.ajax({
                            url : "http://localhost:7070/book/bookAbout",
                            type : "get",
                            dataType : "jsonp",
                            jsonp : "callback",
                            data : {
                                isbn : isbn

                            },
                            success : function(result){

                                //*****************상세보기기능*****************************
                                var date = result.date;
                                var page = result.page;
                                var translator = result.translator;
                                var supple = result.supplement;
                                var detail = "<b>도서정보 :</b><br>"+"ISBN: "+ isbn + "<br>"+"출판일: " + date +"<br>"+ "페이지 수: "+ page+"<br>"+"번역가: "+ translator +"<br>"+ "부록: "+supple;

                                var d1 = $("<div></div>").attr("id","detail").append(detail);
                                $("#tTd"+isbn).append(d1);

                            },
                            error : function () {
                                alert("불러오기 에러 발생!!")
                            }
                        });

                    });




                    ubtn = $("<input>");
                    ubtn.attr("type","button");
                    ubtn.attr("value","수정");
                    ubtn.attr("class","btn btn-primary");
                    ubtn.attr("id","update");

                    //UPDATE 기능!! *********************************
                    ubtn.on("click",function(){
                        //수정처리
                        var title = $(this).parent().parent().find("td:nth-child(2)").text();
                        var author = $(this).parent().parent().find("td:nth-child(3)").text();
                        var price = $(this).parent().parent().find("td:nth-child(4)").text();
                        var updatetitle=$("<input />").attr("type","text").val(title);
                        var updateauthor=$("<input />").attr("type","text").val(author);
                        var updateprice=$("<input />").attr("type","text").val(price);


                        $(this).parent().parent().find("td:nth-child(2)").text("");
                        $(this).parent().parent().find("td:nth-child(2)").append(updatetitle);
                        $(this).parent().parent().find("td:nth-child(3)").text("");
                        $(this).parent().parent().find("td:nth-child(3)").append(updateauthor);
                        $(this).parent().parent().find("td:nth-child(4)").text("");
                        $(this).parent().parent().find("td:nth-child(4)").append(updateprice);
                        $(this).parent().parent().find("[value=삭제]").attr("disabled","disabled");
                        $(this).parent().parent().find("[value=상세보기]").attr("disabled","disabled");
                        $(this).parent().parent().find("#update").attr("value","완료");
                        var update =$(this).parent().parent().find("#update");

                        update.on("click",function () {
                                //update처리!!
                                //DB처리, 화면처리
                                //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리

                                var isbn = $(this).parent().parent().attr("data-isbn");

                                var title1 = updatetitle.val();
                                var author1 = updateauthor.val();
                                var price1 = updateprice.val();

                                var tr = $(this).parent().parent();
                                $.ajax({
                                    url : "http://localhost:7070/book/bookUpdate",
                                    type : "get",
                                    dataType : "jsonp",
                                    jsonp : "callback",
                                    data : {
                                        isbn : isbn,
                                        title : title1,
                                        author : author1,
                                        price : price1
                                    },
                                    success : function(result){
                                        alert("변경되었습니다");
                                        tr.find("td:nth-child(2)").empty();
                                        tr.find("td:nth-child(2)").text(title1);
                                        tr.find("td:nth-child(3)").empty();
                                        tr.find("td:nth-child(3)").text(author1);
                                        tr.find("td:nth-child(4)").empty();
                                        tr.find("td:nth-child(4)").text(price1);
                                    },
                                    error : function () {
                                        alert("업데이트 에러 발생!!")
                                    }
                                });


                        })
                    });
                    var ubtnTd = $("<td></td>").append(ubtn);




                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(dbtnTd);
                    tr.append(ubtnTd);
                    tr.append(aboutTd);

                    $("tbody").append(tr);
                }

            },
            error: function () {
                alert("이상이상")
            }
        });
    }
}

function insertBook() {

    var isbn = $("#isbni").val();
    var title = $("#titlei").val();
    var date = $("#datei").val();
    var page = $("#pagei").val();
    var price = $("#pricei").val();
    var author = $("#authori").val();
    var translator = $("#translatori").val();
    var supplement = $("#supplementi").val();
    var publisher = $("#publisheri").val();
    var imgurl = $("#imgurli").val();



    console.log("..." + isbn);
    console.log("...2 " + title);

    $.ajax({
        url : "http://localhost:7070/book/bookInsert",
        type : "get",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            isbn : isbn,
            title : title,
            date : date,
            page : page,
            price : price,
            author : author,
            translator : translator,
            supplement : supplement,
            publisher : publisher,
            imgurl : imgurl,
            imgbase64 : base64
        },
        success : function(result){
            alert("변경되었습니다");
            $(location).attr("href","index.html")

        },
        error : function () {
            alert("업데이트 에러 발생!!")
        }
    });

}

function fileInfo(f){
    var file = f.files; // files 를 사용하면 파일의 정보를 알 수 있음

    if(file[0].size > 1024 * 1024){
        // 큰 파일을 올리니까 브라우저가 다운되었음 -_-;;
        alert('1MB 이하 이미지를 업로드 해주세요');
        return;
    }

    var reader = new FileReader();

    reader.onload = function(rst){
        $('#imgbase64i').html('<img src="' + rst.target.result + '">');

        base64=rst.target.result;

    };
    reader.readAsDataURL(file[0]); // 파일을 읽는다, 배열이기 때문에 0 으로 접근
}

function newUser() {

    var ID = $("#form-ID").val();
    var fname = $("#form-first-name").val();
    var lname = $("#form-last-name").val();
    var email = $("#form-email").val();
    var pw = $("#form-pw").val();
    var pwD = $("#form-pwD").val();


        if(pw==pwD) {


            $.ajax({
                url: "http://localhost:7070/book/userNew",
                type: "get",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    ID: ID,
                    fname: fname,
                    lname: lname,
                    email: email,
                    pw: pw

                },
                success: function (result) {
                    alert("회원가입이 완료 되었습니다");
                    $(location).attr("href", "register.html");


                },
                error: function () {
                    alert("에러 발생!!")
                }
            })
        }
            if(pw !== pwD){
            alert("비밀번호를 확인해주세요!!")
    }
}


function toLogin() {


    $("#con1").load("loginForm.html");
}

function toRegister() {
    $("#con1").load("regiForm.html");
}

function logIn() {
    alert($("#form-ID").val());

    $.ajax({
        url : "http://localhost:7070/book/userLogin",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",
        data :{
            ID : $("#form-ID").val(),
            pw : $("#form-pw").val()
        },


        success : function(result) {
            if(result.status !="error"){

                alert(result.status+"님 환영합니다.");
                $(location).attr("href","main.html");

            }
            if(result.status=="error"){
                alert("문제가 생겼어요 다시시도해주세요");
            }

        },
        error: function () {
            alert("아이디와 비밀번호를 확인해주세요!");
        }


        })
}
function iflogged() {
    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result) {
            if(result.Login){

                alert("이미 로그인하였습니다.");
                $(location).attr("href","main.html");

            }
            if(result.Login==false){
                $(location).attr("href","register.html");
            }

        },
        error: function () {
            alert("알수없는 에러");
        }
})
}

function logOut() {
    $.ajax({
        url : "http://localhost:7070/book/userLogout",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result) {
            if(result.Logout){
                alert("로그아웃 되었습니다.");
                $(location).attr("href","main.html");

            }

        },
        error: function () {
            alert("알수없는 에러");
        }
    })
}

function searchBookforComment() {
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
                $("tbody").empty();
                //결과창출력

                for (var i = 0; i < result.length; i++) {
                    tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

                    priceTd = $("<td></td>").text(result[i].price);
                    titleTd = $("<td></td>").text(result[i].title).attr("id","tTd"+result[i].isbn);
                    authorTd = $("<td></td>").text(result[i].author);
                    img = $("<img />").attr("src",result[i].img).attr("id","bookimg");
                    imgTd = $("<td></td>").append(img);

                    cmtbtn =$("<input>");
                    cmtbtn.attr("type","button");
                    cmtbtn.attr("class","btn btn-primary");
                    cmtbtn.attr("value","서평등록");
                    cmtbtn.on("click", function () {
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        $(location).attr("href", "commentForm.html?isbn=" + isbn);
                    });

                    commentTd = $("<td></td>").append(cmtbtn);

                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(commentTd);

                    $("tbody").append(tr);
                }

            },
            error: function () {
                alert("이상이상")
            }
        });
    }
}
function insertComment() {
    var userId =null;
    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result) {
            if(result.Login){
                // alert("환영합니다, "+result+"님");

                userId = result.ID;
                console.log("0 "+userId);

                var isbn = location.href.substr(
                    location.href.lastIndexOf('=') + 1);
                console.log("isbn= " +isbn);
                var title = $("#ctitle").val();
                var text = $("#ctext").val();
                $.ajax({
                    url : "http://localhost:7070/book/insertComment",
                    type : "get",
                    dataType : "jsonp",
                    jsonp : "callback",
                    data : {

                        bisbn : isbn,
                        ctitle : title,
                        cauthor : userId,
                        ctext : text
                    },
                    success : function(result){
                        alert("변경되었습니다");
                        // $(location).attr("href","comment.html")
                        console.log("check2.."+userId);

                    },
                    error : function () {
                        alert("업데이트 에러 발생!!")
                    }
                })

            }
            if(result.Login==false){
                $(location).attr("href","register.html");
            }

        },
        error: function () {
            alert("알수없는 에러");
        }
    });



}

function checkLog() {


    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result) {
            if(result.Login){

                $(location).attr("href","comment.html");

            }
            if(result.Login==false){
                alert("회원전용 기능입니다. 로그인부터 하세요!");
                $(location).attr("href","register.html");
            }

        },
        error: function () {
            alert("알수없는 에러");
        }
    })
}

function checklogged() {
    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "get",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result) {
            if(result.Login){

            $("#loginout").text("Log-Out").attr("onclick","logOut()");


            }
            if(result.Login==false){

                $("#loginout").text("Log-In").attr("href","register.html");


            }

        },
        error: function () {
            alert("알수없는 에러");
        }
    })
}


$(function () {
    checklogged()
});

var cidTd = null;
var btitleTd = null;
var ctitleTd = null;
var cauthorTd = null;
var cdateTd = null;
var ctextTd = null;

function searchComment() {
    if(event.keyCode==13){
        $.ajax({
            url: "http://localhost:7070/book/commentList",
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                keyword: $("#keyword").val()
            },

            success: function (result) {
                $("tbody").empty();
                //결과창출력

                for (var i = 0; i < result.length; i++) {
                    tr = $("<tr></tr>").attr("data-cid", result[i].cid);

                    cidTd = $("<td></td>").text(result[i].cid).attr("id", "tTd" + result[i].cid);
                    btitleTd = $("<td></td>").text(result[i].btitle);

                    img = $("<img />").attr("src", result[i].img).attr("id", "bookimg");
                    imgTd = $("<td></td>").append(img);

                    ctitleTd = $("<td></td>").text(result[i].ctitle);
                    cauthorTd = $("<td></td>").text(result[i].author).attr("id", "idTd"+result[i].cid);
                    cdateTd = $("<td></td>").text(result[i].date);
                    ctextTd = $("<td></td>").text(result[i].text);

                    dbtn = $("<input>");
                    dbtn.attr("type", "button");
                    dbtn.attr("class", "btn btn-danger");
                    dbtn.attr("value", "삭제");
                    var currentCid = "idTd"+result[i].cid;

                    //DELETE 기능!! *********************************
                    dbtn.on("click", function () {

                        var cid = $(this).parent().parent().attr("data-cid");
                        var pos = $(this).parent().parent();
                        console.log("datacid is " + cid);
                        $.ajax({
                            url: "http://localhost:7070/book/userSession",
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            success: function (result) {
                                if (result.ID == $("#"+currentCid).text()) {

                                    userId = result.ID;
                                    console.log("0 " + userId);

                                    $.ajax({
                                        url: "http://localhost:7070/book/commentDelete",
                                        type: "get",
                                        dataType: "jsonp",
                                        jsonp: "callback",
                                        data: {
                                            cid : cid

                                        },
                                        success: function () {

                                            pos.remove();
                                            alert("삭제되었습니다!")
                                        },
                                        error: function () {
                                            alert("삭제 에러 발생!!")
                                        }
                                    });

                                }
                                if (result.ID != $("#"+currentCid).text()) {
                                    alert("아이디가 다릅니다.");
                                    console.log("1 " + $("#"+currentCid).text());
                                    console.log("2 " + result.ID);

                                }

                            },

                            error: function () {
                                alert("알수없는 에러");
                            }
                        });
                    });
                        var dbtnTd = $("<td></td>").append(dbtn);

                        tr.append(cidTd);
                        tr.append(imgTd);
                        tr.append(btitleTd);
                        tr.append(ctitleTd);
                        tr.append(cauthorTd);
                        tr.append(cdateTd);
                        tr.append(ctextTd);
                        tr.append(dbtnTd);

                        $("tbody").append(tr);



                }
            }
        })
    }
}

