import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGames, getGenres} from "../../action";
import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Styles from "./Create.module.css";
import SearchBar from "../SearchBar/SearchBar";

function validate(form) {
    let error = {};
    if (! form.name) {
        error.name = "name is required";
    } else if (! form.description) {
        error.description = "description is required";
    } else if (! form.released) {
        error.released = "released is required";
    } else if (! form.platforms) {
        error.platforms = "description is required";
    }
    return error;
}

export default function Create() {
    const dispatch = useDispatch();
    const allPlatforms = [
        "PlayStation",
        "Pc",
        "Xbox",
        "Nintendo",
        "SEGA",
        "Android",
        "3DO",
        "Atari",
        "Linux",
        "iOS",
        "Commodore",
        "Apple Macintosh",
    ];
    const allGenres = useSelector((state) => state.stateGenres);
    const [created, setCreated] = useState(false);
    const [error, setError] = useState({});
    const [form, setForm] = useState({
        name: "",
        description: "",
        released: "",
        genres: [],
        platforms: [],
        img: "",
        rating: ""
    });
    // console.log(allGenres)

    useEffect(() => {
        dispatch(getGenres());
    }, []); // corregi y agregue el dispach, error en consola

    const history = useHistory();

    function handleChange(e) {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...form,
            [e.target.name]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.released]: e.target.value
        }));
    }
    function handleGenre(e) {
        e.preventDefault();
        setForm({
            ...form,
            genres: [
                ...form.genres,
                e.target.value
            ]
        });
    }
    function handlePlatforms(e) {
        e.preventDefault();
        setForm({
            ...form,
            platforms: [
                ...form.platforms,
                e.target.value
            ]
        });
        setError(validate({
            ...form,
            [e.target.platforms]: e.target.value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:3001/videogame", form).then((responese) => {
            dispatch(getGames());
            // alert("The Game is created")
            setForm({});
            setCreated(true);
        }).catch((e) => {
            console.log(e);
        });
    }

    function handleAcept(e) {
        e.preventDefault();
        history.push("/home");
    }
    // console.log(form, "----------- console form")
    return (
        <div className={
            Styles.caja
        }>
            <SearchBar></SearchBar>
            <div className="container"
            style={{marginTop:"20px"}}>
              <div className="card">

                {
                !created ? (
                    <div className="container">
                        <h1 className="card-title">Create your game cover:</h1>
                        <div className={
                            Styles.cuadrado
                        }>
                            <form className={
                                Styles.form
                            }>
                                <label className={
                                    Styles.label
                                }>Name:</label>
                                <input class="form-control"
                                    type="text"
                                    name="name"
                                    value={
                                        form.name
                                    }
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    required/> {
                                error.name && <p className={
                                    Styles.error
                                }>
                                    {
                                    error.name
                                }</p>
                            }
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" id="" cols="30" rows="10"
                                class="form-control"
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    required></textarea>
                                {
                                error.description && (
                                    <p className={
                                        Styles.error
                                    }>
                                        {
                                        error.description
                                    }</p>
                                )
                            }

                                <label htmlFor="Released date:">Released date:</label>
                                <input class="form-control" type="date" name="released"
                                    value={
                                        form.released
                                    }
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    required/> {
                                error.released && (
                                    <p className={
                                        Styles.error
                                    }>
                                        {
                                        error.released
                                    }</p>
                                )
                            }
                                <label>Rating:</label>
                                <select  onChange={
                                        (e) => handleChange(e)
                                    }
                                    name="rating"
                                    id="rating"
                                    class="form-select"
                                    value={
                                        form.rating
                                }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <label>
                                    Genres:
                                    <select class="form-select" onChange={
                                            (e) => handleGenre(e)
                                        }
                                        name="genres"
                                        id="genres">
                                        <option name="genre" value="">
                                            {" "}
                                            - - - - - - -{" "} </option>
                                        {
                                        allGenres ?. map((g) => (
                                            <option value={
                                                g.id
                                            }>
                                                {
                                                g.name
                                            }</option>
                                        ))
                                    } </select>
                                </label>

                                <label>
                                    Platforms:
                                    <select onChange={
                                            (e) => handlePlatforms(e)
                                        }
                                        name="platforms"
                                        class="form-select"
                                        id="platforms"
                                        required>
                                        <option name="platforms" value="">
                                            {" "}
                                            - - - - - - -{" "} </option>
                                        {
                                        allPlatforms.map((p) => (
                                            <option value={p}>
                                                {p}</option>
                                        ))
                                    } </select>
                                </label>
                                {
                                error.platforms && (
                                    <p className={
                                        Styles.error
                                    }>
                                        {
                                        error.platforms
                                    }</p>
                                )
                            }
                                <label class="form-label">ㅤImage URL:</label>
                                <input class="form-control"type="text" name="img" id="image"
                                    onChange={
                                        (e) => handleChange(e)
                                    }
                                    value={
                                        form.img
                                    }/>
                            </form>
                        </div>
                        <div className={
                            Styles.preButton
                        }>
                            <button onClick={
                                    (e) => handleSubmit(e)
                                }
                                className="btn btn-dark"
                                style={{margin:"10px"}}
                                type="submit">
                                CREATE
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="container"
                      style={{padding:"15px"}}>
                          <div className="container">
                            <h2>Your video game cover has been created.</h2>
                            <button 
                            className="btn btn-success"onClick={
                                (e) => handleAcept(e)
                            }>
                                Accept</button>
                                </div>
                        </div>
                    </div>
                )
            } </div>
            </div>
        </div>
    );
}
