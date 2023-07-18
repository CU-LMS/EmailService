import React, { useContext } from 'react'
import idolLogo from '../../assets/idol_logo.png'
import { AuthContext } from '../context/authContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-right: 20px;
`
const Button = styled.button`
    padding: 7px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 14px;
    background-color: #e22c2c;
    cursor:  ${props => props.disabled ? "not-allowed" : "pointer"};
    margin-left: 10px;
`


const NavBar = () => {
  const { user, loading, dispatch } = useContext(AuthContext);
  // const handleLoginLogout = ()=>{
  //   console.log("hello")
  // }
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  return (
    <div className="pl-4 pt-4 pb-4 d-flex justify-content-between align-items-center">
      <img src={idolLogo} className="imageWrapper" />
      <InnerContainer>
        <Button>
          <Link to="/" style={{ textDecoration: "none", color: 'white', fontWeight: '400' }}>
            Home
          </Link>
        </Button>
        {
          user?.isAdmin === true ? <Button>
            <Link to="/manage" style={{ textDecoration: "none", color: 'white', fontWeight: '400' }}>
              manage
            </Link>
          </Button> : null
        }
        {user && <Button disabled={loading} onClick={user ? handleLogout : <Navigate to="/login" />}>
          <Link to="/login" style={{ textDecoration: "none", color: 'white', fontWeight: '400' }}>
            {user ? "Logout" : "Login"}
          </Link>
        </Button>}
      </InnerContainer>
    </div>
  )
}

export default NavBar