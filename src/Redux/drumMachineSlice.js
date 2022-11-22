import { createSlice } from "@reduxjs/toolkit";


import Cev from "../assets/sounds/Cev_H2.mp3"
import Dsc from "../assets/sounds/Dsc_Oh.mp3"
import heater1 from "../assets/sounds/Heater-1.mp3"
import heater2 from "../assets/sounds/Heater-2.mp3"
import heater3 from "../assets/sounds/Heater-3.mp3"
import heater4 from "../assets/sounds/Heater-4_1.mp3"
import heater5 from "../assets/sounds/Heater-6.mp3"
import kickHat from "../assets/sounds/Kick_n_Hat.mp3"
import kickRP from "../assets/sounds/RP4_KICK_1.mp3"

const initialState = {
    power: true,
    volume: 0.3,
    screen: "",
    buttons: [
        { name: "Q", sound: Cev, title: "Cev H2" },
        { name: "W", sound: Dsc, title: "Dsc Oh" },
        { name: "E", sound: heater1, title: "Heater 1" },
        { name: "A", sound: heater2, title: "Heater 2" },
        { name: "S", sound: heater3, title: "Heater 3" },
        { name: "D", sound: heater4, title: "Heater 4" },
        { name: "Z", sound: heater5, title: "Heater 5" },
        { name: "X", sound: kickHat, title: "Kick & Hat" },
        { name: "C", sound: kickRP, title: "kick" }
    ]

}

const drumMachineSlice = createSlice({
    name: "drumMachine",
    initialState,
    reducers: {
        togglePower(state) {
            state.power = !state.power
        },
        changeVolume(state, action) {
            state.volume = action.payload / 100
        },
        pressButton(state, action) {
            if (action.payload[0].length !== 1) {
                let title = action.payload[0]
                let sound = action.payload[1]
                state.screen = title;
                sound.volume = state.volume;
                sound.play()
            } else {
                const [name, { current: sound }] = action.payload
                let { title } = state.buttons.find(item => item.name === name)
                state.screen = title;
                sound.volume = state.volume;
                sound.play()
            }
        }
    }
})

export const { togglePower, changeVolume, pressButton } = drumMachineSlice.actions
export default drumMachineSlice.reducer