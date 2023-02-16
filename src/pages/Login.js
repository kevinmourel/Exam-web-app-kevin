import user from '../data/user.json'
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import Forgot from '../components/Forgot';


function Login({ setUser }) {

    const [showModalForgot, setShowModalForgot] = useState(false);

    const navigate = useNavigate();

    if (localStorage.getItem('loggedUser')) {
        navigate("/");
    }

    const checkLogin = (payload) => {

        const checkUser = user.data.find(item => item.email === payload.email &&
            item.password === payload.password)

        if (checkUser != undefined) {
            setUser(checkUser)
            localStorage.setItem("loggedUser", checkUser.email)
            navigate('/')
        } else {
            alert('Email or password incorrect')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        let formObject = Object.fromEntries(data.entries());

        if (formObject.email && formObject.password) {
            checkLogin(formObject)

            if(formObject.rememberMe){
                localStorage.setItem("remember", formObject.email)
            }
        } else {
            alert('Email or password empty')
        }

    }

    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="card p-5">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"><i class="bi bi-person-fill"/>Email</label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="ketikkan username anda" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputPassword1"><i class="bi bi-gear-fill"/>Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="ketikkan password anda" />
                        </div>
                        <div class="form-check my-3">
                            <input type="checkbox" class="form-check-input" id="rememberMe" name="rememberMe"/>
                            <label class="form-check-label" for="rememberMe">Remember me</label>
                        </div>
                        <button type="submit" className="btn btn-success w-100" >Login Admin</button>
                        <Link to="/register"  className="btn btn-primary w-100 my-2">Register Mahasiswa Baru</Link>
                        <a onClick={() => setShowModalForgot(true)} style={{textDecoration: 'none', cursor: 'pointer'}}><i class="bi bi-eye"/> Lupa password?</a>

                    </form>
                </div>
            </div>
            <Forgot showModalForgot={showModalForgot} setShowModalForgot={setShowModalForgot}/>
        </>
    )
}

export default Login;