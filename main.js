import './styles/main.scss'
import { titulos, ids_videos, titulos_videos, ids_360, titulos_360} from './js/contentData'

// Materialize
document.addEventListener('DOMContentLoaded', function() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));

  setTimeout(() => document.body.classList.remove('wait'), 400);
});


// Manejar URL
const wl = window.location;

const url_params = new URLSearchParams(wl.search);

const param_type = url_params.get('type');
const param_id = parseInt(url_params.get('id'));
const param_v = parseInt(url_params.get('v'));

const config = {
  type: param_type == 'video' || param_type == '360' || param_type == 'foto' ? param_type : 'video'
};

config.id = titulos[config.type][param_id] != undefined ? param_id : 0;

// Redireccionar
if (config.type == 'video') {
  config.v = ids_videos[config.id][param_v] != undefined ? param_v : 0;

  if (!param_type ||
  param_id == undefined ||
  param_v == undefined ||
  config.type != param_type || config.id != param_id || config.v != param_v) {
    wl.replace(`${wl.href.split('?')[0]}?type=${config.type}&id=${config.id}&v=${config.v}`);
  }
} else if (config.type == '360') {
  // Si es una lista, no una sola foto
  if (typeof ids_360[config.id] == 'object') {
    config.v = ids_360[config.id][param_v] != undefined ? param_v : 0;
    
    if (!param_type ||
    param_id == undefined ||
    param_v == undefined ||
    config.type != param_type || config.id != param_id || config.v != param_v) {
      wl.replace(`${wl.href.split('?')[0]}?type=${config.type}&id=${config.id}&v=${config.v}`);
    }
  } else {
    if (!param_type ||
    param_id == undefined ||
    config.type != param_type || config.id != param_id) {
      wl.replace(`${wl.href.split('?')[0]}?type=${config.type}&id=${config.id}`);
    }
  }
} else if (config.type == 'foto') {
  if (!param_type ||
  param_id == undefined ||
  config.type != param_type || config.id != param_id) {
    wl.replace(`${wl.href.split('?')[0]}?type=${config.type}&id=${config.id}`);
  }
}

// Cambiar titulo en la pagina
document.querySelectorAll('.mi-navbar .titulo').forEach((i) => {
  i.innerHTML = titulos[config.type][config.id];
});

// Mostrar solo 360 o video
if (config.type == 'video') {
  document.getElementById('sec-360').classList.add('hide');
  document.getElementById('sec-foto').classList.add('hide');

  // Video y miniaturas
  document.getElementById('video').setAttribute('src', `https://drive.google.com/file/d/${ids_videos[config.id][config.v]}/preview`);

  for (let i = 0; i < Object.keys(ids_videos[config.id]).length; i++) {    
    let x = document.createElement('div');

    x.innerHTML =
      `<div class="miniatura">
        <div class="titulo">
          ${titulos_videos[config.id][i]}
        </div>
        <div class="imagen">
          <a href="?type=video&id=${config.id}&v=${i}">
            <img src="images/miniaturas/videos/${config.id}/${ids_videos[config.id][i]}.png"></img>
          </a>
        </div>
      </div>
    `;

    document.querySelector('#sec-video .container-miniaturas').appendChild(x.firstChild);
  }
} else if (config.type == '360') {
  document.getElementById('sec-video').classList.add('hide');
  document.getElementById('sec-foto').classList.add('hide');

  // Si es una lista
  if (config.v != undefined) {
    document.getElementById('foto360').setAttribute('src', `https://momento360.com/e/u/${ids_360[config.id][config.v]}`);
    
    for (let i = 0; i < Object.keys(ids_360[config.id]).length; i++) {
      let x = document.createElement('div');

      x.innerHTML =
        `<div class="miniatura">
          <div class="titulo">
            ${titulos_360[config.id][i]}
          </div>
          <div class="imagen">
            <a href="?type=360&id=${config.id}&v=${i}">
              <img src="images/miniaturas/360/${config.id}/${ids_360[config.id][i]}.png"></img>
            </a>
          </div>
        </div>
      `;

      document.querySelector('#sec-360 .container-miniaturas').appendChild(x.firstChild);
    }
  } else { // Si es una sola foto, no una lista
    document.getElementById('foto360').setAttribute('src', `https://momento360.com/e/u/${ids_360[config.id]}`);

    document.querySelector('#sec-360 .division').remove();
    document.querySelector('#sec-360 .container-miniaturas').remove();
    document.querySelector('main').style.height = '1px';
    document.querySelector('#sec-360').style.height = '100%';
  }
} else if (config.type = 'foto') {
  document.getElementById('sec-video').classList.add('hide');
  document.getElementById('sec-360').classList.add('hide');
  
  for (let i = 0; i < document.getElementById('sec-foto').children.length; i++) {
    if (document.getElementById('sec-foto').children[i].classList[0] != param_id) {
      document.getElementById('sec-foto').children[i].classList.add('hide');
    }
  }
}