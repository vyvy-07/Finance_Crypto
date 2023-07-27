function load() {
  let load = document.querySelector(".loading");
  window.addEventListener("load", function () {
    initLoading();
  });
}
load();
const listImg = () => {
  let imgArr = document.querySelectorAll("img");
  const list = imgArr?.map((item) => item?.isLoaded !== false);
  console.log("list", list);
};
listImg();
function initLoading() {
  let loadedCount = 0;
  let img = document.querySelectorAll("img").length;
  let containers = document.querySelector("body");

  if (img > 0) {
    let loadedLib = imagesLoaded(container);
    loadedLib
      .on("progress", function (instance) {
        loadedCount++;
        let percent = Math.floor((loadedCount / img) * 100);
        handleLoading(percent);
      })
      .on("always", function (instance) {})
      .on("fail", function (error) {
        console.log("fail");
        console.log("error", error);
      })
      .on("done", (instance) => {
        if (instance?.isComplete) {
          hideLoading();
          console.log("done", instance);
        }
      });
  }
}

function handleLoading(percent) {
  let progressOut = document.querySelector(".loading__group-tree .percent");
  let textPercent = document.querySelector(".loading__group-count");
  let setW = (progressOut.style.width = `${percent}%`);
  let setText = (textPercent.innerHTML = `${percent}%`);
}
function hideLoading() {
  let load = document.querySelector(".loading");
  load.classList.add("active");
  let body = document.querySelector("body");
  body.classList.add("hide-scroll");
  console.log("load", load);
}

function menumini() {
  let header = document.querySelector(".header");
  let btnmenu = document.querySelector(".btnmenu");

  btnmenu.addEventListener("click", function () {
    header.classList.toggle("active");
    btnmenu.classList.toggle("active");
  });
}
menumini();

function scusers() {
  let listItem = document.querySelector(".scusers__list");
  let item = document.querySelector(".scusers__list .scusers__list-item");
  if (document.contains(listItem)) {
    let slider = new Flickity(listItem, {
      // options
      cellAlign: "center",
      contain: true,
      wrapAround: true,
      groupCells: "80%",
      prevNextButtons: false,
    });
  }
}
scusers();

