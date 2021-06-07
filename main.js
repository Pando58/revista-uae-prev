import './styles/main.scss'
import { titulos, ids_videos, titulos_videos, ids_360, titulos_360} from './js/contentData'

// Materialize
document.addEventListener('DOMContentLoaded', function() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
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