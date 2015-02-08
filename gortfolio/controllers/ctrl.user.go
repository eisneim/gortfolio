package controllers

import (
	"net/http"
)

var (
	User = map[string]JSON{
		"Login": UserLogin,
	}
)

func UserLogin(w http.ResponseWriter, r *http.Request) (interface{}, *HandlerError) {
	return `{"msg":"this should be a login page"}`, nil
}