// videoSc : chưa hoàn thành
function videoSc() {
  let scstartedVideo = document.querySelector(".scstarted__video");
  let video = document.querySelector(".video ");
  let videoIframe = document.querySelector(".video__iframe iframe");
  if (document.contains(scstartedVideo)) {
    let dataID = video.getAttribute("data-id");
    let src = videoIframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${dataID}?autoplay=0`
    );
    scstartedVideo.addEventListener("click", function (e) {
      e.stopPropagation();
      if (scstartedVideo.classList.contains("active")) {
        scstartedVideo.classList.remove("active");
        let src = videoIframe.setAttribute("src", "");
      } else {
        scstartedVideo.classList.add("active");
        let src = videoIframe.setAttribute(
          "src",
          `https://www.youtube.com/embed/${dataID}?autoplay=1`
        );
      }
    });
    window.addEventListener("click", function (e) {
      let src = videoIframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${dataID}?autoplay=0`
      );
      scstartedVideo.classList.remove("active");
    });
  }
}
videoSc();

// blogPost : chưa hoàn thành
function blogPost() {
  let blogpost = document.querySelector(
    ".blogpost .main-wrap .blogpost__list-item"
  );
  let blogItem = document.querySelectorAll(".blogpost__list-item .products");
  if (document.contains(blogpost)) {
    let slider = new Flickity(blogpost, {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      groupCells: "80%",
      pageDots: false,
      on: {
        change: function (index) {
          changeNum(index);
          changeBtns(index);
          btnGroup(index);
          console.log(index);
        },
      },
    });
    let buttonGroup = document.querySelector(".blogpost__btns-numbers");
    let buttons = buttonGroup.querySelectorAll(
      ".blogpost__btns-numbers .number"
    );
    let btnImg = document.querySelectorAll(".blogpost__btns-img");
    let btnPre = document.querySelector(".blogpost__btns .--pre");
    let btnnext = document.querySelector(".blogpost__btns .--next");
    buttons = fizzyUIUtils.makeArray(buttons);

    function changeNum() {
      buttonGroup.addEventListener("click", function (event) {
        if (!matchesSelector(event.target, ".number")) {
          return;
        }
        let index = buttons.indexOf(event.target);
        slider.select(index);
        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        buttons[index].classList.add("active");
      });
    }
    changeNum(0);
    function btnGroup() {
      btnPre.addEventListener("click", function () {
        slider.previous(true);
      });
      btnnext.addEventListener("click", function () {
        slider.next(true);
      });
      btnImg.forEach(function (i) {
        i.addEventListener("click", function () {
          btnImg.forEach(function (item) {
            item.classList.remove("active");
          });
          i.classList.add("active");
        });
      });
    }
    btnGroup(0);
    function nextPre() {
      btnPre.addEventListener("click", function (e, index) {
        slider.previous(true);
        if (buttons[index] == blogItem[index]) {
          // buttons[index].classList.toggle("active")
        } else {
          console.log("?");
        }
      });
    }
    nextPre();
    blogItem.forEach(function (product, index) {
      product.addEventListener("mousemove", function () {
        buttons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        buttons[index].classList.add("active");
      });
    });

    let activeNumberIndex = 0;
    function updateActiveNumber(index) {
      buttons.forEach((number, i) => {
        if (i === index) {
          number.classList.add("active");
        } else {
          number.classList.remove("active");
        }
      });
    }
    btnnext.addEventListener("click", () => {
      activeNumberIndex = (activeNumberIndex + 1) % buttons.length;
      updateActiveNumber(activeNumberIndex);
    });

    btnPre.addEventListener("click", () => {
      activeNumberIndex =
        (activeNumberIndex - 1 + buttons.length) % buttons.length;
      updateActiveNumber(activeNumberIndex);
    });
  }
}
blogPost();
let activeNumberIndex = 0;

function accordion() {
  let accordions = document.querySelector(".accordions");
  let accItem = document.querySelectorAll(".accordions__item");
  let itemTitle = document.querySelectorAll(".accordions__item-title");
  if (document.contains(accordions)) {
    itemTitle.forEach(function (i) {
      i.addEventListener("click", function (event) {
        let currenttitle = document.querySelector(
          ".accordions__item-title.active"
        );
        if (currenttitle && currenttitle !== i) {
          currenttitle.classList.toggle("active");
          currenttitle.nextElementSibling.style.maxHeight = 0;
        }

        i.classList.toggle("active");
        let btntext = i.nextElementSibling;
        if (i.classList.contains("active")) {
          btntext.style.maxHeight = btntext.scrollHeight + "px";
          console.log(btntext.style.maxHeight);
        } else {
          btntext.style.maxHeight = 0;
        }
      });
    });
  }
}
accordion();

function tabs() {
  let tagItem = document.querySelectorAll(".textbox__listtag-item");
  let bloglist = document.querySelectorAll(".blogpost__list");
  let blog = document.querySelector(".blogpost");
  if (document.contains(blog)) {
    tagItem.forEach(function (i) {
      i.addEventListener("click", function () {
        tagItem.forEach(function (item) {
          item.classList.remove("active");
        });
        i.classList.add("active");
        let dataid = i.getAttribute("data-tab");
        bloglist.forEach(function (blogi) {
          blogi.classList.remove("active");
        });
        document.querySelector(".list-" + dataid).classList.add("active");
      });
    });
  }
}
tabs();

let contactpage = document.querySelector(".contactpage");
if (document.contains(contactpage)) {
  function Validator(options) {
    let form = document.querySelector(options.form);
    //lỗi
    function Validate(input, rule) {
      let erroMess = rule.test(input.value);

      let error = input.parentElement.querySelector(".error");
      if (erroMess) {
        error.innerHTML = "vui long nhập trường này";
        input.parentElement.classList.add("invalid");
      } else {
        input.parentElement.classList.remove("invalid");
        error.innerHTML = "";
      }
    }

    if (form) {
      options.rules.forEach(function (rule) {
        let input = form.querySelector(rule.selector);
        let error = input.parentElement.querySelector(".error");

        if (input) {
          input.addEventListener("blur", function () {
            Validate(input, rule);
          });
          input.addEventListener("input", function () {
            input.parentElement.classList.remove("invalid");
            error.innerHTML = "";
          });
        }
      });
    }
  }

  //định nghĩa các rules
  //cho các rules là 1 function()
  //xét luật lệ trong đây(điểu kiện)
  //1. có lỗi thì trả message "lỗi"
  //2. không có lỗi trả về undefined
  Validator.isRequired = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        return value.trim() ? undefined : "vui lòng nhập trường này";
      },
    };
  };
  Validator.isEmail = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : "vui long nhap lai email";
      },
    };
  };
  Validator.isCpn = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        return value.trim() ? undefined : "vui lòng nhập trường này";
      },
    };
  };
}
