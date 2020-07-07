$(document).ready(function () {
  let options = {
    html2canvas: { scale: 4 },
    jsPDF: { orientation: "p" },
  };

  $("#pageOrient").on("change", function () {
    options.jsPDF.orientation = $(this).val();
    options.jsPDF.setFillColor;
  });

  $("#submitButton").on("click", function () {
    html2pdf().from($("#pdfView")[0]).set(options).save();
  });

  $("#lang").on("change", function () {
    if ($(this)[0].value === "eng") {
      $(".col-10.d-show").removeClass("d-show").addClass("d-none");
      $(".font-select").show();
      $(".show-select").show();
      $(".char-display").show();
      $("#textarea1").text("Hi");
      $("table td div").css("height", "15px");
      $("table td").css("height", "15px");
      renderTable();
    } else {
      $("#pageTable").show();
      $("#engText").hide();
      $(".col-10.d-none").removeClass("d-none").addClass("d-show");
      $(".font-select").hide();
      $(".show-select").hide();
      $(".char-display").hide();
    }
  });

  $("#fontSize").on("change", function () {
    if ($("#lang").val() === "eng") {
      $("#fontSize").attr({ min: 50, max: 150 });
      $("#engText p").css({ fontSize: parseInt($("#fontSize").val()) });
    }
    $(".main-letter").css({
      fontSize: parseInt($("#fontSize").val()),
      marginLeft: $("#fontSize").val() / -2,
      marginTop: $("#fontSize").val() / -2 - 10,
    });
  });

  $("#midTitle").on("change keydown", function () {
    $("#tableTitle").text($(this)[0].value);
  });

  $("#titleSize").on("change", function () {
    $("#tableTitle").css("font-size", parseInt($(this)[0].value));
  });

  $("#fontColor").on("change", function () {
    $("#pageTable, #engText p").css("color", $(this)[0].value);
  });

  $("#strokeColor").on("change", function () {
    $("#pageTable td, #engText").css(
      "cssText",
      `border-color: ${$(this)[0].value} !important`
    );
  });

  $("#lineSet").on("change", function () {
    if ($(".diagonal-div").length) {
      $(".diagonal-div").remove();
    }
    switch ($(this)[0].value) {
      case "1":
        $(".big-dashed-div-left").css({
          borderRight: "1px dashed black",
          borderBottom: "1px dashed black",
        });
        $(".big-dashed-div-b-right").css({
          borderTop: "1px dashed black",
          borderLeft: "1px dashed black",
        });
        break;
      case "2":
        $("#pageTable td.position-relative.p-0.overflow-hidden").append(
          '<div style="position: absolute; top: 0; transform: skew(32deg, 122deg)" class="diagonal-div big-box row justify-content-center align-items-center"><div class="col-6 big-dashed-div-left" style="border-right: 1px dashed black; border-bottom: 1px dashed black;"></div><div class="col-6 big-dashed-div-right"></div><div class="col-6 big-dashed-div-b-left"></div><div class="col-6 big-dashed-div-b-right" style="border-top: 1px dashed black; border-left: 1px dashed black;"></div></div>'
        );
        break;
      case "3":
        $(".big-dashed-div-left").css({
          borderRight: "1px dashed black",
          borderBottom: "none",
        });
        $(".big-dashed-div-b-right").css({
          borderTop: "none",
          borderLeft: "1px dashed black",
        });
        break;
      case "4":
        $(".big-dashed-div-left").css({
          borderRight: "none",
          borderBottom: "1px dashed black",
        });
        $(".big-dashed-div-b-right").css({
          borderTop: "1px dashed black",
          borderLeft: "none",
        });
        break;
      case "5":
        $(".big-dashed-div-left").css({
          borderRight: "none",
          borderBottom: "none",
        });
        $(".big-dashed-div-b-right").css({
          borderTop: "none",
          borderLeft: "none",
        });
        break;

      // TEST
      case "6":
        $(".big-dashed-div-left").css({
          borderRight: "1px dashed black",
          borderBottom: "1px dashed black",
        });
        $(".big-dashed-div-b-right").css({
          borderTop: "1px dashed black",
          borderLeft: "1px dashed black",
        });
        $("#pageTable td.position-relative.p-0.overflow-hidden").append(
          '<div style="position: absolute; top: 0; transform: skew(32deg, 122deg)" class="diagonal-div big-box row justify-content-center align-items-center"><div class="col-6 big-dashed-div-left" style="border-right: 1px dashed black; border-bottom: 1px dashed black;"></div><div class="col-6 big-dashed-div-right"></div><div class="col-6 big-dashed-div-b-left"></div><div class="col-6 big-dashed-div-b-right" style="border-top: 1px dashed black; border-left: 1px dashed black;"></div></div>'
        );
        $("#pageTable span.main-letter").css({
          border: "1px dashed black",
        });
        break;
    }
  });

  $(
    "#textarea1, #display, #rowSpace, #colSpace, #font, #lineRadio1, #lineRadio2"
  ).on("change keydown", renderTable);

  $("#gradFade").on("change", function () {
    let grad = $(this)[0].checked;
    $("tr").each(function (index) {
      $(this).each(function (i) {
        $(this)
          .find("span")
          .each(function (j) {
            if (grad) {
              $(this).css("opacity", (10 - j) / 10);
            } else {
              $(this).css("opacity", 1);
            }
          });
      });
    });
    // $('#engText p').each( function(index) {
    //
    // });
  });

  $("#tableTitle").css("font-size", parseInt($("#titleSize").val()));
  renderTable();

  //===========================================================================

  // toggle for pinyin
  $("#showPinyin").on("click", function () {
    $("#pageTable .pinyin").toggle();
  });

  // color for pinyin
  $("#pinyinColor").on("change", function () {
    $("#pageTable .pinyin").css("color", $(this)[0].value);
  });

  // fill page
  $("#pageTail").one("click", function () {
    let paperHeight = 700;
    let height = 140;

    for (let i = 0; i < paperHeight; i += height) {
      let tr = $("<tr></tr>");
      for (let j = 0; j < 10; j++) {
        let td = $('<td class="position-relative p-0 overflow-hidden"></td>');
        let div = $(
          '<div class="big-box row justify-content-center align-items-center">' +
            '<div class="col-6 big-dashed-div-left"></div>' +
            '<div class="col-6 big-dashed-div-right"></div>' +
            '<div class="col-6 big-dashed-div-b-left"></div>' +
            '<div class="col-6 big-dashed-div-b-right"></div>' +
            "</div>"
        );
        td.append(div);
        tr.append(td);
        if (parseInt($("#colSpace").val())) {
          tr.append(
            $(
              `<td style="border: none !important; width: ${$(
                "#colSpace"
              ).val()}px">&nbsp;</td>`
            )
          );
        }
        $("table").append(tr);
      }
    }
  });

  // image for english text
  $("#textarea1").on("change keydown", function () {
    if ($("#lang").val() === "eng") {
      let text = $("#textarea1").val();
      $("#engText").prepend(
        `<img style="width: 150px" src="letters_png/${text[0]}.png" alt="Image"/>`
      );
    }
  });

  // show image for english text
  $("#showImg").on("click", function () {
    $("#engText img").toggle();
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      let img = $('<img width="150px" />');
      reader.onload = function (e) {
        img.attr("src", e.target.result);
        $("#engText").prepend(img);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#photo").change(function () {
    readURL(this);
  });
});

function renderTable() {
  let grad = $("#gradFade")[0].checked;
  $("#pageTable").html("");
  $("#engText").html("");
  let display = $("#display").val();

  if (display === "ind") {
    if ($("#lang").val() === "eng") {
      $("#pageTable").hide();
      $("#engText").show();

      for (let i = 0; i < $("#textarea1").val().length; i++) {
        let p = $(
          '<p class="border-bottom" style="font-size: 70px; margin-top: 15px; margin-bottom: -30px;"></p>'
        );
        for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 14); j++) {
          p.append($("#textarea1").val()[i]);
        }
        p.css({ fontFamily: $("#font").val() });
        $("#engText").append(p);
      }
    } else {
      for (let i = 0; i < $("#textarea1").val().length; i++) {
        let table = $("#pageTable");
        let tr1 = $("<tr class='pinyin'></tr>");

        for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 10); j++) {
          let td = $('<td class="overflow-hidden"></td>');
          let div = $(
            '<div class="small-dashed-div row justify-content-center align-items-center"><span style="margin-top: -5px">' +
              $("#textarea1").val()[i] +
              "</span></div>"
          );
          td.append(div);
          tr1.append(td);
          if (parseInt($("#colSpace").val())) {
            tr1.append(
              $(
                `<td style="border: none !important; width: ${$(
                  "#colSpace"
                ).val()}px">&nbsp;</td>`
              )
            );
          }
        }
        table.append(tr1);
        let tr2 = $("<tr></tr>");

        for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 10); j++) {
          let td = $('<td class="position-relative p-0 overflow-hidden"></td>');
          let div = $(
            '<div class="big-box row justify-content-center align-items-center">' +
              '<div class="col-6 big-dashed-div-left"></div>' +
              '<div class="col-6 big-dashed-div-right"></div>' +
              '<div class="col-6 big-dashed-div-b-left"></div>' +
              '<div class="col-6 big-dashed-div-b-right"></div>' +
              "</div>"
          );
          let span = $(
            '<span style="left: 50% ; top: 50%;" class="position-absolute main-letter"></span>'
          );

          span.css("font-size", parseInt($("#fontSize").val()));
          span.css("margin-left", parseInt($("#fontSize").val()) / -2);
          span.css("margin-top", parseInt($("#fontSize").val() / -2) - 10);
          span.css("opacity", grad ? (10 - j) / 10 : 1);
          span.text($("#textarea1").val()[i]);
          td.append(div);
          td.append(span);
          tr2.append(td);
          if (parseInt($("#colSpace").val())) {
            tr2.append(
              $(
                `<td style="border: none !important; width: ${$(
                  "#colSpace"
                ).val()}px">&nbsp;</td>`
              )
            );
          }
        }
        table.append(tr2);

        if (parseInt($("#rowSpace").val())) {
          let tr3 = $(
            `<tr class="row-space" style="height: ${$(
              "#rowSpace"
            ).val()}px"><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
          );
          table.append(tr3);
        }

        if ($("#alternativeRow")[0].checked) {
          let tr4 = $("<tr></tr>");
          for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 10); j++) {
            let td = $(
              '<td class="position-relative p-0 overflow-hidden"></td>'
            );
            let div = $(
              '<div class="big-box row justify-content-center align-items-center">' +
                '<div class="col-6 big-dashed-div-left"></div>' +
                '<div class="col-6 big-dashed-div-right"></div>' +
                '<div class="col-6 big-dashed-div-b-left"></div>' +
                '<div class="col-6 big-dashed-div-b-right"></div>' +
                "</div>"
            );
            td.append(div);
            tr4.append(td);
            if (parseInt($("#colSpace").val())) {
              tr4.append(
                $(
                  `<td style="border: none !important; width: ${$(
                    "#colSpace"
                  ).val()}px">&nbsp;</td>`
                )
              );
            }
          }
          table.append(tr4);
        } else {
          let tr4 = $("<tr></tr>");
          for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 10); j++) {
            let td = $(
              '<td class="position-relative p-0 overflow-hidden"></td>'
            );
            let div = $(
              '<div class="big-box row justify-content-center align-items-center">' +
                '<div class="col-6 big-dashed-div-left"></div>' +
                '<div class="col-6 big-dashed-div-right"></div>' +
                '<div class="col-6 big-dashed-div-b-left"></div>' +
                '<div class="col-6 big-dashed-div-b-right"></div>' +
                "</div>"
            );
            let span = $(
              '<span style="left: 50% ; top: 50%;" class="position-absolute main-letter"></span>'
            );
            span.css("font-size", parseInt($("#fontSize").val()));
            span.css("margin-left", parseInt($("#fontSize").val()) / -2);
            span.css("margin-top", parseInt($("#fontSize").val() / -2) - 10);
            span.css("opacity", ".3");
            span.text($("#textarea1").val()[i]);
            td.append(div);
            td.append(span);
            tr4.append(td);
            if (parseInt($("#colSpace").val())) {
              tr4.append(
                $(
                  `<td style="border: none !important; width: ${$(
                    "#colSpace"
                  ).val()}px">&nbsp;</td>`
                )
              );
            }
          }
          table.append(tr4);
        }
      }
    }
  } else {
    if ($("#lang").val() === "eng") {
      $("#pageTable").hide();
      $("#engText").show();
      let p = $(
        '<p class="border-bottom" style="font-size: 70px; margin-top: 15px; margin-bottom: -30px;"></p>'
      );

      for (let i = 0; i < $("#textarea1").val().length; i++) {
        p.append($("#textarea1").val()[i]);
      }
      p.css({ fontFamily: $("#font").val() });
      $("#engText").append(p);
    } else {
      for (let i = 0; i < Math.ceil($("#textarea1").val().length) / 10; i++) {
        let table = $("#pageTable");
        let tr1 = $("<tr></tr>");

        for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 10); j++) {
          let td = $("<td class='pinyin'></td>");
          let div = $(
            '<div class="small-dashed-div row justify-content-center align-items-center"><span style="margin-top: -5px">' +
              ($("#textarea1").val()[j + i * 10]
                ? $("#textarea1").val()[j + i * 10]
                : " ") +
              "</span></div>"
          );
          td.append(div);
          tr1.append(td);
          if (parseInt($("#colSpace").val())) {
            tr1.append(
              $(
                `<td style="border: none !important; width: ${$(
                  "#colSpace"
                ).val()}px">&nbsp;</td>`
              )
            );
          }
        }
        table.append(tr1);
        let tr2 = $("<tr></tr>");

        for (let j = 0; j < (parseInt($("#colSpace").val()) ? 5 : 10); j++) {
          let td = $('<td class="position-relative p-0 overflow-hidden"></td>');
          let div = $(
            '<div class="big-box row justify-content-center align-items-center">' +
              '<div class="col-6 big-dashed-div-left"></div>' +
              '<div class="col-6 big-dashed-div-right"></div>' +
              '<div class="col-6 big-dashed-div-b-left"></div>' +
              '<div class="col-6 big-dashed-div-b-right"></div>' +
              "</div>"
          );
          let span = $(
            '<span style="left: 50% ; top: 50%;" class="position-absolute main-letter"></span>'
          );

          span.css("font-size", parseInt($("#fontSize").val()));
          span.css("margin-left", parseInt($("#fontSize").val()) / -2);
          span.css("margin-top", parseInt($("#fontSize").val() / -2) - 10);
          span.css("opacity", grad ? (10 - j) / 10 : 1);
          span.text(
            $("#textarea1").val()[j + i * 10]
              ? $("#textarea1").val()[j + i * 10]
              : " "
          );
          td.append(div);
          td.append(span);
          tr2.append(td);
          if (parseInt($("#colSpace").val())) {
            tr2.append(
              $(
                `<td style="border: none !important; width: ${$(
                  "#colSpace"
                ).val()}px">&nbsp;</td>`
              )
            );
          }
        }
        table.append(tr2);

        if (parseInt($("#rowSpace").val())) {
          let tr3 = $(
            `<tr class="row-space" style="height: ${$(
              "#rowSpace"
            ).val()}px"><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
          );
          table.append(tr3);
        }

        if ($("#lang").val() === "eng") {
          $(
            ".small-dashed-div, .big-dashed-div-left, .big-dashed-div-b-right"
          ).css("border", "none");
          $(".big-box").hide();
          $("td").css("height", "50px");
          $("#pageTable span").css("font-family", $("#font").val());
        }
      }
    }
  }
}
