
const Music_play = async () => {

  const music = new Audio('Lwh.mp3');
      const url =  "https://api.napster.com/v2.1/tracks/top?apikey=MzJjMTcxNzUtMzg1Mi00ZWJkLTkxYzgtZDYwNjQyZTA2NDk4";

      let Totaldata;
      await fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          Totaldata = data;
        //   console.log(Totaldata);
        });

        const image = [
          {
            id:'1',
            poster:"album_pics/Line.png"
          },
          {
            id:'2',
            poster:"album_pics/into_you.png"
          },
          {
            id:'3',
            poster:"album_pics/Harry_Styles_-_As_it_Was.png"
          },
          {
            id:'4',
            poster:"album_pics/Thank_you.png"
          },
          {
            id:'5',
            poster:"album_pics/PaQue.png"
          },
          {
            id:'6',
            poster:"album_pics/Bassda.png"
          },
          {
            id:'7',
            poster:"album_pics/ATM.png"
          },
          {
            id:'8',
            poster:"album_pics/Hellyea.png"
          },
          {
            id:'9',
            poster:"album_pics/FN.png"
          }

        ]

       

        Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
            element.getElementsByTagName('h5')[0].innerHTML = Totaldata.tracks[i].name;
        })

        let masterPlay = document.getElementById('masterPlay');

        masterPlay.addEventListener('click', ()=>{
          if (music.paused || music.currentTime <=0 ) {
            music.play();
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill');
          } else {
            music.pause();  
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
          }
        })

        const makePlays = () =>{
          Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
              element.classList.add('bi-play-circle-fill');
              element.classList.remove('bi-pause-circle-fill');
            })
        }

        const highlighter = () =>{
          Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
              element.style.background = "rgb(105, 105, 170, 0)"; 
        })
        }

        let index = 0;

      Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
          element.addEventListener('click',(e)=>{
              index = e.target.id;
              makePlays();
              e.target.classList.remove('bi-play-circle-fill');
              e.target.classList.add ('bi-pause-circle-fill');
              music.src = Totaldata.tracks[index-1].previewURL;
              music.play();

                masterPlay.classList.remove('bi-play-fill');
                masterPlay.classList.add('bi-pause-fill');
                music.addEventListener('ended', ()=>{
                  element.classList.add('bi-play-circle-fill');
                  element.classList.remove('bi-pause-circle-fill');
                })

                highlighter();
                Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"; 
          })
      })

      let curStart = document.getElementById('currentstart');
      let curend = document.getElementById('currentend');
      let seek = document.getElementById('seek');
      let bar2 = document.getElementById('bar2');
      let dot = document.getElementsByClassName('dot')[0];

      music.addEventListener('timeupdate', () =>{
          let music_curr = music.currentTime;
          let music_dur = music.duration;

          let min = Math.floor(music_dur/60);
          let sec = Math.floor(music_dur%60);
          if(sec<10){
            sec = `0${sec}`;
          }
          curend.innerText = `${min}:${sec}`;

          let min1 = Math.floor(music_curr/60);
          let sec1= Math.floor(music_curr%60);
          if(sec1<10){
            sec1 = `0${sec1}`;
          }
          curStart.innerText = `${min1}:${sec1}`;

          let progressbar = parseInt((music.currentTime/music.duration)*100);
          seek.value = progressbar;
          let seekbar = seek.value;
          bar2.style.width = `${seekbar}%`;
          dot.style.left = `${seekbar}%`;
      })

      seek.addEventListener('change', ()=>{
        music.currentTime = seek.value * music.duration/100;
      })

      music.addEventListener('ended', ()=> {
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill'); 
      })

      let vol_icon = document.getElementById('vol_icon');
      let vol = document.getElementById('vol');
      let vol_dot = document.getElementById('vol-dot');
      let vol_bar = document.getElementsByClassName('vol-bar')[0];

      vol.addEventListener('change', ()=>{
        if(vol.value == 0){
          vol_icon.classList.remove('bi-volume-down-fill');
          vol_icon.classList.add('bi-volume-mute-fill');
          vol_icon.classList.remove('bi-volume-up-fill');
        }
        if(vol.value > 0){
          vol_icon.classList.add('bi-volume-down-fill');
          vol_icon.classList.remove('bi-volume-mute-fill');
          vol_icon.classList.remove('bi-volume-up-fill');
        }
        if(vol.value > 50){
          vol_icon.classList.remove('bi-volume-down-fill');
          vol_icon.classList.remove('bi-volume-mute-fill');
          vol_icon.classList.add('bi-volume-up-fill');
        }

        let vol_a = vol.value;
        vol_bar.style.width = `${vol_a}%`;
        vol_dot.style.left = `${vol_a}%`;
        music.volume = vol_a/100;
      })

      let back = document.getElementById('back');
      let next = document.getElementById('next');

      back.addEventListener('click', ()=>{
        index -= 1;
        if(index < 1){
          index = Array.from(document.getElementsByClassName('songItem')).length;
        }
        
        music.src = Totaldata.tracks[index-1].previewURL;
        music.play();
          
        makePlays();
          document.getElementById(`${index}`).classList.remove('bi-play-fill');
          document.getElementById(`${index}`).classList.add('bi-pause-fill');

        highlighter();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"; 

      })

      next.addEventListener('click', ()=>{
        index -=0;
        index += 1;
        if(index > Array.from(document.getElementsByClassName('songItem')).length){
            index = 1;
        }
        
        music.src = Totaldata.tracks[index-1].previewURL;
        music.play();
          
        makePlays();
          document.getElementById(`${index}`).classList.remove('bi-play-fill');
          document.getElementById(`${index}`).classList.add('bi-pause-fill');
          
          highlighter();
          Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"; 

      })

      let shuffle = document.getElementById('shuffle');
      let arr = Totaldata.tracks;
      let newarr = [...arr];
     

};

Music_play();







