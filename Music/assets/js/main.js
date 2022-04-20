const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = "HUNG_PHAM";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem("PLAYER_STORAGE_KEY")) || {},
  songs: [
    {
      name: "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng (ST_ Phong Nhã) - Hoàng Quyên - Piano Cover.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Ba ngọn nến lung linh (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Ba ngọn nến lung linh (ST- Ngọc Lễ) – Phương Thảo, Ngọc Lễ, Bé Na - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Bàn tay mẹ (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Bàn tay mẹ (ST_ Bùi Đình Thảo) (Hải Yến  Hà Linh) - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Beautiful In White (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Beautiful in white (hợp âm cảm âm) (ST_ Savan Kotecha, Arnpor Birgisson) – Shane Filan - Piano Cover.mp3",
      image: "./assets/img/beautifulinwhite.jpg",
    },
    {
      name: "Cảm ơn con nhé (Về nhà đi con OST)",
      singer: "Wizardrypro",
      path: "./assets/songs/Cảm ơn con nhé (hợp âm cảm âm) (Về nhà đi con OST) - Quốc An - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Chiếc bụng đói (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Chiếc bụng đói ST Tiên Cookie  Thanh Ngân  Piano Cover wizardrypro.mp3",
      image: "./assets/img/chiecbungdoi.jpg",
    },
    {
      name: "Chiếc đèn ông sao (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Chiếc đèn ông sao - piano solo wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Có chàng trai viết lên cây (Phan Mạnh Quỳnh)",
      singer: "Wizardrypro",
      path: "./assets/songs/Có chàng trai viết lên cây (hợp âm cảm âm) (Phan Mạnh Quỳnh)(Mắt biếc OST) - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Đường đến ngày vinh quang (Ban nhạc Bức Tường)",
      singer: "Wizardrypro",
      path: "./assets/songs/Đường đến ngày vinh quang (hợp âm cảm âm) (ST_ Trần Lập) (Ban nhạc Bức Tường) - Piano Cover.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Đường lên đỉnh núi (Tốp ca Đường lên đỉnh Olympia)",
      singer: "Wizardrypro",
      path: "./assets/songs/Đường lên đỉnh núi (hợp âm cảm âm) (ST_ Hoàng Vân) (Tốp ca Đường lên đỉnh Olympia) - Piano Cover.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Em là hoa hồng nhỏ - Trịnh Công Sơn",
      singer: "Wizardrypro",
      path: "./assets/songs/Em là hoa hồng nhỏ (hợp âm cảm âm) - Trịnh Công Sơn - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Hơn Cả Yêu (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Hơn cả yêu (ST- Khắc Hưng) [Đức Phúc] - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Last Christmas (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Last Christmas (hợp âm cảm âm) (George Michael) (Wham!) - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Mình cùng nhau đóng băng (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Mình cùng nhau đóng băng (hợp âm cảm âm) - Tiên Cookie - Thùy Chi - Piano Cover wizardrypro.mp3",
      image: "./assets/img/minhcungnhaudongbang.jpg",
    },
    {
      name: "Nhật kí của mẹ (Hiền Thục)",
      singer: "Wizardrypro",
      path: "./assets/songs/Nhật kí của mẹ (ST_ Nguyễn Văn Chung) (Hiền Thục) - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Tháng tư là lời nói dối của em - Hà Anh Tuấn",
      singer: "Wizardrypro",
      path: "./assets/songs/Tháng tư là lời nói dối của em (hợp âm cảm âm) - Phạm Toàn Thắng - Hà Anh Tuấn - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Thằng cuội (Tôi thấy hoa vàng trên cỏ xanh OST)",
      singer: "Wizardrypro",
      path: "./assets/songs/Thằng cuội - Tôi thấy hoa vàng trên cỏ xanh OST - piano solo wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Tình yêu mặt trời (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Tình yêu mặt trời (ST_ ) - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Viên đá nhỏ (Cover by Wizardrypro)",
      singer: "Wizardrypro",
      path: "./assets/songs/Viên đá nhỏ (hợp âm cảm âm) (ST_ Ân Nhi) (Hải Băng) - Piano Cover wizardrypro.mp3",
      image: "./assets/img/wizardrypro.jpg",
    },
    {
      name: "Wind",
      singer: "Hiax ft. MinhT",
      path: "./assets/songs/Wind - Hiax ft. MinhT [Futurity Release] _ The Stories EP.mp3",
      image: "./assets/img/Wind_Hiax.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="thumb" style="background-image: url('${
                  song.image
                }')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    //Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, //10s
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    //Xử lý phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //Khi song play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //Khi song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //Khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //Khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //Khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //Khi random bài hát
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    //Phát lại 1 bài hát
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //Xử lý next song song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    //Lắng nghe hành vi click vào play list
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        //Xử lý khi click vào song
        {
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            audio.play();
            _this.render();
          }
        }
        //Xử lý khi click vào option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    if (this.currentIndex === 0) {
      document.documentElement.scrollTop = 0;
    }
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 0);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    console.log(heading, cdThumb, audio);
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    //Gán cấu hình từ cònfig vào app
    // this.loadConfig()

    //Định nghĩa các thuộc tính cho object
    this.defineProperties();

    //Lắng nghe xử lý các sự kiện (DOM event)
    this.handleEvents();

    //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    //Render playlist
    this.render();

    //Hiển thị trạng thái ban đầu của button repeat và ban đầu
    randomBtn.classList.toggle("active", _this.isRandom);
    repeatBtn.classList.toggle("active", _this.isRepeat);
  },
};
app.start();
