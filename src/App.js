import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePower, changeVolume, pressButton } from "./Redux/drumMachineSlice"

import styles from './App.module.scss';

function App() {
  const { buttons, power, volume, screen } = useSelector(state => state.drum)
  const dispatch = useDispatch()
  const volumeRef = React.useRef()
  const audioQRef = React.useRef()
  const audioWRef = React.useRef()
  const audioERef = React.useRef()
  const audioARef = React.useRef()
  const audioSRef = React.useRef()
  const audioDRef = React.useRef()
  const audioZRef = React.useRef()
  const audioXRef = React.useRef()
  const audioCRef = React.useRef()
  const refArray = [audioQRef, audioWRef, audioERef, audioARef, audioSRef, audioDRef, audioZRef, audioXRef, audioCRef]
  const [screenInfo, setScreenInfo] = React.useState()

  React.useEffect(() => {
    setScreenInfo(`VOLUME ${(volume * 100).toFixed(0)}%`)
    setTimeout(() => setScreenInfo(screen), 1400)
  }, [volume])

  React.useEffect(() => {
    setScreenInfo(screen)
  }, [screen])

  React.useEffect(() => {
    const onKeypress = e => {
      dispatch(pressButton([e.key.toUpperCase(), refArray.find(item => item.current.id == e.key.toUpperCase())]))
    }
    if (power) {
      document.addEventListener('keypress', onKeypress);
    }
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [power]);

  return (
    <div className={styles.app} id="drum-machine">
      <div className={styles.control_panel}>
        <label htmlFor="power">POWER
          <button className={power ? `${styles.power} ${styles.on}` : styles.power}
            name='power'
            onClick={() => dispatch(togglePower())}>
          </button>
        </label>
        <div className={styles.display} id="display">{screenInfo}</div>
        <label htmlFor="volume">VOLUME
          <input ref={volumeRef} type="range" name="volume" value={volume * 100}
            onChange={() => dispatch(changeVolume(volumeRef.current.value))} />
        </label>
      </div>
      <div className={styles.keyboard}>
        {buttons.map(({ name, title, sound }, index) =>
          <button key={name} disabled={!power}
            onClick={() => dispatch(pressButton([title, refArray[index].current]))}
            id={title.replaceAll(/\s/g, "")}
            className="drum-pad">{name}
            <audio ref={refArray[index]} className='clip' id={name} src={sound} ></audio>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
