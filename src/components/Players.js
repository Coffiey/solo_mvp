import axios from "axios";

import ClassDrop from "./CharachterDropDowns/ClassDrop";
import RaceDrop from "./CharachterDropDowns/RaceDrop";
import "./css/player.css"

import { useState, useEffect } from "react";

const Players = (props) => {
    const {display, combatState} = props

    const [name, setName] = useState(undefined)
    const [playerClass, setPlayerClass] = useState("choose")
    const [race, setRace] = useState("choose")
    const [level, setLevel] = useState(undefined)
    const [maxHp, setMaxHp] = useState(undefined)
    const [dex, setDex] = useState(undefined)
    const [wis, setWis] = useState(undefined)
    const [con, setCon] = useState(undefined)
    const [int, setInt] = useState(undefined)
    const [str, setStr] = useState(undefined)
    const [cha, setCha] = useState(undefined)
    const [disableCreate, setDisableCreate] = useState(true)

    const [viewClass, setViewClass] = useState(false)
    const [viewRace, setViewRace] = useState(false)
    const [disableButonClass, setDisableButonClass] = useState(true)
    const [disableButonRace, setDisableButonRace] = useState(true)

    const [classList, setClassList] = useState(null)
    const [raceList, setRaceList] = useState(null)
    const [damage, setDamage] = useState('')

    const [player, setPlayer] = useState([])


    useEffect(()=>{
        axios.get('/api/pc')
        .then((response) => {
            return response.data
        }).then((data) => {
            setPlayer(data)
        })
        .catch((error) =>{
          console.log(error);
        });
    },[])


    useEffect(() =>{
        axios.get('/api/classes')
        .then((response) => {
            setClassList(response.data)
            setDisableButonClass(false)
        })
        .catch(function (error) {
          console.log(error);
        });
      },[])

      useEffect(() =>{
        axios.get('/api/races')
        .then((response) => {
            setRaceList(response.data)
            setDisableButonRace(false)
        })
        .catch(function (error) {
          console.log(error);
        });
      },[])


    useEffect(() => {
        if (
            name &&
            playerClass !== "please Select" &&
            race !== "please Select" &&
            level &&
            maxHp && 
            dex &&
            int &&
            cha &&
            str &&
            con &&
            wis
        ) {
            setDisableCreate(false)
        }
    },[
        name,
      playerClass,
      race,
      level,
      maxHp,
      dex,
      int,
      cha,
      str,
      con,
      wis
    ])

    const createPlayerObject = () => {
       return {
        name,
      playerClass,
      race,
      level: Number(level),
      maxHp: Number(maxHp),
      dex: Number(dex),
      int: Number(int),
      cha: Number(cha),
      str: Number(str),
      con: Number(con),
      wis: Number(wis)
    }
}

const postPlayerObject = (object) => {
 return axios
    .post('/api/pc', object)
    .then((response)=> {
      console.log(response)
    })
    .catch((err) => console.log(err))
}


    return  (
    <>
    {player.map((item) => {
        return (<div className="pc">
        <div className="top">
          <h2 className="pcName">{item.name}</h2>
          <h2 className="pcHp">HP: <span className="hp">{item.max_hp}</span></h2>
          </div>

          <div className="mid">
              <div className="levelDiv">
                <h1 className="level">Level {item.level}:</h1>
              <h2 className="pcClass">{item.player_class} </h2>
              </div>
            <h2 className="pcRace">{item.race}</h2>
          </div>

          <div className="stats">
            <p className="pcSave">Saving Throws</p>
            <span className="statsNum">DEX: <br/>+{item.dex}</span>
            <span className="statsNum">INT: <br/>+{item.int}</span>
            <span className="statsNum">CHA: <br/>+{item.cha}</span>
            <span className="statsNum">STR: <br/>+{item.str}</span>
            <span className="statsNum">CON: <br/>+{item.con}</span>
            <span className="statsNum">WIS: <br/>+{item.wis}</span>
          </div>
        </div>)}
        )}


    {display && <div className="pc">
    <div className="top">
      <h2 className="pcName">Name: <input className="txt" type="text" onChange={(e) => {setName(e.target.value)}}></input></h2>
      <h2 className="pcHp">hp: <input type="number" className="statinput" onChange={(e) => {setMaxHp(e.target.value)}}></input></h2>
    </div>
    <div className="mid">
    <h2 className="pcClass">Class: {<button 
        onClick={() => setViewClass(true)}
        disabled={disableButonClass}
    >{playerClass}</button>}</h2>
    {viewClass && <ClassDrop 
                    classList={classList}
                    setPlayerClass={setPlayerClass}
                    setViewClass={setViewClass}
                    />}

    <h2 className="pcRace">Race: <button 
                onClick={() => setViewRace(true)}
                disabled={disableButonRace}
                >{race}</button></h2>
    {viewRace && <RaceDrop
                    raceList={raceList}
                    setRace={setRace}
                    setViewRace={setViewRace}/>}
    <h2 className="pcRace">Level: <input className="statinput" type="number" onChange={(e) => {setLevel(e.target.value)}}></input></h2>
    </div>

    <h2 className="pcSave">Saving throws</h2>
    <div className="statCreate">
    <p className="inputP">DEX: <input className="statinput" type="number" onChange={(e) => {setDex(e.target.value)}}></input></p>
    <p className="inputP">WIS: <input className="statinput" type="number" onChange={(e) => {setWis(e.target.value)}}></input></p>
    <p className="inputP">CON: <input className="statinput" type="number" onChange={(e) => {setCon(e.target.value)}}></input></p>
    <p className="inputP">INT: <input className="statinput" type="number" onChange={(e) => {setInt(e.target.value)}}></input></p>
    <p className="inputP">STR: <input className="statinput" type="number" onChange={(e) => {setStr(e.target.value)}}></input></p>
    <p className="inputP">CHA: <input className="statinput" type="number" onChange={(e) => {setCha(e.target.value)}}></input></p>
    </div>
    <button
    className="createPlayer"
    disabled={disableCreate}
    onClick={()=>{
        postPlayerObject(createPlayerObject())
        setPlayer([...player, createPlayerObject()])
    }}
    >Create Player</button>
</div>}
        
</>
    )
}
    
    export default Players