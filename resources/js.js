const rain = document['getElementById']('player_rain')
const music = document['getElementById']('player_music')
const playBtn = document['getElementById']('btnPlay')
let platFirst = true
let currentMusicId = '17746129'

function playAudio(musicId) {
  if (musicId == null || musicId === '') {
    musicId = currentMusicId
  }
  let musicChanged = currentMusicId !== musicId
  currentMusicId = musicId
  if (musicChanged) {
    setup_rain()
    rain['play']()
    setupmusic(musicId)
    music['play']()
    playBtn['className'] = ''
    playBtn['className'] = 'pause'
  } else {
    if (rain['paused']) {
      if (platFirst) {
        setup_rain()
        setupmusic(musicId)
      } else {
        setVolume(1)
        setVolume(2)
      }
      rain['play']()
      music['play']()
      playBtn['className'] = ''
      playBtn['className'] = 'pause'
    } else {
      stopAudio(rain)
      stopAudio(music)
      playBtn['className'] = ''
      playBtn['className'] = 'play'
    }
  }
  platFirst = false
}

function setup_rain() {
  const dom = document['getElementById']('player_rain_source')
  dom['src'] = '/resources/therain.m4a'
  setVolume(1)
  rain['load']()
}

function setupmusic(musicId) {
  const dom = document['getElementById']('player_music_source')
  setVolume(2)
  dom['src'] = 'http://music.163.com/song/media/outer/url?id=' + musicId + '.mp3'
  music['load']()
}

function setVolume(vol) {
  if (vol === 1) {
    const dom = document['getElementById']('volumn_rain')
    rain['volume'] = dom['value']
  } else {
    const dom = document['getElementById']('volumn_music')
    music['volume'] = dom['value']
  }
}

function stopAudio(audio) {
  let vol = audio['volume']
  const interval = setInterval(function() {
    vol -= 0.1
    if (vol > 0) {
      audio['volume'] = vol
    } else {
      clearInterval(interval)
      audio['pause']()
    }
  }, 100)
}

function change_music(musicId) {
  playAudio(musicId)
}
