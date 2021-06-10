import React, { useState, useEffect, useCallback } from 'react'
import { Route, Redirect } from 'react-router-dom';
import configData from './configData.json'

function redirectToLogin(routes) {
    window.location.href = routes ?
        `https://accounts.codes/hub/login?routes=${routes}` :
        `https://accounts.codes/hub/login`;
    return null
}
const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    // חילוץ jwt מהקוקי
    let jwtFromCookie = ''
    if (window.location.hostname == "localhost") {
        jwtFromCookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ4TXVrSUMzbGNZZ2ZQa0JCcFFkemJ1YXVLb24xIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjE5NTAyNjI2fQ.o3J6R0lsxa1w8ualIKWHPueFkEa5LiaCyGmaqZO3uOk'
    }
    else {
        if (document.cookie) {
            jwtFromCookie = document.cookie.includes('jwt') ?
                document.cookie.split(";")
                    .filter(s => s.includes('jwt'))[0].split("=").pop()
                : document.cookie.includes('devJwt') ?
                    document.cookie.split(";")
                        .filter(s => s.includes('devJwt'))[0].split("=").pop() : null;
        }
    }
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let routes
    let userName

    if (rest.computedMatch.path.includes('share'))
        userName = 'share'
    else
        userName = rest.computedMatch.params.userName;
    useEffect(() => {
        const isLocal = window.location.hostname == "localhost"
        const url = `${configData.SERVER_URL}/${userName}/isPermission?isLocal=${isLocal}`;
        const isPermission = async () => {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: jwtFromCookie,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (response.status == 401) {
                routes = "hub"
                setIsLoading(false)
                setIsLoggedIn(true)
            }
            else {
                setIsLoading(false)
            }
        }
        isPermission()

    }, [])

    return isLoading ? null : isLoggedIn ?
        redirectToLogin(routes)
        : <Route {...rest} render={props => { return props.children }}></Route>
}
export default ProtectedRoute
