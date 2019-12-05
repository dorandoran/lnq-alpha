import createDataContext from "./createDataContext"

const authReducer = (state, action) => {
	switch(action.type) {
	default:
		return state
	}
}

const signup = dispatch => () => {}

const signin = dispatch => () => {}

export const { Context, Provider } = createDataContext(
	authReducer,
	{signin, signup},
	{token: null, errorMessage: ""}
)