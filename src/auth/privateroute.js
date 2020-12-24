const { Component } = require("react");
const { Route, Redirect } = require("react-router-dom");
const { useAuth } = require(".")


const PrivateRoute = ({component: Component, ...rest }) => {
    const [logged] = useAuth();
    
    return <Route {...rest} render={
        (props) => (
            logged
            ? <Component {...props} />
            : <Redirect to="/login" />
        )
    } />
}

export default PrivateRoute