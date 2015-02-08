package controllers

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func UserLogin(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, `{"msg":"this should be a login page"}`)
}
