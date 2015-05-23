package gortfolio

import (
	"github.com/eisneim/gortfolio/gortfolio/controllers"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func RegisterRoutes() {

	// ----------- user apis -----------
	Router.GET("/v1/login", UserLogin)

	Router.GET("/test", Test)

	Router.GET("/middleware", func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		w.Header().Set("X-We-Modified-This", "Yup")

		w.Write([]byte("这个是前置middleware _______"))
		handler(w, r, p)
	})

	Router.GET("/insert", NewUser)
	// ----------- portfolio api -------

}

func handler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	w.Write([]byte(" 这个是个handler "))

}
