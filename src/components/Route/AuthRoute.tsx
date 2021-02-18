import { PropsWithChildren } from "react"
import { connect } from "react-redux"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { RootState } from "../../redux/reducers"
import { SystemState } from "../../redux/types"

const AuthRoute = ({
    children,
    user,
    ...props
}: PropsWithChildren<SystemState & RouteProps>
) => <Route {...props}>
        {!user
            ? children
            : <Redirect to='/' />
        }
    </Route>

export default connect(({ system }: RootState) => system)(AuthRoute)